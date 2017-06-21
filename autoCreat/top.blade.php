<div class="navbar navbar-fixed-top">
    <div class="navbar-inner">
        <div class="container-fluid">
            <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"> <span class="icon-bar"></span>
             <span class="icon-bar"></span>
             <span class="icon-bar"></span>
            </a>
            <a class="brand" href="/">脉果儿管理系统</a>
            <div class="nav-collapse collapse">
                <ul class="nav pull-right">
                    <li class="dropdown">
                        <a href="#" role="button" class="dropdown-toggle" data-toggle="dropdown"> <i class="icon-user"></i> {{ session('adminName') }}
                        </a>
                        <ul class="dropdown-menu">
                            <li class="divider"></li>
                            <li>
                                <a tabindex="-1" href="/logout.html">Logout</a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul class="nav" id="navId">
                    <li  id='{"0":"base/memberlist","1":"base/bankcard","2":"comm/resetmobile","3":"orchard/member"}'>
                        <a href="#menu1" role="button" data-toggle="tab">用户管理 </a>
                    </li>
                    <li  id='{"0":"comm/realnameauth","1":"business/auth"}'>
                        <a href="#menu2" role="button" data-toggle="tab">认证管理 </a>
                    </li>
                    <li  id='{"0":"take/trail","1":"uniontake/trail","2":"take/sharetrail","3":"take/merchant"}'>
                        <a href="#menu3" role="button" data-toggle="tab">提现管理 </a>
                    </li>
                    <li  id='{"0":"rebate/storelist", "1":"rebate/orderlist", "2":"rebate/paymelist"}'>
                        <a href="#menu4" role="button" data-toggle="tab">商铺管理 </a>
                    </li>
                    <li  id='{"0":"union/unreviewedlist", "1":"union/auditlog"}'>
                        <a href="#menu5" role="button" data-toggle="tab">消费联盟会员</a>
                    </li>
                    <li id='{"0":"mywallet/balance/tradelist", "1":"mywallet/balance/tradelog"}'>
                        <a href="#menu6" role="button" data-toggle="tab">我的钱包</a>
                    </li>
                    <li id='{"0":"payforme/list", "1":"payforme/log", "2":"payforme/audit"}'>
                        <a href="#menu7" role="button" data-toggle="tab">为我买单</a>
                    </li>
                    <input type="hidden">
                </ul>
            </div>
        </div>
    </div>
</div>