<?php
namespace App\Models\Rebate;


use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    /**
     * 与模型关联的数据表
     *
     * @var string
     */
    protected $table = 'rebate_service';

    /**
     * 该模型的主键
     * @var string
     */
    protected $primaryKey = 'id';

}