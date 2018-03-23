<?php
function calGl($total, $num, $times)
{

    $arr = [];
    for($i = 0; $i < 101; $i++)
    {
        $arr[$i] = 0;
    }
    function qhb($total, $num)
    {
        global $arr;
        if($num > 1)
        {
            $min = 1;
            $max = ($total/$num) * 2;
            $getMoney = mt_rand($min, $max);
            $arr[$getMoney] = $arr[$getMoney] + 1;
            echo $getMoney.'<br />';
            $total = $total - $getMoney;
            $num--;
            qhb($total, $num);
        }
        elseif($num = 1)
        {
            $getMoney = $total;
            $arr[$getMoney] = $arr[$getMoney] + 1;
            $total = $total - $getMoney;
            $num--;
        }
    }
    for($j = 0; $j < count($arr); $j++)
    {
        //echo '出现'.$j.'的概率是:'.($arr[$j]).'%<br />';
    }    qhb($total, $num);
    print_r($arr);
}
calGl(100,4,100);

?>