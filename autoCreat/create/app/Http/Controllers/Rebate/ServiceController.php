<?php
namespace App\Http\Controllers\Rebate;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\Rebate\ServiceRepository as service;
use App\Repositories\Criteria\Rebate\ServiceDatatable;

class ServiceController extends Controller
{
    protected $service;
    public function __construct(Service $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return view('rebate.servicelist');
    }

    /**
     * ajax 列表
     * @param
     * @return
     *
     * auther simon 2017-05-12
     */
    public function serviceListAjax(Request $request)
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
            $this->service->pushCriteria(new ServiceDatatable($request));
            //分页并转为json数据
            $fieldArray = ['id','sid','uid','title','telephone','name','address','details','amount','merchant','backPV','url','type','curStatus','content','createTime','updateTime','id','sid','uid','title','telephone','name','address','details','amount','merchant','backPV','url','type','curStatus','content','createTime','updateTime'];

            $result = $this->service->paginate(intval($request->iDisplayLength), $fieldArray);

            return \Response::json($result);
        }

        return view('service.index');
    }
}