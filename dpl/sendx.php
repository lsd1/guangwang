<?php
//批付
header("content-type:text/html;charset=utf-8");
date_default_timezone_set('PRC');
$pubkey_path = 'D:\www\guangwang\dpl\99bill.cer';//快钱公钥地址
$pfx_path = 'D:\www\guangwang\dpl\kuaiqian_rsa.pem';//商户PFX证书地址
$key_password = '123456';//证书密码

//私钥加密RSAwithSHA1
function crypto_seal_private($original_data){
    global $pfx_path,$key_password;
    //$sealed_data=array();
    $pfx_file='file://'.$pfx_path;
    $pfx=file_get_contents($pfx_file);
    //$certs=array();
    //openssl_pkcs12_read($pfx,$certs,$key_password);
    $privkey = $pfx;
    openssl_sign($original_data,$signature,$privkey,OPENSSL_ALGO_SHA1);
    return base64_encode($signature);
}

//公钥加密OPENSSL_PKCS1_PADDING
function crypto_seal_pubilc($original_data){
    global $pubkey_path;
    $sealed_data=array();
    $pubkey_file=$pubkey_path;
    $pubkey=file_get_contents("file://".$pubkey_file);
    openssl_public_encrypt($original_data,$signature,$pubkey,OPENSSL_PKCS1_PADDING);
    return base64_encode($signature);
}

//私钥解密OPENSSL_PKCS1_PADDING
function crypto_unseal_private($digitalEnvelope){
    global $pfx_path,$key_password;
    $pfx_file='file://'.$pfx_path;
    $pfx=file_get_contents($pfx_file);
    $certs=array();
    openssl_pkcs12_read($pfx,$certs,$key_password);
    $privkey=$certs['pkey'];
    $digitalEnvelope = base64_decode($digitalEnvelope);
    $aaa= openssl_private_decrypt($digitalEnvelope,$receivekey,$privkey,OPENSSL_PKCS1_PADDING);
    return $receivekey;
}

//AES加密
function encrypt_aes($encrypt,$key){
    $size = mcrypt_get_block_size(MCRYPT_RIJNDAEL_128,MCRYPT_MODE_CBC);
    $encrypt = pkcs5Pad($encrypt,$size);
    $iv = "\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0";
    $passcrypt = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $key, $encrypt, MCRYPT_MODE_CBC,$iv);
    $encode = base64_encode($passcrypt);
    return $encode;
}



//pkcs5加密
function pkcs5Pad($text,$blocksize){
    $pad = $blocksize-(strlen($text)%$blocksize);
    return $text.str_repeat(chr($pad),$pad);
}


//AES解密
function decrypt_aes($str,$key) {
    $str =  base64_decode($str);
    $iv = "\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0";
    $or_data = mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $key, $str, MCRYPT_MODE_CBC,$iv);
    $str = pkcs5Unpad($or_data);
    return $str;
}


//pcks5解密
function pkcs5Unpad($text) {
    $pad = ord($text{strlen($text)-1});
    if ($pad>strlen($text))
        return false;
    if (strspn($text,chr($pad),strlen($text)-$pad)!=$pad)
        return false;
    return substr($text,0,-1*$pad);
}

//公钥验签
function crypto_unseal_pubilc($signedData,$receiveData){
    global $pubkey_path;
    $MAC = base64_decode($signedData);
    $fp = fopen($pubkey_path, "r");
    $cert = fread($fp, 8192);
    fclose($fp);
    $pubkeyid = openssl_get_publickey($cert);
    $ok = openssl_verify($receiveData, $MAC, $pubkeyid);
    return $ok;
}


//gzip解密
function gzdecode1($data)
{
    $flags = ord(substr($data, 3, 1));
    $headerlen = 10;
    $extralen = 0;
    $filenamelen = 0;
    if ($flags & 4)
    {
        $extralen = unpack('v' ,substr($data, 10, 2));
        $extralen = $extralen[1];
        $headerlen += 2 + $extralen;
    }
    if ($flags & 8)
        $headerlen = strpos($data, chr(0), $headerlen) + 1;
    if ($flags & 16)
        $headerlen = strpos($data, chr(0), $headerlen) + 1;
    if ($flags & 2)
        $headerlen += 2;
    $unpacked = @gzinflate(substr($data, $headerlen));
    if ($unpacked === FALSE)
        $unpacked = $data;
    return $unpacked;
}
$time1 = date('YmdHis');//时间戳

/**每笔信息**/

