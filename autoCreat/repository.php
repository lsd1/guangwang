<?php namespace App\Repositories\大写模块名;

use Bosnadev\Repositories\Contracts\RepositoryInterface;
use Bosnadev\Repositories\Eloquent\Repository;

class 大写表名Repository extends Repository
{
    /**
     * 声明模型
     * @return string
     */
    public function model()
    {
        return 'App\Models\大写模块名\大写表名';
    }
}
