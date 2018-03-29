<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->group(['namespace' => 'V1', 'prefix' => 'v1.0'], function () use ($router) {
	
	$router->group(['middleware' => ['auth.lang', 'auth.version']], function () use ($router) {

		$router->group(['middleware' => ['auth.sign']], function () use ($router) {

			// 注册用户
			$router->post('/register', 'RegisterController@index');

			// 检测注册用户名
			$router->post('/register/check_username', 'RegisterController@checkUsername');
				
			// 登陆
			$router->post('/login', 'LoginController@login');
				
		
		});

		$router->group(['middleware' => ['auth.user', 'auth.sign', 'auth.login']], function () use ($router) {

			$router->group(['namespace' => 'User'], function () use ($router) {

				// 登出
				$router->post('/logout', 'LogoutController@logout');

				// 修改密码
				$router->post('/user/edit_password', 'UserPwdController@edit');

				// 修改头像
				$router->post('/user/upload_avatar', 'ActionController@uploadAvatar');

				// 提取积分
				$router->post('/user/draw_score', 'ActionController@drawScore');

				// 积分日志
				$router->get('/user/score_logs', 'ShowController@socreLogs');

				// 果园互动列表
				$router->get('/user/pick_list', 'ShowController@pickList');
				
			});
			
			$router->group(['namespace' => 'Tool'], function () use ($router) {
	
				// 查看道具
				$router->get('/tool/show', 'ShowController@index');

				// 查看道具提示
				$router->get('/tool/show_tips', 'ShowController@tips');
				
			});
		
		});

	});

});