/** 商家订单号 */
$merchantId = 'orderid_'.$time1.'_';
/** 金额 无小数点，个位代表分*/
$amt = "50";
/** 银行名称 */
$bank = "中国民生银行";
/** 户名 */
$name = "快钱公司";
/** 卡号 */
$bankCardNo = "0328014170000313";
/** 开户行 */
$branchBank = "中国民生银行股份有限公司上海支行";
/** 对公对私 0:企业; 1:个人*/
$payeeType = "0";
/** 省份 */
$province = "上海";
/** 城市 */
$city = "上海";
/** 快钱交易备注 */
$memo = "快钱备注";
/** 银行交易用备注 */
$bankPurpose = "银行交易备注";
/** 银行交易备注 */
$bankMemo = "交易备注";
/** 收款方通知知内容 */
$payeeNote = "通知内容";
/** 收款方手机号 */
$payeeMobile = "13000000000";
/** 收款方邮件 */
$payeeEmail = "123@126.com";
/** 到账时效 */
$period = "";
/** 商户预留字段1 */
$orderMemo1 = "order1";
/** 商户预留字段2 */
$orderMemo2 = "order2";
/** 商户预留字段3 */
$orderMemo3 = "order3";


/**批次信息**/

/** 商户编号 */
$memberCode = "10198880979";
/** 付款方帐号 */
$payerAcctCode = $memberCode."01";
/** 批次号 */
$batchNo = 'batchNo_'.$time1;
/** 发起日期 */
$applyDate = $time1;
/** 付款商户名称 */
$merchantName = "测试商户";
/** 总笔额 */
$totalCnt = "2";
/** 总金额 */
$totalAmt = $amt*$totalCnt;
/** 付费方式 0:收款方付款;1:付款方付费 */
$feeType = "1";
/** 币种 */
$cur = "RMB";
/** 是否验证金额 0:验证; 1:不验证*/
$checkAmtCnt = "0";
/** 是否整批失败 0:整批失败; 1:不整批失败*/
$batchFail = "1";
/** 充值方式 0:代扣，1:充值，2:垫资*/
$rechargeType = "1";
/** 是否自动退款 0:自动退款; 1:不自动退款*/
$autoRefund = "0";
/** 是否短信通知 0:通知; 1:不通知*/
$phoneNoteFlag = "0";
/** 预留字段1 */
$merchantMemo1 = "memo1";
/** 预留字段2 */
$merchantMemo2 = "memo2";
/** 预留字段3 */
$merchantMemo3 = "memo3";


//request-header
$rheader = '<tns:batch-settlement-apply-request xmlns:ns0="http://www.99bill.com/schema/commons" xmlns:ns1="http://www.99bill.com/schema/fo/commons" xmlns:tns="http://www.99bill.com/schema/fo/settlement">
  <tns:request-header>
    <tns:version xmlns:tns="http://www.99bill.com/schema/fo/commons">
      <ns0:version>1.0.1</ns0:version>
      <ns0:service>fo.batch.settlement.pay</ns0:service>
    </tns:version>
    <ns1:time>'.$time1.'</ns1:time>
  </tns:request-header>';

$rdetail = '';
for($i=1;$i<=$totalCnt;$i++){
$rdetail = $rdetail.'
<tns:pay2bank>
        <ns1:merchant-id>'.$merchantId.$i.'</ns1:merchant-id>
        <ns1:amt>'.$amt.'</ns1:amt>
        <ns1:bank>'.$bank.'</ns1:bank>
        <ns1:name>'.$name.'</ns1:name>
        <ns1:bank-card-no>'.$bankCardNo.'</ns1:bank-card-no>
        <ns1:branch-bank>'.$branchBank.'</ns1:branch-bank>
        <ns1:payee-type>'.$payeeType.'</ns1:payee-type>
        <ns1:province>'.$province.'</ns1:province>
        <ns1:city>'.$city.'</ns1:city>
        <ns1:memo>'.$memo.'</ns1:memo>
        <ns1:bank-purpose>'.$bankPurpose.'</ns1:bank-purpose>
        <ns1:bank-memo>'.$bankMemo.'</ns1:bank-memo>
        <ns1:payee-note>'.$payeeNote.'</ns1:payee-note>
        <ns1:payee-mobile>'.$payeeMobile.'</ns1:payee-mobile>
        <ns1:payee-email>'.$payeeEmail.'</ns1:payee-email>
        <ns1:period/>
        <ns1:merchant-memo1>'.$orderMemo1.'</ns1:merchant-memo1>
        <ns1:merchant-memo2>'.$orderMemo2.'</ns1:merchant-memo2>
        <ns1:merchant-memo3>'.$orderMemo3.'</ns1:merchant-memo3>
      </tns:pay2bank>';
}
//request-body
$rbody = '
<tns:request-body>
    <tns:payer-acctCode>'.$payerAcctCode.'</tns:payer-acctCode>
    <tns:batch-no>'.$batchNo.'</tns:batch-no>
    <tns:apply-date>'.$time1.'</tns:apply-date>
    <tns:name>'.$merchantName.'</tns:name>
    <tns:total-amt>'.$totalAmt.'</tns:total-amt>
    <tns:total-cnt>'.$totalCnt.'</tns:total-cnt>
    <tns:fee-type>'.$feeType.'</tns:fee-type>
    <tns:cur>'.$cur.'</tns:cur>
    <tns:checkAmt-cnt>'.$checkAmtCnt.'</tns:checkAmt-cnt>
    <tns:batch-fail>'.$batchFail.'</tns:batch-fail>
    <tns:recharge-type>'.$rechargeType.'</tns:recharge-type>
    <tns:auto-refund>'.$autoRefund.'</tns:auto-refund>
    <tns:phoneNote-flag>'.$phoneNoteFlag.'</tns:phoneNote-flag>
    <tns:merchant-memo1>'.$merchantMemo1.'</tns:merchant-memo1>
    <tns:merchant-memo2>'.$merchantMemo2.'</tns:merchant-memo2>
    <tns:merchant-memo3>'.$merchantMemo3.'</tns:merchant-memo3>
    <tns:pay2bank-list>'.$rdetail.'
	</tns:pay2bank-list>
  </tns:request-body>
