<?php
require_once('config.php');
class auto_create
{
    private $host;
    private $user;
    private $pwd;
    private $db;
    private $charset;
    public $link;
    public $sql;
    public $err;

    public function __construct($host,$user,$pwd,$db,$charset)
    {
        $this->host = $host;
        $this->user = $user;
        $this->pwd = $pwd;
        $this->db = $db;
        $this->charset = $charset;
        $this->err = array();
        $this->sql = '';
        $this->link = new mysqli($this->host,$this->user,$this->pwd,$this->db);
        if($this->link->connect_error !=null)
        {
            die("Connect Error: " . $this->link->connect_error);
        }
        $this->link->query('set names '.$charset);

    }

    public function get_res($sql)
    {
        $res = $this->link->query($sql)->fetch_all();
        return $res;
    }

    public function query($sql)
    {
        $this->link->query($sql);
    }
}

$con = new auto_create(HOST,USER,PWD,DB,CHARSET);
$con->query("set names utf8");

foreach($table AS $val){

    $sql_1 = "SELECT column_name FROM information_schema.key_column_usage WHERE table_name='{$val}' AND constraint_name='PRIMARY'";
    $sql_2 = "SELECT column_name,column_comment FROM information_schema.columns WHERE table_name='{$val}'";
    $res_1 = $con->get_res($sql_1);
    $res_2 = $con->get_res($sql_2);
    $primary_key = $res_1[0][0];//主键名
    $aoColumns = array();
    $column_name = array();
    /*给 查询字段、列表字段、大写模块名、小写模块名、大写表名、小写表名、主键名这些变量赋值*/
    foreach($res_2 as $v)
    {
        $v[1] = $v[1] == '' ? $v[0] : $v[1];
        $aoColumns[] = '{"sTitle": "'.$v[1].'", "mDataProp": "'.$v[0].'", "sWidth": "8%"}';
        $column_name[] = "'".$v[0]."'";
    }
    $column_name = implode(',',$column_name);
    $column_name = '['.$column_name.']';//查询字段
    $aoColumns = implode(',',$aoColumns);
    $aoColumns = '['.$aoColumns.']';//列表字段
    $table_explode = explode('_',$val);
    $table_u_name = '';

    foreach ($table_explode as $key2=>$val2)
    {
        if($key2 == 1){
            $m_u_name = ucfirst($val2);//大写模块名
            $m_l_name = lcfirst($val2);//小写模块名
        }
        if($key2 > 1){
            $table_u_name .= ucfirst($val2);//大写表名
        }
    }

    $table_l_name = lcfirst($table_u_name);//小写表名
    /*创建对应文件夹*/
    $dir_arr = array('./app',
        './app/Models',
        './app/Models/'.$m_u_name,
        './app/Repositories',
        './app/Repositories/'.$m_u_name,
        './app/Repositories/Criteria',
        './app/Repositories/Criteria/'.$m_u_name,
        './app/Http',
        './app/Http/Controllers',
        './app/Http/Controllers/'.$m_u_name,
        './resources',
        './resources/views',
        './resources/views/layouts',
        './resources/views/'.$m_l_name
    );
    foreach($dir_arr as $v)
    {
        if(!is_dir($v))
        {
            mkdir($v);
        }
    }
    /*处理left.blade.php*/
    $left_blade = file_get_contents('left.blade.php');
    $exist = strpos($left_blade,'<input type="hidden" data-id="'.$m_l_name.'">');
    $left_li = ' <li><a tabindex="-1" href="{{url(\''.$m_l_name.'/'.$table_l_name.'list.html\')}}"><i class="icon-chevron-right"></i>'.$table_l_name.'列表</a></li>
                    <input type="hidden" data-id="'.$table_l_name.'">';//left.blade.php的li

    $count = substr_count($left_blade,'tab-pane');
    if($exist === false)
    {
        $left_tab = '<div id="menu'.++$count.'" class="tab-pane">
                    <ul class="nav nav-list bs-docs-sidenav nav-collapse collapse">
                    <input type="hidden" data-id="'.$table_l_name.'">
                    </ul>
                    </div>
                    <input type="hidden" id="memu_tab">';
        $left_blade = str_replace('<input type="hidden" id="memu_tab">',$left_tab,$left_blade);//插入left_tab-plane
    }

    $left_blade = str_replace('<input type="hidden" data-id="'.$table_l_name.'">',$left_li,$left_blade);//插入left_li
    file_put_contents('./resources/views/layouts/left.blade.php',$left_blade);

    /*处理top.blade.php*/
    $top_blade = file_get_contents('top.blade.php');
    $top_li = '<li  id=\'{"0":"base/memberlist","1":"base/bankcard","2":"comm/resetmobile","3":"orchard/member"}\'>
                        <a href="#menu'.$count.'" role="button" data-toggle="tab">'.$m_u_name.'管理 </a>
                </li>';
    $pattern1 = '/{"0":".*}/';
    $ress = preg_match_all($pattern1, $top_blade,$matches);

    if($exist === false)//如果该模块不存在，则新建模块
    {
        $new_top_li = '<li id=\'{"0":"'.$m_l_name.'/'.$table_l_name.'"}\'>
        <a href="#menu'.$count.'" role="button" data-toggle="tab">'.$table_l_name.'</a>
        </li><input type="hidden">';
        $top_blade = str_replace('<input type="hidden">',$new_top_li,$top_blade);//插入tab-plane
    }
    else
    {
        foreach($matches[0] as $val)
        {
            $arr = json_decode($val,true);
            $top_exist = 0;
            foreach($arr as $v)
            {
                $arr_name = explode('/',$v);
                if(strpos($arr_name[0],$m_l_name))//定位该模块位置
                {
                    $top_exist = 1;
                    break;
                }
            }
            if($top_exist == 1)
            {
                if(!in_array($m_l_name.'/'.$table_l_name,$arr))
                {
                    $arr[] = $m_l_name.'/'.$table_l_name;//插入到相应位置
                }
                $new_val = json_encode($arr);
                $top_blade = str_replace($val,$new_val,$top_blade);
                break;
            }
        }
    }
    file_put_contents('./resources/views/layouts/top.blade.php',$top_blade);

    /*处理model*/
    $old_arr = array('大写模块名','小写模块名','大写表名','小写表名','列表字段','查询字段','主键名');
    $new_arr = array($m_u_name,$m_l_name,$table_u_name,$table_l_name,$aoColumns,$column_name,$primary_key);
    $file_arr = array('model.php','controller.php','blade.php','repository.php','datatable.php');

    foreach($file_arr as $k=>$v)
    {
        $file_con = file_get_contents($v);
        $file_con = str_replace($old_arr,$new_arr,$file_con);
        $file_name = '';
        switch ($v)
        {
            case 'model.php' :
                $file_name = './app/Models/'.$m_u_name.'/'.$table_u_name.'.php';
                break;
            case 'controller.php' :
                $file_name = './app/Http/Controllers/'.$m_u_name.'/'.$table_u_name.'Contorller.php';
                break;
            case 'blade.php' :
                $file_name = './resources/views/'.$m_u_name.'/'.$table_l_name.'list.blade.php';
                break;
            case 'repository.php' :
                $file_name = './app/Repositories/'.$m_u_name.'/'.$table_u_name.'Repository.php';
                break;
            case 'datatable.php' :
                $file_name = './app/Repositories/Criteria/'.$m_u_name.'/'.$table_u_name.'Datatable.php';
                break;
        }
        file_put_contents($file_name,$file_con);
    }
    /*处理controller*/
    /*处理repository*/
    /*处理Criteria*/







}




