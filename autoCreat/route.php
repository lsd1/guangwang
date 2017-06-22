<?php
Route::group(['prefix' => '小写模块名', 'namespace' => '大写模块名'], function () {
    Route::get('小写表名list.html', '大写表名Controller@index');//大写模块名-小写表名列表
    Route::post('小写表名ListAjax', '大写表名Controller@小写表名ListAjax');//大写模块名-小写表名列表
});