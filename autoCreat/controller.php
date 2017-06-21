<?php
namespace App\Http\Controllers\大写模块名;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\大写模块名\大写表名Repository as 小写表名;
use App\Repositories\Criteria\大写模块名\大写表名Datatable;

class 大写表名Controller extends Controller
{
    protected $小写表名;
    public function __construct(大写表名 $小写表名)
    {
        $this->小写表名 = $小写表名;
    }

    public function index()
    {
        return view('小写模块名.小写表名list');
    }

    /**
     * ajax 列表
     * @param
     * @return
     *
     * auther simon 2017-05-12
     */
    public function 小写表名ListAjax(Request $request)
    {
        //判断是否是ajax请求
        if ($request->ajax()) {
            //获取分页参数
            $pageStart = intval($request->iDisplayStart) + 1;
            $pageLength = intval($request->iDisplayLength) ?: 20;
            $page = ceil($pageStart / $pageLength);
            //Request 添加page参数
            $request->merge(['page' => $page]);

            //获取数据资源
            $this->小写表名->pushCriteria(new 大写表名Datatable($request));
            //分页并转为json数据
            $fieldArray = 查询字段;

            $result = $this->小写表名->paginate(intval($request->iDisplayLength), $fieldArray);

            return \Response::json($result);
        }

        return view('小写表名.index');
    }
}