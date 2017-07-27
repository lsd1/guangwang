<?php
error_reporting(0); //抑制所有错误信息
@header("content-Type: text/html; charset=utf-8"); //语言强制

require_once('SdkXML.php');
require_once('BFRSA.php');

$pre_order_url = 'https://vgw.baofoo.com/quickpay/api/prepareorder';
$cfm_order_url = 'https://vgw.baofoo.com/quickpay/api/confirmorder';
$notify_url = 'https://preapi.maiguoer.com/test';
$query_order_url = 'https://vgw.baofoo.com/quickpay/api/queryorder';
$query_bind_url = 'https://vgw.baofoo.com/quickpay/api/querybind';
$get_device_id_url = "https://fk.baofoo.com/getDeviceMem";//设备指纹请求地址。

$version = "4.0.1.0";//版本号
$member_id = "100000178";	//商户号
$terminal_id = "100000916";	//终端号
$input_charset = "1";//字符集
$language = "1";//语言
$data_type = "xml";//加密报文的数据类型（xml/json）
$txt_sub_type = '01'; //默认01普通02分账

$private_key_password = "100000178_204500";	//商户私钥证书密码
$pfxfilename = "bfkey_100000178@@100000916.pfx";  //注意证书路径是否存在
$cerfilename = "bfkey_100000178@@100000916.cer";//注意证书路径是否存在

/*预支付*/
$trans_id = 'test' . time();
$device_id_data = ['member_id'=>$member_id,'session_id'=>'1000001200test1500361792004'];
$device_id_data2 = ['member_id'=>$member_id,'session_id'=>$member_id.$trans_id];
//print_r($device_id_data);die;
/*$res_device_id = curl_post($get_device_id_url,$device_id_data);
echo $res_device_id;die;
var_dump($res_device_id);die;*/

$trans_serial_no = 'testpay' . date('YmdHis');
$txn_amt = 100;
$trade_date = date('YmdHis');
$additional_info = '一斤苹果';
$req_reserved = '保留';
$risk_item = [
	'goods_category' => '4001',
	'user_no' => '100002',
	'user_login_id' => '100002',
	'user_mobile' => '13613040010',
	'user_type' => 1,
	'register_user_name' => 'lsd111',
	'register_time' => '20170101010101',
	'trans_ip' => '116.7.64.3',
	'identify_state' => 0,
	'identify_type' => 1,
	'device_no' => $trans_id,
	'device_id' => $trans_id,
	'goods_description' => '红苹果',
	'goods_no' => '001',
	'address' => '深圳市南山区',
	'name' => '李生',
	'mobile' => '13613040010'
];

$acc_no = '6217007200047452225';
$card_holder = '刘思东';
$id_card_type = '01';
$id_card = '441481199201081139';
$mobile = '13613040010';
$valid_date = '';
$cvv = '';

$parms = [
    'terminal_id' => $terminal_id, 'member_id' => $member_id, 'user_id' => '100002', 'trans_id' => $trans_id,
    'txn_amt' => $txn_amt, 'trade_date' => $trade_date, 'trans_serial_no' => $trans_serial_no,
    'risk_item' => json_encode($risk_item), 'acc_no' => $acc_no, 'card_holder' => $card_holder,
    'id_card_type' => $id_card_type, 'id_card' => $id_card, 'mobile' => $mobile
];
/*print_r($parms);*/
$toxml = new SdkXML();
$string = $toxml->toXml($parms);

//实例化加密类。
$BFRsa = new BFRSA($pfxfilename, $cerfilename, $private_key_password);

//先BASE64进行编码再RSA加密
$string = $BFRsa->encryptedByPrivateKey($string);

$data = [
    'version' => $version, 'input_charset' => $input_charset, 'terminal_id' => $terminal_id, 'member_id' => $member_id,
    'data_type' => $data_type, 'txt_sub_type' => $txt_sub_type, 'data_content' => $string
];

/*print_r($data);
$res = curl_post($pre_order_url, $data);
$res = res_to_arr($res);
$data_content = $res['data_content'];
$data_content = $toxml->XTA($BFRsa->decryptByPublicKey($data_content));
print_r($data_content);echo '<br>';die;*/


/*支付*/
$business_no = $data_content['business_no'];
$parms2 = [
    'terminal_id' => $terminal_id, 'member_id' => $member_id, 'additional_info' => $additional_info,
    'trans_serial_no' => $trans_serial_no,'sms_code'=>'111111', 'req_reserved' => $req_reserved, 'business_no'=>$business_no
];

$string2 = $toxml->toXml($parms2);
$string2 = $BFRsa->encryptedByPrivateKey($string2);
$data2 = [
    'version' => $version, 'input_charset' => $input_charset,'terminal_id' => $terminal_id, 'member_id' => $member_id,
    'data_type' => $data_type,'data_content' => $string2
];

//$res2 = curl_post($cfm_order_url, $data2);
/*$res2 = res_to_arr($res2);
$res2 = $BFRsa->decryptByPublicKey($res2['data_content']);
$data_content = $toxml->XTA($res2);
var_dump($data_content);echo '<br>';*/


/*查询订单*/
$parms3 = [
    'terminal_id' => $terminal_id, 'member_id' => $member_id, 'trans_serial_no' => $trans_serial_no,
    'orig_trans_id'=>$trans_id,'trade_date'=>$trade_date, 'req_reserved' => $req_reserved,'additional_info' => $additional_info
];
$string3 = $toxml->toXml($parms3);
$string3 = $BFRsa->encryptedByPrivateKey($string3);
$data3 = [
    'version' => $version, 'input_charset' => $input_charset,'terminal_id' => $terminal_id, 'member_id' => $member_id,
    'data_type' => $data_type,'data_content' => $string3
];

//$res3 = curl_post($query_order_url, $data3);
//$res3 = res_to_arr($res3);
/*$res3 = $BFRsa->decryptByPublicKey($res3['data_content']);
$data_content = $toxml->XTA($res3);
var_dump($data_content);echo '<br>';*/

/*查询绑卡情况*/
$parms4 = [
    'terminal_id' => $terminal_id, 'member_id' => $member_id, 'user_id' => '100000','trans_serial_no' => $trans_serial_no,
	'req_reserved' => $req_reserved,'additional_info' => $additional_info
];
$string4 = $toxml->toXml($parms4);
$string4 = $BFRsa->encryptedByPrivateKey($string4);
$data4 = [
    'version' => $version, 'input_charset' => $input_charset,'terminal_id' => $terminal_id, 'member_id' => $member_id,
    'data_type' => $data_type,'data_content' => $string4
];

$res4 = curl_post($query_bind_url, $data4);
$res4 = res_to_arr($res4);
$res4 = $BFRsa->decryptByPublicKey($res4['data_content']);
$data_content = $toxml->XTA($res4);
var_dump($data_content);echo '<br>';


function res_to_arr($res){
    $res = explode('&',$res);
    $new_res = array();
    foreach($res as $val){
        $arr = explode('=',$val);
        $new_res [$arr[0]] = $arr[1];
    }
    return $new_res;
}

function curl_post($url, $data)
{
    //格式化参数
    $body = http_build_query($data);

    // 启动一个CURL会话
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $body);
    curl_setopt($curl, CURLOPT_TIMEOUT, 30);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

    $tmpInfo = curl_exec($curl);

    if (curl_errno($curl)) {
        $tmpInfo = curl_error($curl);
    }

    curl_close($curl);

    return $tmpInfo;
}

?>
