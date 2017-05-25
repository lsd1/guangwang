<?php
/**
 * Created by PhpStorm.
 * User: stone
 * Date: 2017/5/22
 * Time: 14:09
 */
class indexController extends database {
    function __construct(){
        parent::__construct();
    }
    function index() {
        $news_list = $this->pdo->query('select * from `mge_news_cat`')->fetchAll(PDO::FETCH_ASSOC);
        require('view/index.php');
    }
}