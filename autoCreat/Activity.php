<?php
namespace App\Models\大写模块名;


use Illuminate\Database\Eloquent\Model;

class 大写表名 extends Model
{
    /**
     * 与模型关联的数据表
     *
     * @var string
     */
    protected $table = '小写模块名_小写表名';

    /**
     * 该模型的主键
     * @var string
     */
    protected $primaryKey = '主键名';

}