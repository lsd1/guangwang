<?php

error_reporting(0); //抑制所有错误信息
@header("content-Type: text/html; charset=utf-8"); //语言强制

require_once('SdkXML.php');
require_once('BFRSA.php');

$pre_order_url = 'https://vgw.baofoo.com/quickpay/api/prepareorder';
$cfm_order_url = 'https://vgw.baofoo.com/quickpay/api/confirmorder';
$notify_url = 'https://preapi.maiguoer.com/test';

$version = "4.0.0.0";//版本号
$member_id = "100000178";	//商户号
$terminal_id = "100000916";	//终端号
$input_charset = "1";//字符集
$language = "1";//语言
$data_type = "xml";//加密报文的数据类型（xml/json）
$txt_sub_type = '01'; //默认01普通02分账

$private_key_password = "100000178_204500";	//商户私钥证书密码
$pfxfilename = "bfkey_100000178@@100000916.pfx";  //注意证书路径是否存在
$cerfilename = "bfkey_100000178@@100000916.cer";//注意证书路径是否存在

$trans_id = 'test' . date('YmdHis');
$trans_serial_no = 'testpay' . date('YmdHis');
$txn_amt = 1;
$trade_date = date('YmdHis');
$additional_info = '一个大西瓜';
$req_reserved = '保留';
$risk_item = 4001;

$parms = [
	'terminal_id' => $terminal_id, 'member_id' => $member_id, 'user_id' => '100000', 'trans_id' => $trans_id,
	'txn_amt' => $txn_amt, 'trade_date' => $trade_date, 'additional_info' => $additional_info, 
	'notify_url' => $notify_url, 'req_reserved' => $req_reserved, 'trans_serial_no' => $trans_serial_no,
	'risk_item' => $risk_item
];

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

$res = curl_post($pre_order_url, $data);

$res = explode('&',$res);
$new_res = array();
foreach($res as $val){
	$arr = explode('=',$val);
	$new_res [$arr[0]] = $arr[1]; 
}
var_dump($new_res);die;
$liushui = '588e4262059ec7c0b227fbaeca5a44eee3f3d20372109a6224eecd852424644a0af94686037fa559adfa2e4933e5a9d4cadf4501591ec9878f6bab71d3ff35d240e88a773666a68a0fa72ff16d648f99dea4f1ebf8dfe09d6305483ea9b5940b19447fec652289e802a958a3a3d5495f12c9b9b306bf875054aa89aa76b19a270ef2f40102fafbee47457b7723e43130f364e12f6a7467828c9f695861c1056b5275e1b7be750f119b2ceee4e46eb6e97c80fb40db5e265db66e46295bc0cc2cec155907405614c6d860a3099c7a65e21de9ba9a089b42de99efc4512a4c403e704db63d81692e9ec473fb89489e440fef63077c1e953a639ccaff9fad87f6bc5771cccf9c8175e6cabe1ac30dddfb2e689908343df38d0acea2e2c03b2be586f6c6fb55c5704933f74966bbfe4958c1dcb9e5fd22cb4c00d7506cd98318f57f30bc7a6023ab260f3fe239761ffd4591183d22dee32e68ac25499aec989809589e006294346db41d0ca144897a18fa5cac8707dd4bb4059facd638392f7f6320224518a411b91f8348717f1e4916991560bbdfa79b4e3e8a0561052105325ec14f1579c712cedcccac2973115a48f1aa4cef86d92cd6d668836653d744c8f532899e9041708f9fab0d42e96b1fb5540d152481bcf915c1c23094509e7a5bf79713b5c7bc328eeab32fbae1f2dca043bd4c5bbc0a0149137cf552ddef64fdeeeb755a270399ef08035b736f334ddc47f9ede3e9501a49df853840e438f9505736142b709651801fdd25940872efe0c99866ad5c90b9ec5ebc9a265cda1f7fbbb797e0ac2d861cd03e50733c08d1d96c538cf8ea9bbf57c2fabaa5aa90e249adfc78e541f7469c8e81eb9140e5d60050c567c869f6176fbd79e0320db9b33b4ae85e31568e0b2c20e47e94bbe37a1010a16cc8f9c753de2452ca79006fd2f19033abba5d49f26190a04123b7b4bb18e6226d5a63aa9dfdd1170e66e27efbabf2de33bacf6fa6a2587f0b5af4f2703faabda492b4b53012d320f847ff7ac22aa1ed43df81e5cc7aa7cb0858eef49432bdbe0083110e14e7c19992cbbeccbe973290';

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
