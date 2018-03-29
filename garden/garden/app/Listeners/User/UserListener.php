<?php namespace App\Listeners\user;

use Exception, DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

use App\Repositories\User\UserRepository as User;
use App\Repositories\User\UserTokenRepository as UserToken;
use App\Repositories\User\UserCountRepository as UserCount;
use App\Repositories\User\UserAttachRepository as UserAttach;
use App\Repositories\User\UserScoreLogRepository as UserScoreLog;
use App\Repositories\User\UserScoreTakeRepository as UserScoreTake;

class UserListener
{
	
	private $request;

	private $user;
	private $userToken;

    /**
     * 创建监听器
     *
     * 构造函数
     */
    public function __construct(Request $request, User $user, UserToken $userToken) {

        $this->request = $request;

		$this->user = $user;
		$this->userToken = $userToken;

    }

	public function onRegister($event) {
		
		$username = $this->request->input('username', '');
		$password = $this->request->input('password', '');
		$salt = str_random(6);
		$datetime = date('Y-m-d H:i:s');

		DB::beginTransaction();
		try {
			$user = $this->user->create([
				'username' => $username, 'password' => md5($password . $salt), 
				'salt' => $salt, 'datetime' => $datetime
			]);

			DB::commit();
        } catch (Exception $e) {
            DB::rollback();
            throw new Exception('创建失败！');
        }

	}

	public function onLogin($event) {
		
		$userId = $this->request->input('userId', 0);
		$username = $this->request->input('username', '');
		$version = $this->request->input('version', '1.0.0');
		$clientType = $this->request->input('clientType', 0);
		$network = $this->request->input('network', 0);
		$lang = $this->request->input('lang', 0);
		$token = $this->request->input('token', '');
		$datetime = date('Y-m-d H:i:s');

		$login = $this->userToken->getOneByUserId($userId);
		
		if ($login)
		{
			$login->version = $version;
			$login->clientType = $clientType;
			$login->network = $network;
			$login->lang = $lang;
			$login->token = $token;
			$login->datetime = $datetime;

			$login->save();
		} else {
			$login = $this->userToken->create([	
				'userId' => $userId, 'version' => $version,
				'clientType' => $clientType, 'network' => $network,
				'lang' => $lang, 'token' => $token,
				'datetime' => $datetime	
			]);
		}
		
		if (! $login)
		{
			throw new Exception('登录失败！');
		}

	}

	public function onLogout($event) {
		
		$userId = $this->request->input('userId', 0);
		$username = $this->request->input('username', '');
		$token = md5(str_random(30) . $username);
		
		$login = $this->userToken->getOneByUserId($userId);
		
		if ($login)
		{
			$login->token = $token;

			$login->save();
		}

	}

	public function onUploadAvatar($event) {
		
		$userId = $this->request->input('userId', 0);
		$username = $this->request->input('username', '');
		$avatarPath = $this->request->input('avatarPath', '');
		$avatar = $this->request->file('avatar');

		$attach = app(UserAttach::class)->getOne($userId, 1, 1);

		$l = strripos($avatarPath, '/');
		$path = substr($avatarPath, 0, $l);
		$file = substr($avatarPath, $l + 1);

		DB::beginTransaction();
		try {
			Storage::putFileAs($path, $avatar, $file);

			if ($attach)
			{
				$attach->datetime = date('Y-m-d H:i:s');
				$attach->save();
			} else {
				app(UserAttach::class)->create([
					'userId' => $userId, 'curType' => 1, 'useType' => 1, 'url' => $avatarPath, 'datetime' => date('Y-m-d H:i:s')
				]);
			}

			DB::commit();
        } catch (Exception $e) {
            DB::rollback();
            throw new Exception('上传失败！');
        }

	}

	public function onTakeScore($event) {

		$username = $this->request->input('username', '');
		$userId = $this->request->input('userId', 0);
		$score = $this->request->input('score', 0);
		$address = $this->request->input('address', '');

		$count = app(UserCount::class)->getOneByUserId($userId);

		DB::beginTransaction();
		try {
			
			app(UserCount::class)->decrementScore($userId, $score);

			app(UserScoreLog::class)->create([
				'userId' => $userId, 'changeType' => 0, 'changeScore' => $score,
				'oldScore' => $count->score, 'newScore' => $count->score - $score,
				'content' => 'user.user_score_take', 'datetime' => date('Y-m-d H:i:s')
			]);

			app(UserScoreTake::class)->create([
				'userId' => $userId, 'address' => $address, 'score' => $score,
				'datetime' => date('Y-m-d H:i:s')
			]);

			DB::commit();
        } catch (Exception $e) {
            DB::rollback();
            throw new Exception('上传失败！');
        }
	}

    /**
     * @param $events
     *
     * 为订阅者注册监听器
     */
    public function subscribe($events) {

        $events->listen(
            'App\Events\User\RegisterEvent',
            'App\Listeners\user\UserListener@onRegister'
        );

		$events->listen(
            'App\Events\User\LoginEvent',
            'App\Listeners\user\UserListener@onLogin'
        );

		$events->listen(
            'App\Events\User\LogoutEvent',
            'App\Listeners\user\UserListener@onLogout'
        );

		$events->listen(
            'App\Events\User\UploadAvatarEvent',
            'App\Listeners\user\UserListener@onUploadAvatar'
        );
		
		$events->listen(
            'App\Events\User\TakeScoreEvent',
            'App\Listeners\user\UserListener@onTakeScore'
        );

    }

}
