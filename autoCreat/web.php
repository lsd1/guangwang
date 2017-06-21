<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::group(['domain' => env('APP_URL', 'http://localhost'), 'middleware' => 'auth.login'], function () {

//主页
    Route::get('/', 'Index\IndexController@index');


//登陆
    Route::get('/login.html', 'Index\LoginController@getLogin');
    Route::post('/login.html', 'Index\LoginController@postLogin');

//退出
    Route::any('/logout.html', 'Index\LoginController@logout');


//数据库mge_base_member_take 余额提现管理 共享红利体现
    Route::group(['prefix' => 'take', 'namespace' => 'Base'], function () {
        //余额提现（初步审核）
        Route::get('trail.html', 'MemberTakeController@index');                     //余额审核列表
        Route::post('datatableAjax', 'MemberTakeController@datatableAjax');         //余额审核datatabel ajax获取数据
        Route::get('confirmAjax', 'MemberTakeController@confirmAjax');              //余额审核通过
        Route::get('takeRejectShow', 'MemberTakeController@takeRejectShow');        //余额调用驳回信息框
        Route::post('TakeRejectInsert', 'MemberTakeController@TakeRejectInsert');   //余额审核驳回内容写入数据库
        //余额提现（财务审核）
        Route::get('finance.html', 'MemberTakeController@financeindex');            //余额财务审核
        //余额提现（银行审核）
        Route::get('bank.html', 'MemberTakeController@bankindex');                  //余额银行审核

        //共享红利提现（初步审核）
        Route::get('sharetrail.html', 'MemberTakeController@shareindex');           //共享红利初步审核列表
        Route::get('sharefinance.html', 'MemberTakeController@sharefinance');       //共享红利财务审核列表
        Route::get('sharebank.html', 'MemberTakeController@sharebank');             //共享红利银行审核列表

        //商户提现
        Route::get('merchant.html', 'MemberTakeController@merchant');    //商户提现管理 初审
        Route::get('merfinance.html', 'MemberTakeController@merfinance');    //商户提现管理 财务
        Route::get('merbank.html', 'MemberTakeController@merbank');    //商户提现管理 银行

    });

//数据库mge_union_take 前置利润、保证金提现管理
    Route::group(['prefix' => 'uniontake', 'namespace' => 'Union'], function () {
        //余额提现（初步审核）
        Route::get('trail.html', 'TakeController@index');                       //保证金审核列表
        Route::post('datatableAjax', 'TakeController@datatableAjax');           //审核datatabel ajax获取数据
        Route::get('confirmAjax', 'TakeController@confirmAjax');                //审核通过
        Route::get('takeRejectShow', 'TakeController@takeRejectShow');          //调用驳回信息框
        Route::post('TakeRejectInsert', 'TakeController@TakeRejectInsert');     //审核驳回内容写入数据库
        //余额提现（财务审核）
        Route::get('finance.html', 'TakeController@financeindex');               //财务审核
        //余额提现（银行审核）
        Route::get('bank.html', 'TakeController@bankindex');                     //银行审核
    });

//数据库mge_comm_realname_auth 实名认证模块
    Route::group(['prefix' => 'comm', 'namespace' => 'Comm'], function () {
        Route::get('realnameauth.html', 'RealnameauthController@index');                //实名认证
        Route::post('realnameauthAjax', 'RealnameauthController@realnameauthAjax');     //实名认证ajax获取列表数据
        Route::get('confirmAjax', 'RealnameauthController@confirmAjax');                //认证审核通过
        Route::get('rejectShow', 'RealnameauthController@rejectShow');                  //认证驳回
        Route::post('RejectInsert', 'RealnameauthController@RejectInsert');             //提交驳回信息

        Route::get('resetmobile.html', 'ResetMobileController@resetmobile');//重置手机号码
        Route::post('resetMobileAjax', 'ResetMobileController@resetMobileAjax'); //重置手机号码ajax获取列表数据
        Route::get('confirmResetMobileAjax', 'ResetMobileController@confirmResetMobileAjax');//重置手机号码审核通过
        Route::get('rejectResetMobileShow', 'ResetMobileController@rejectResetMobileShow');//重置手机号码审核驳回
        Route::post('RejectResetMobileInsert', 'ResetMobileController@RejectResetMobileInsert');//重置手机号码审核驳回信息写入数据库


    });

//数据库mge_business_auth 企业认证模块
    Route::group(['prefix' => 'business', 'namespace' => 'Business'], function () {
        Route::get('auth.html', 'AuthController@index');                    //显示用户列表页面
        Route::post('authAjax', 'AuthController@authAjax');                 //显示用户列表页面
        Route::get('confirmAjax', 'AuthController@confirmAjax');            //审核通过
        Route::get('rejectShow', 'AuthController@rejectShow');              //驳回
        Route::post('RejectInsert', 'AuthController@RejectInsert');         //提交驳回
    });

//新闻模块
    Route::group(['prefix' => 'news', 'namespace' => 'News'], function () {
        Route::get('index.html', 'IndexController@index');      //显示新闻列表页面
        Route::post('newsAjax', 'IndexController@newsAjax');    //ajax获取新闻列表内容
        Route::any('addNews', 'IndexController@addNews');       //调用添加新闻的表单
        Route::any('addEditNews', 'IndexController@addEditNews'); //调用写入或者修改新闻内容
        Route::any('editNews', 'IndexController@editNews');     //获取单条新闻内容
        Route::any('delNews', 'IndexController@delNews');       //调用删除新闻内容
    });

//数据库mge_base_member_bank_card 模块 用户列表 用户银行卡管理
    Route::group(['prefix' => 'base', 'namespace' => 'Base'], function () {
        //用户列表
        Route::get('memberlist.html', 'MemberController@index');//显示用户列表页面
        Route::post('memberListAjax', 'MemberController@memberListAjax');//ajax获取用户列表内容
        Route::get('getUserInfo', 'MemberController@getUserInfo');//ajax获取用户详细信息
        Route::get('call', 'MemberController@call');//联系他(她)

        //用户银行卡管理
        Route::get('bankcard.html', 'MemberBankCardController@index');          //银行卡管理
        Route::post('bankCardAjax', 'MemberBankCardController@bankCardAjax');   //ajax获取银行卡列表内容
        Route::get('getBankInfo', 'MemberBankCardController@getBankInfo');      //获取银行信息
        Route::post('editBankInfo', 'MemberBankCardController@editBankInfo');   //获取银行信息

        //用户脉果儿详情日志
        Route::post('memberCreditLogAjax', 'MemberCreditLogController@memberCreditLogAjax');//获取用户脉果儿日志详情
        //用户共享红利详情日志
        Route::post('memberBackLogAjax', 'MemberBackLogController@memberBackLogAjax');//获取用户脉果儿日志详情
        //用户商户钱包详情日志
        Route::post('memberMerchantLogAjax', 'MemberMerchantLogController@memberMerchantLogAjax');//获取用户脉果儿日志详情

        //用户圣水瓶详情日志
        Route::post('memberTooleLogAjax', 'MemberTooleLogController@memberTooleLogAjax');//用户圣水瓶详情

        //用户余额详情日志
        Route::post('memberBalanceLogAjax', 'MemberBalanceLogController@memberBalanceLogAjax');//用户余额详情

        //用户果币详情日志
        Route::post('memberMgcoinLogAjax', 'MemberMgcoinLogController@memberMgcoinLogAjax');//用户余额详情
    });

//数据库 mge_mine_coin_log 矿券日志详情
    Route::group(['prefix' => 'mine', 'namespace' => 'Mine'], function () {
        //用户矿券详情
        Route::post('mineCoinLogAjax', 'CoinLogController@mineCoinLogAjax');//用户矿券详情日志
        //用户矿工详情
        Route::post('memberMinerLogAjax', 'MemberMinerLogController@mineCoinLogAjax');//用户矿券详情日志
    });

//数据库 mge_union_member_profit_log 前置利润 保证金 日志详情
    Route::group(['prefix' => 'union', 'namespace' => 'Union'], function () {
        Route::post('memberProfitLogAjax', 'MemberProfitLogController@memberProfitLogAjax');//用户前置利润日志
        Route::post('memberProfitLogpitalAjax', 'MemberProfitLogController@memberProfitLogAjax');//用户保证金情日志
        //消费联盟会员管理
        //待财务审核
        Route::get('unreviewedlist.html', 'OrderController@getUnreviewedList');
        Route::post('unreviewedAjax', 'OrderController@getUnreviewedAjax');
        //财务审核通过
        Route::get('pass', 'OrderController@pass');
        //财务审核驳回
        Route::any('rejection', 'OrderController@rejection');
        //增加备注(财务审核)
        Route::any('addcomment', 'OrderController@addComment');
        //导出财务审核表格
        Route::any('exportFinanceExcel', 'OrderController@exportFinanceExcel');
        //冷静期
        Route::get('coolinglist.html', 'OrderController@getCoolingList');
        Route::post('coolingAjax', 'OrderController@getCoolingAjax');
        //冷静期审核通过
        Route::get('passcooling', 'OrderController@passCooling');
        //冷静期审核取消
        Route::any('cancelcooling', 'OrderController@cancelCooling');
        //添加备注(冷静期)
        Route::any('addcoolingcomment', 'OrderController@addCoolingComment');
        //导出冷静期表格
        Route::any('exportCoolingExcel', 'OrderController@exportCoolingExcel');
        //审核日志列表
        Route::get('auditlog.html', 'OrderController@auditLog');
        Route::post('auditLogAjax', 'OrderController@auditLogAjax');
        //导出审核日志列表Excel
        Route::get('exportAuditLogExcel', 'OrderController@exportAuditLogExcel');
    });

//商铺管理 mge_rebate_store商户列表  mge_rebate_order 商户交易日志管理
    Route::group(['prefix' => 'rebate', 'namespace' => 'Rebate'], function () {
        Route::get('storelist.html', 'StoreController@index');//商户列表
        Route::post('storeListAjax', 'StoreController@storeListAjax');//商户列表

        Route::get('orderlist.html', 'OrderController@index');//商户列表
        Route::post('orderListAjax', 'OrderController@orderListAjax');//商户列表
    });

//黑名单管理 mge_orchard_memebr
    Route::group(['prefix' => 'orchard', 'namespace' => 'Orchard'], function () {
        Route::get('member.html', 'MemberController@member');//黑名单管理页面
        Route::post('memberAjax', 'MemberController@memberAjax');//ajax获取黑名单信息
        Route::get('adopt', 'MemberController@adopt');//ajax开启用户
    });

//我的钱包
    Route::group(['prefix' => 'mywallet', 'namespace' => 'MyWallet'], function () {
        //余额管理
        Route::get('balance/tradelist.html', 'BalanceController@tradeList');
        Route::post('balance/tradeListAjax', 'BalanceController@tradeListAjax');
        Route::any('balance/exportTradeListExcel', 'BalanceController@exportTradeListExcel');
        //余额日志管理
        Route::get('balance/tradelog.html', 'BalanceController@tradeLog');
        Route::post('balance/tradeLogAjax', 'BalanceController@tradeLogAjax');
        Route::any('balance/addTradeLogComment', 'BalanceController@addTradeLogComment');
        Route::any('balance/exportTradeLogExcel', 'BalanceController@exportTradeLogExcel');
    });

//为我买单
    Route::group(['prefix' => 'payforme', 'namespace' => 'PayForMe'], function () {
        //为我买单列表
        Route::get('list.html', 'PayForMeController@showList');
        Route::post('listajax', 'PayForMeController@showListAjax');
        //为我买单日志列表
        Route::get('log.html', 'PayForMeController@showLog');
        Route::post('logajax', 'PayForMeController@showLogAjax');
        //为我买单审核列表
        Route::get('audit.html', 'PayForMeAuditController@auditList');
        Route::post('auditlistajax', 'PayForMeAuditController@auditListAjax');
        //线下审核通过
        Route::any('passoffline', 'PayForMeAuditController@passOffline');
        //再审通过
        Route::any('pass', 'PayForMeAuditController@pass');
        //审核驳回
        Route::any('rejection', 'PayForMeAuditController@rejection');
        //添加备注
        Route::any('addcomment', 'PayForMeAuditController@addComment');
        //导出Excel
        Route::any('exportexcel', 'PayForMeAuditController@exportExcel');
    });
});
