<?php namespace App\Repositories\Criteria\Rebate;

use Illuminate\Http\Request;

use Bosnadev\Repositories\Criteria\Criteria;
use Bosnadev\Repositories\Contracts\RepositoryInterface as Repository;

class ServiceDatatable extends Criteria
{

    protected $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * @param $model
     * @param RepositoryInterface $repository
     * @return mixed
     */
    public function apply($model, Repository $repository) {
        //关联查询
        if($this->request->__isset('with')){
            $requestObj     = $this->request->with;//获取关联表信息
            $tableInfo      = $model['table'] . '.' . $requestObj['local_key'];//关联表信息
            $relationTable  = $requestObj['table'];//被关联的表
            $relationInfo   = $relationTable . '.' . $requestObj['foreign_key'];//被关联表信息
            $model          = $model::leftJoin( $relationTable, $tableInfo, '=', $relationInfo );//执行关联关系
        }

        if ($this->request->__isset('iColumns'))
        {
            if ($this->request->__isset('fSearch_id') && ! empty($this->request->fSearch_id))
                $model = $model->where('id', '=', $this->request->fSearch_id);

           /* if ($this->request->__isset('fSearch_title') && ! empty($this->request->fSearch_title))
                $model = $model->where('title', 'like', $this->request->fSearch_title . '%' );*/
            //排序
            for ($i = 0; $i < $this->request->iColumns; $i ++)
            {
                $idx = 'iSortCol_' . $i;
                $des = 'sSortDir_' . $i;
                if ($this->request->__isset($idx) && $this->request->__isset($des))
                {
                    $key = 'mDataProp_' . $this->request->$idx;
                    if ($this->request->__isset($key))
                        $model = $model->orderBy($this->request->$key, $this->request->$des);
                }
            }
        }

        $model = $model->where('id','!=' , null);
        return $model;
    }
}