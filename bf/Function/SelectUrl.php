<?php
/**
 * Description of SelectUrl
 * @author dasheng@baofoo.com
 */
class SelectUrl {
    /**
     * 
     * @param type $IsTest  正式（true）/测试(false)
     * @param int $InterfaceType   1(PC),2(WAP)
     * @param type $RequestType   1(交易接口),2(订单查询),3(绑定ID查询)
     * @return string
     */
    public static function Url($IsTest,$RequestType){
        $UrlString="";
        switch ($RequestType){
            case 1:
                $UrlString = "preparebind";//预绑卡
                break;
            case 2:
                $UrlString = "bindcard";//确认绑卡
                break;
            case 3:
                $UrlString = "querybind";//绑定ID查询
                break;
            case 4:
                $UrlString = "prepareorder";//预支付
                break;
            case 5:
                $UrlString = "confirmorder";//确认支付
                break;    
            case 6:
                $UrlString = "queryorder";//订单查询
                break;
            default:
                throw new Exception("【RequestType】不正确！");
        }
        if($IsTest){
            $UrlString = "https://gw.baofoo.com/quickpay/api/".$UrlString;
        }else{
            $UrlString = "https://vgw.baofoo.com/quickpay/api/".$UrlString;
        }
        RETURN $UrlString;
    }
    //put your code here
}
