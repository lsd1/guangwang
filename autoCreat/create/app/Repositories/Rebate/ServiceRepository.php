<?php namespace App\Repositories\Rebate;

use Bosnadev\Repositories\Contracts\RepositoryInterface;
use Bosnadev\Repositories\Eloquent\Repository;

class ServiceRepository extends Repository
{
    /**
     * 声明模型
     * @return string
     */
    public function model()
    {
        return 'App\Models\Rebate\Service';
    }
}
