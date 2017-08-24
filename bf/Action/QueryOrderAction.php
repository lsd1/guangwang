<?php
require_once '../Config/init.php';
Log::LogWirte("=====================订单查询交易====================");

$orig_trans_id = isset($_POST["orig_trans_id"])? trim($_POST["orig_trans_id"]):die("订单号不能为空【orig_trans_id】");//商户订单号

$DataContentParms =ARRAY();
$DataContentParms["member_id"] = $GLOBALS["member_id"];//商户号
$DataContentParms["terminal_id"] = $GLOBALS["terminal_id"];//终端号
$DataContentParms["orig_trans_id"]=$orig_trans_id;
$DataContentParms["trans_serial_no"]="PHPTSN".get_transid().rand4();
$DataContentParms["trade_date"]=return_time();
$DataContentParms["additional_info"]="附加信息";
$DataContentParms["req_reserved"]="保留";

if($GLOBALS["data_type"] == "json"){
	$Encrypted_string = str_replace("\\/", "/",json_encode($DataContentParms));//转JSON
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
$return = HttpClient::Post($PostArry, SelectUrl::Url($GLOBALS["IsTest"],6));//发送请求到宝付服务器，并输出返回结果。
Log::LogWirte("请求返回参数：".$return);

if(empty($return)){
    throw new Exception("返回为空，确认是否网络原因！");
}

$ReturnCountent = array();
parse_str($return, $ReturnCountent);

if($ReturnCountent["ret_code"]!="0000"){
    echo "请求状态：$ReturnCountent[ret_code],返回消息：$ReturnCountent[ret_msg]";
    die();
}

Log::LogWirte("密文:".$ReturnCountent["data_content"]);
$ReturnDecode = $BFRsa->decryptByPublicKey($ReturnCountent["data_content"]);//解密返回的报文
Log::LogWirte("解密结果：".$ReturnDecode);

$DendataContent = array();
if(!empty($ReturnDecode)){//解析XML、JSON
    if($GLOBALS["data_type"] =="xml"){
        $DendataContent = SdkXML::XTA($ReturnDecode);
    }else{
        $DendataContent = json_decode($ReturnDecode,TRUE);
    }
}  else {
    throw new Exception("解密异常，请检查证书");
}

if(array_key_exists("resp_code", $DendataContent)){    
    if($DendataContent["resp_code"]=="0000"){
        echo "订单状态：$DendataContent[resp_code],应答消息：$DendataContent[resp_msg],订单号：$DendataContent[trans_id],成功金额：$DendataContent[succ_amt]（分）";
        die();
    }  else {
        echo "订单状态：$DendataContent[resp_code],应答消息：$DendataContent[resp_msg]";
        die();
    }
}  else {
    throw new Exception("返回异常！【resp_code】不存在！");
}