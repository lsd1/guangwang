<?php namespace App\Http\Controllers\V1\User;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

use App\Repositories\User\UserRepository as User;
use App\Repositories\User\UserCountRepository as UserCount;

class ActionController extends Controller
{
	
	private $request;

	private $user;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Request $request, User $user) {

		$this->request = $request;

		$this->user = $user;
        
    }
    
	public function uploadAvatar() {
		
		$token = $this->request->input('token', '');
		$lang = $this->request->input('lang', 0);
		$username = $this->request->input('username', '');
		$userId = $this->request->input('userId', 0);
		$avatar = $this->request->file('avatar');
	
		$validator = Validator::make(['avatar' => $avatar], ['avatar' => 'required|image']);
		if ($validator->fails()) 
		{
			return ['code' => 111, 'msg' => trans('user.user_avatar_must_picture'), 'lang' => $lang, 'token' => '', 'datetime' => date('Y-m-d H:i:s')];
		}

		try {
			$avatarPath = 'user/avatars/' . $userId . '.' . $avatar->getClientOriginalExtension();
			$this->request->merge(['avatarPath' => $avatarPath]);
			
			event(new \App\Events\User\UploadAvatarEvent());
		} catch (\Exception $e) {
			return ['code' => 111, 'msg' => trans('user.user_avatar_upload_faild'), 'lang' => $lang, 'token' => '', 'datetime' => date('Y-m-d H:i:s')];
		}

		return ['code' => 0, 'msg' => trans('user.user_avatar_upload_success'), 'data' => ['avatar' => get_file_address($avatarPath)], 'lang' => $lang, 'token' => $token, 'datetime' => date('Y-m-d H:i:s')];

	}

	public function drawScore(UserCount $userCount) {
		
		$token = $this->request->input('token', '');
		$lang = $this->request->input('lang', 0);
		$username = $this->request->input('username', '');
		$userId = $this->request->input('userId', 0);
		$score = $this->request->input('score', 0);
	
		$count = $userCount->getOneByUserId($userId);

		if ($count->score < $score)
		{
			return ['code' => 111, 'msg' => trans('user.user_score_not_enough'), 'lang' => $lang, 'token' => '', 'datetime' => date('Y-m-d H:i:s')];
		}

		try {
			event(new \App\Events\User\TakeScoreEvent());
		} catch (\Exception $e) {
			return ['code' => 111, 'msg' => trans('user.user_score_take_faild'), 'lang' => $lang, 'token' => '', 'datetime' => date('Y-m-d H:i:s')];
		}

		return ['code' => 0, 'msg' => trans('user.user_score_take_success'), 'data' => ['score' => intval($count->score - $score)], 'lang' => $lang, 'token' => $token, 'datetime' => date('Y-m-d H:i:s')];

	}

}
