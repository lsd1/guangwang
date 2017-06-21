<?php
/**
 * Created by PhpStorm.
 * User: stone
 * Date: 2017/5/22
 * Time: 14:09
 */
class newsController extends database {
    function __construct(){
        parent::__construct();
    }
    function index() {
        if(empty($GLOBALS['query_arr']['id'])) header('location: '.$_COOKIE['back_url']);
        $news = $this->pdo->query('select id,title,image,detail,catId,createTime,updateTime from `mge_news` where catId ='.$GLOBALS['query_arr']['id'])->fetchAll(PDO::FETCH_ASSOC);
        if($news){
            setcookie('back_url', 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']);
        }
        require_once ('view/news-list.php');
    }
}