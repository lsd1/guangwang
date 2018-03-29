<?php namespace App\Http\Controllers\V1\User;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

use App\Repositories\User\UserRepository as User;
use App\Repositories\User\UserCountRepository as UserCount;
use App\Repositories\User\UserAttachRepository as UserAttach;
use App\Repositories\User\UserTreeRepository as UserTree;
use App\Repositories\User\UserScoreLogRepository as UserScoreLog;


class ShowController extends Controller
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

	public function tree() {
		
		$token = $this->request->input('token', '');
		$lang = $this->request->input('lang', 0);

	}

	public function socreLogs(UserScoreLog $userScoreLog) {

		$token = $this->request->input('token', '');
		$lang = $this->request->input('lang', 0);
		
		$list = [];
		$userScoreLog->pushCriteria(new \App\Repositories\Criteria\User\ScoreLogListCriteria($this->request));
		foreach ($userScoreLog->all() as $row)
		{
			$list[] = [
				'id' => $row->id,
				'changeScore' => ($row->changeType ? '+' : '-') . $row->changeScore,
				'content' => trans($row->content),
				'datetime' => $row->datetime
			];
		}

		return ['code' => 0, 'msg' => trans('user.request_success'), 'data' => ['scoreLogList' => $list], 'lang' => $lang, 'token' => $token, 'datetime' => date('Y-m-d H:i:s')];

	}

	public function pickList(UserTree $userTree, UserAttach $userAttach) {
		
		$token = $this->request->input('token', '');
		$lang = $this->request->input('lang', 0);
		$now = time();

		$list = [];
		$userTree->pushCriteria(new \App\Repositories\Criteria\User\PickListCriteria($this->request));
		foreach ($userTree->all() as $row)
		{
			$user = $this->user->getOneById($row->userId);
			$avatar = $userAttach->getAvatarByUserId($user->id);
			
			$mature = strtotime($row->matureTime);
			$isMature = $mature <= $now ? 1 : 0;
			$countdown = $isMature ? ($mature - $now) : 0;
			$isWater = 1;

			$list[] = [
				'id' => $row->id,
				'username' => $user->username,
				'avatar' => $avatar,
				'isMature' => $isMature,
				'countdown' => $countdown,
				'isWater' => $isWater,
				'datetime' => $row->matureTime
			];
		}

		return ['code' => 0, 'msg' => trans('user.request_success'), 'data' => ['pickList' => $list], 'lang' => $lang, 'token' => $token, 'datetime' => date('Y-m-d H:i:s')];

	}

}
