<?php
/*define('ROOTPATH',$_SERVER['DOCUMENT_ROOT']);
define('HOSTNAME','maiguoer.mysql.rds.aliyuncs.com');
define('DBNAME','maiguoer');
define('USER','liusidong');
define('PWD','Lsdlily123');
date_default_timezone_set("PRC");*/
define('ROOTPATH',str_replace('index.php','',$_SERVER['PHP_SELF']));
define('ROOT',$_SERVER['DOCUMENT_ROOT']);
define('HOSTNAME','localhost');
define('DBNAME','maiguoer');
define('USER','root');
define('PWD','root');
date_default_timezone_set("PRC");