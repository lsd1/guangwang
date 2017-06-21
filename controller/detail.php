<?php
/**
 * Created by PhpStorm.
 * User: stone
 * Date: 2017/5/22
 * Time: 14:09
 */
class detailController extends database {
    function __construct(){
        parent::__construct();
    }
    function index() {
        if(empty($GLOBALS['query_arr']['id'])) header('location: '.$_COOKIE['back_url']);
        $detail = $this->pdo->query('select * from `mge_news` where id ='.$GLOBALS['query_arr']['id'])->fetchAll(PDO::FETCH_ASSOC);
        if($detail) setcookie('back_url', 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']);
        require_once ('view/news-detail.php');
    }
}