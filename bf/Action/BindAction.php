<?php
/**
 * 宝付快捷支付-DEMO
 * 本实例依赖包在WEB-IF/lib文件夹内，证书在CER文件夹，配制文件在System_Config/app.properties
 * 实例仅供学习《宝付快捷支付API》接口使用，仅供参考。商户可根据本实例写自已的代码
 * @author：宝付（大圣）
 * @date:20160620
 * 
 *测试卡具体信息如下：
 *银行卡号 		发卡行名称  姓名    身份证号    手机号
 *6222020111122220000	工商银行    张宝    320301198502169142	对接人员手机号	
 *6228480444455553333	农业银行    王宝    320301198502169142	对接人员手机号
 */
require_once '../Config/init.php';
Log::LogWirte("=====================支付交易====================");
//==================接收用户数据==========================

$sms_code = isset($_POST["sms_code"])? trim($_POST["sms_code"]):"";//短信验证码不为空
$unique_code = isset($_POST["unique_code"])? trim($_POST["unique_code"]):"";//预绑卡维一标识码

//================报文组装=================================
$DataContentParms =ARRAY();

$DataContentParms["member_id"] = $GLOBALS["member_id"];//商户号
$DataContentParms["terminal_id"] = $GLOBALS["terminal_id"];//终端号
$DataContentParms["sms_code"] =$sms_code;//短信验证码
$DataContentParms["unique_code"] =$unique_code ;//预绑卡维一标识码
$DataContentParms["additional_info"] = "附加信息";
$DataContentParms["req_reserved"] = "保留" ;
$DataContentParms["trade_date"] = return_time();
$DataContentParms["trans_serial_no"] = "PHPTSN".get_transid().rand4();

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
$return = HttpClient::Post($PostArry, SelectUrl::Url($GLOBALS["IsTest"],2));//发送请求到宝付服务器，并输出返回结果。
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
        echo "订单状态：$DendataContent[resp_code],应答消息：$DendataContent[resp_msg] ,用户ID:$DendataContent[user_id]";
        if(is_array($DendataContent["card"])){//遍历绑定表
            echo ", 绑定ID：".$DendataContent["card"]["bind_id"];            
        }        
        die();//退出执行
    }  else {
        echo "订单状态：$DendataContent[resp_code],应答消息：$DendataContent[resp_msg]";
        die();//退出执行
    }
}  else {
    throw new Exception("返回异常！【resp_code】不存在！");
}
die();
?>