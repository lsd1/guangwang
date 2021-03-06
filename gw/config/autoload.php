<?php
require_once 'config.php';
$url = explode('/',$_SERVER['REQUEST_URI']);
foreach ($url as $k=>$v) {
    if($k == 0) continue;
    if($k == 1){
        $c_name = $v;//控制器名称
    }elseif($k == 2){
        $method = $v;//方法名称
    }else{
        $param = 'param_'.$k;
        global $$param;
        $$param = $v;//方法名称
    }
}

$query_str = explode('&',$_SERVER['QUERY_STRING']);
global $query_arr;
foreach($query_str as $v){
    $query = explode('=',$v);
    @$query_arr[$query[0]] = $query[1];
}
$c_name = empty($query_arr['act'])? 'index' : $query_arr['act'];
$method = empty($query_arr['op'])? 'index' : $query_arr['op'];
$controller_file = ROOT.ROOTPATH.'controller/'.$c_name.'.php';//拼接控制器文件路径
try{
    require_once ROOT.ROOTPATH.'controller/database.php';
    require_once $controller_file;//加载相应控制器文件
    $controller = $c_name.'Controller';
    $controller = new $controller;//实例化控制器
    $controller->$method();//执行对应方法
}catch(Exception $e){
    echo $e->getMessage();
}
