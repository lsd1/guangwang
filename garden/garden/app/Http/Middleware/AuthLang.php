<?php namespace App\Http\Middleware;

use Closure;

class AuthLang
{

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next) {
		
		$lang = $request->input('lang', 0);

		if ($lang == 0) 
		{
			app('translator')->setLocale('cn');
		} else if ($lang == 1) {
			app('translator')->setLocale('en');
		} else {
			app('translator')->setLocale('cn');
			return ['code' => 110, 'msg' => trans('user.lang_error'), 'lang' => $lang, 'token' => '', 'datetime' => date('Y-m-d H:i:s')];
		}

//        $request->header('Access-Control-Allow-Origin', '*');
//        $request->header('Access-Control-Allow-Headers', 'Origin, Content-Type, Cookie, X-CSRF-TOKEN, Accept, Authorization, X-XSRF-TOKEN');
//        $request->header('Access-Control-Expose-Headers', 'Authorization, authenticated');
//        $request->header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, OPTIONS');
//        $request->header('Access-Control-Allow-Credentials', 'true');

        return $next($request);

    }

}
