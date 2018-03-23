<?php
/**
 * Created by PhpStorm.
 * User: stone
 * Date: 2017/8/13
 * Time: 15:10
 */
header("Content-Type: text/html;charset=utf-8");
$conn = mysqli_connect('rm-wz9bd20d3b7f4nefzco.mysql.rds.aliyuncs.com','liudd','sisimge2017','maiguoer-test');
mysqli_query($conn,"set character set 'utf8'");//设置读库字符编码
mysqli_query($conn,"set names 'utf8'");//设置写库字符编码
$GLOBALS['area'] = array();
/*
 *递归方式把子类地址归类到父类地址。
 *传入0则为获取全国的省市区地址。
 * $conn    数据库连接。
 * $id      地址id。
 * $fid     父id,默认为null。
 * $level   递归深度，默认为0。
 */
function show_area($conn,$id,$level = 0,$fid = null) {
    $level++;//递归深度。
    $res = mysqli_query($conn,'select * from mge_comm_area where cateId='.$id);
    if($res){
        while($row = mysqli_fetch_assoc($res)){
            if($level == 1){
                $GLOBALS['area'][$row['id']]['id'] = $row['id'];
                $GLOBALS['area'][$row['id']]['name'] = $row['areaName'];
            }else if($level == 2) {
                $GLOBALS['area'][$row['cateId']]['citylist'][$row['id']]['id'] = $row['id'];
                $GLOBALS['area'][$row['cateId']]['citylist'][$row['id']]['name'] = $row['areaName'];
                if ($level == 2) {
                    $fid = $row['cateId'];
                }
            }
            if($level<=2)
                show_area($conn, $row['id'], $level, $fid);
        }

    }
    //print_r($GLOBALS['area']);die;
}
//var_dump($GLOBALS['area'])
/*
 *把数组下标格式化为从0递增开始。
 */
function del_key(){
    $newarea = array();
    foreach ($GLOBALS['area'] as $k => $v){
        $newarea[] = $v;
    }
    foreach ($newarea as $k => $v){
        if(isset($v['citylist'])) {
            foreach ($v['citylist'] as $k1 => $v1) {
                $newarea[$k]['citylist1'][] = $v1;
            }
            unset($newarea[$k]['citylist']);
            $newarea[$k]['citylist'] = $newarea[$k]['citylist1'];
            unset($newarea[$k]['citylist1']);
        }
    }
    foreach ($newarea as $k => $v){
        if(isset($v['citylist'])) {
            foreach ($v['citylist'] as $k1 => $v1) {
                if (isset($v1['area'])) {
                    foreach ($v1['area'] as $k2 => $v2) {
                        $newarea[$k]['citylist'][$k1]['area1'][] = $v2;
                    }
                    unset($newarea[$k]['citylist'][$k1]['area']);
                    $newarea[$k]['citylist'][$k1]['area'] = $newarea[$k]['citylist'][$k1]['area1'];
                    unset($newarea[$k]['citylist'][$k1]['area1']);
                }
            }
        }
    }
    $GLOBALS['area'] = $newarea;
}

show_area($conn,0);
del_key();
file_put_contents('./area.json',json_encode($GLOBALS['area'] ,JSON_UNESCAPED_UNICODE));