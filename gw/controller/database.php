<?php
class database {
    protected $pdo;
    function __construct()
    {
        $this->pdo = new pdo("mysql:host=".HOSTNAME.";dbname=".DBNAME,USER,PWD);
        $this->pdo->exec("set names utf8");
    }
}