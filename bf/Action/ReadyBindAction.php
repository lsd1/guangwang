<?php
require_once '../Config/init.php';
Log::LogWirte("=====================预绑卡交易====================");
//==================接收预绑卡数据==========================
$acc_no = isset($_POST["acc_no"])? trim($_POST["acc_no"]):"";//卡号
$card_type = isset($_POST["card_type"])? trim($_POST["card_type"]):"";//卡类型
$card_holder = isset($_POST["card_holder"])? trim($_POST["card_holder"]):"";//姓名
$mobile = isset($_POST["mobile"])? trim($_POST["mobile"]):"";//手机号
$id_card = isset($_POST["id_card"])? trim($_POST["id_card"]):"";//身份证号
$valid_date = isset($_POST["valid_date"])? trim($_POST["valid_date"]):"";//卡有效期
$cvv = isset($_POST["cvv"])? trim($_POST["cvv"]):"";//卡安全码 

//================报文组装=================================
$DataContentParms =ARRAY();
$DataContentParms["member_id"] = $GLOBALS["member_id"];//商户号
$DataContentParms["terminal_id"] = $GLOBALS["terminal_id"];//终端号
$DataContentParms["acc_no"] =$acc_no;
$DataContentParms["card_type"] =$card_type ;
$DataContentParms["card_holder"] =$card_holder;

$DataContentParms["id_card_type"] = "01";//固定身份证类型
$DataContentParms["id_card"] = $id_card;
$DataContentParms["mobile"] = $mobile;

$DataContentParms["trans_serial_no"] = "PHPTSN".get_transid().rand4();
$DataContentParms["trade_date"] = return_time();

$DataContentParms["valid_date"] = $valid_date;//卡有效期
$DataContentParms["cvv"] = $cvv;//卡安全码
$DataContentParms["user_id"] ="131546548646" ;//平台USER_ID
$DataContentParms["additional_info"] = "附加信息";
$DataContentParms["req_reserved"] = "保留" ;

//==================转换数据类型=============================================
if($GLOBALS["data_type"] == "json"){
	$Encrypted_string = str_replace("\\/", "/",json_encode($DataContentParms,TRUE));//转JSON
}else{
	$toxml = new SdkXML();	//实例化XML转换类
	$Encrypted_string = $toxml->toXml($DataContentParms);//转XML
}
Log::LogWirte("序列化结果：".$Encrypted_string);

$BFRsa = new BFRSA($GLOBALS["pfxfilename"], $GLOBALS["cerfilename"], $GLOBALS["private_key_password"]); //实例化加密类。
$Encrypted = $BFRsa->encryptedByPrivateKey($Encrypted_string);	//先BASE64进行编码再RSA加密

$PostArry = array("version" => $version,
    "member_id" => $GLOBALS["member_id"],
    "terminal_id" =>$GLOBALS["terminal_id"],
    "input_charset" =>$GLOBALS["input_charset"],
    "data_type" =>$GLOBALS["data_type"],
    "data_content" =>$Encrypted);
$return = HttpClient::Post($PostArry, SelectUrl::Url($GLOBALS["IsTest"],1));//发送请求到宝付服务器，并输出返回结果。
Log::LogWirte("请求返回参数：".$return);

if(empty($return)){
    throw new Exception("返回为空，确认是否网络原因！");
}

$ReturnCountent = array();
parse_str($return, $ReturnCountent);

if($ReturnCountent["ret_code"]!="0000"){
    echo "请求状态：$ReturnCountent[ret_code],返回消息：$ReturnCountent[ret_msg]";
    die();//退出执行
}

Log::LogWirte("密文:".$ReturnCountent["data_content"]);
$ReturnDecode = $BFRsa->decryptByPublicKey($ReturnCountent["data_content"]);//解密返回的报文
Log::LogWirte("解密结果：".$ReturnDecode);

if(empty($ReturnDecode)){
    throw  new Exception("RSA解密异常！");
}

echo json_encode(simplexml_load_string($ReturnDecode),TRUE);