</tns:batch-settlement-apply-request>';

$originalData = $rheader.$rbody;//原始报文
$autokey = rand(10000000,99999999).rand(10000000,99999999); //随机KEY
$originalData = gzencode($originalData);//GZIP压缩报文
$signeddata = crypto_seal_private($originalData);//私钥加密（验签/OPENSSL_ALGO_SHA1）
$digitalenvelope = crypto_seal_pubilc($autokey);//公钥加密（数字信封/OPENSSL_PKCS1_PADDING）
$encrypteddata = encrypt_aes($originalData,$autokey);//数据加密（AES/CBC/PKCS5Padding）

//提交地址
$url = 'https://www.99bill.com/fo-batch-settlement/services';

//提交报文
$str= '<?xml version=\'1.0\' encoding=\'UTF-8\'?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Body>
        <tns:settlement-pki-api-request xmlns:ns0="http://www.99bill.com/schema/commons" xmlns:ns1="http://www.99bill.com/schema/fo/commons" xmlns:tns="http://www.99bill.com/schema/fo/settlement">
            <tns:request-header>
                <tns:version xmlns:tns="http://www.99bill.com/schema/fo/commons">
                    <ns0:version>1.0.1</ns0:version>
                    <ns0:service>fo.batch.settlement.pay</ns0:service>
                </tns:version>
            <ns1:time>'.$time1.'</ns1:time>
            </tns:request-header>
            <tns:request-body>
                <tns:member-code>'.$memberCode.'</tns:member-code>
                <tns:data>
                    <ns1:original-data/>
                    <ns1:signed-data>'.$signeddata.'</ns1:signed-data>
                    <ns1:encrypted-data>'.$encrypteddata.'</ns1:encrypted-data>
                    <ns1:digital-envelope>'.$digitalenvelope.'</ns1:digital-envelope>
                </tns:data>
            </tns:request-body>
        </tns:settlement-pki-api-request>
    </soapenv:Body>
</soapenv:Envelope>';

$header[] = "Content-type: text/xml;charset=utf-8";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS,$str);
curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER,false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST,false);
$output = curl_exec($ch);

$dom = new DOMDocument();
$dom -> loadXML($output);
$receive = array(
'membercode' => $dom -> getElementsByTagName('member-code')->item(0)->nodeValue,//商户号
'status' => $dom -> getElementsByTagName('status')->item(0)->nodeValue,//状态
'errorCode' => $dom -> getElementsByTagName('error-code')->item(0)->nodeValue,//错误编号
'errorMsg' => $dom -> getElementsByTagName('error-msg')->item(0)->nodeValue,//错误代码
'signedData' => $dom -> getElementsByTagName('signed-data')->item(0)->nodeValue,//验签
'encryptedData' => $dom -> getElementsByTagName('encrypted-data')->item(0)->nodeValue,//加密报文
'digitalEnvelope' => $dom -> getElementsByTagName('digital-envelope')->item(0)->nodeValue//数字信封
);
echo "付款商户号：".$receive['membercode'];//商户号
echo "<br/>应答状态：".$receive['status'];//批次状态
echo "<br/>错误编号：".$receive['errorCode'];//错误编号
echo "<br/>错误代码：".$receive['errorMsg'];//错误代码

$receivekey = crypto_unseal_private($receive['digitalEnvelope']);
$receiveData2 = decrypt_aes($receive['encryptedData'],$receivekey);
$receiveData = gzdecode1($receiveData2);

echo "<br/>结果明细：<br/>";//数据结果
echo "<textarea rows=\"30\" cols=\"100\">".$receiveData."</textarea>";

$ok = crypto_unseal_pubilc($receive['signedData'],$receiveData2); 

if($ok==1) echo "<br/><br/>验签成功！";
else echo "<br/><br/>验签失败！";

?>
