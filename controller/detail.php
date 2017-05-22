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
    function detail() {
        $detail = $this->pdo->query('select * from `mge_news` where id ='.$GLOBALS['param_3'])->fetchAll(PDO::FETCH_ASSOC);
        require_once ('view/news-detail.php');
    }
}