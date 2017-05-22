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
    function news() {
        $news = $this->pdo->query('select id,title,image,detail,catId,createTime,updateTime from `mge_news` where catId ='.$GLOBALS['param_3'])->fetchAll(PDO::FETCH_ASSOC);
        require_once ('view/news-list.php');
    }
}