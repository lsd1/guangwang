var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var index = (function (_super) {
    __extends(index, _super);
    function index() {
        var _this = _super.call(this) || this;
        _this.common = Common.Shared();
        _this.skinName = "resource/garden_skins/Index.exml";
        _this.left = 0;
        _this.right = 0;
        _this.top = 0;
        _this.bottom = 0;
        return _this;
        // //打开登录、注册弹框
        // this.btn_log.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnLogClick, this);
        // this.btn_reg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRegClick, this);
        // //关闭登录、注册弹框
        // this.log_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLogCloseClick, this);
        // this.reg_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRegCloseClick, this);
        // //登录帐号、密码
        // this.log_user_name.addEventListener(egret.FocusEvent.FOCUS_IN, this.onInputFocusIn, this);
        // this.log_pass_word.addEventListener(egret.FocusEvent.FOCUS_IN, this.onInputFocusIn, this);
        // //注册帐号、密码、确认密码
        // this.reg_user_name.addEventListener(egret.FocusEvent.FOCUS_IN, this.onInputFocusIn, this);
        // this.reg_pass_word.addEventListener(egret.FocusEvent.FOCUS_IN, this.onInputFocusIn, this);
        // this.reg_rep_pass_word.addEventListener(egret.FocusEvent.FOCUS_IN, this.onInputFocusIn, this);
        // //登录帐号、密码
        // this.log_user_name.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onInputFocusOut, this);
        // this.log_pass_word.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onInputFocusOut, this);
        // //注册帐号、密码、确认密码
        // this.reg_user_name.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onInputFocusOut, this);
        // this.reg_pass_word.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onInputFocusOut, this);
        // //提交登录、注册
        // this.commit_log.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCommitLogClick, this);
        // this.commit_reg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCommitRegClick, this);
        // //关闭提示弹框
        // this.tips_close.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{this.group_tips.visible = false;}, this);
    }
    index.Shared = function () {
        if (this.shared == null) {
            this.shared = new index();
        }
        return this.shared;
    };
    //弹出登录框 
    index.prototype.onBtnLogClick = function () {
        this.group_log_reg.visible = true;
        this.panel_log.visible = true;
        console.log('open log');
    };
    //弹出注册框 
    index.prototype.onBtnRegClick = function () {
        this.group_log_reg.visible = true;
        this.panel_reg.visible = true;
        console.log('open reg');
    };
    //关闭登录框 
    index.prototype.onLogCloseClick = function () {
        this.group_log_reg.visible = false;
        this.panel_log.visible = false;
        console.log('close log');
    };
    //关闭注册框 
    index.prototype.onRegCloseClick = function () {
        this.group_log_reg.visible = false;
        this.panel_reg.visible = false;
        console.log('close reg');
    };
    //登录
    index.prototype.onCommitLogClick = function () {
        var _this = this;
        var httpReq = new HttpReq();
        var url = 'v1.0/login';
        var username = this.log_user_name.text;
        var password = hex_md5(this.log_pass_word.text);
        httpReq.POST({
            url: url,
            data: { username: username, password: password },
            success: function (res) {
                var res = JSON.parse(res);
                if (res.code == 0) {
                    _this.common.setCookie('username', res.data.userInfo.username, 30);
                    _this.common.setCookie('uid', res.data.userInfo.id, 30);
                    //this.common.setCookie('avatar', res.data.userInfo.avatar, 30);
                    _this.common.setCookie('avatar', 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1373411777,3992091759&fm=27&gp=0.jpg', 30);
                    _this.common.setCookie('token', res.token, 30);
                    _this.parent.addChild(MyGarden.Shared());
                    _this.parent.removeChild(_this);
                }
                else {
                    _this.tips_text.text = res.msg;
                    _this.group_tips.visible = true;
                }
            },
            error: function (error) {
                console.log(error);
            },
            progress: function () {
                console.log('等待！');
            }
        });
        // httpReq.POST({
        // 	url:url,
        // 	data:{username:this.log_user_name.text,password:this.log_pass_word.text},
        // 	success:(res:any)=>{
        // 		alert(res.url)
        //		this.parent.addChild(garden.Shared())
        //		this.parent.removeChild(this);
        // 	},
        // 	error:()=>{
        // 		console.log('error');
        // 	},
        // 	progress:()=>{
        // 		console.log('waiting......');
        // 	}
        // });
    };
    //注册
    index.prototype.onCommitRegClick = function (e) {
        var _this = this;
        console.log(this.reg_user_name.text);
        console.log(this.reg_pass_word.text);
        console.log(this.reg_rep_pass_word.text);
        if (this.reg_pass_word.text != this.reg_rep_pass_word.text) {
            this.tips_text.text = '两次输入密码不一致';
            this.group_tips.visible = true;
            return false;
        }
        var httpReq = new HttpReq();
        var url = 'v1.0/register';
        var username = this.reg_user_name.text;
        var password = hex_md5(this.reg_pass_word.text);
        httpReq.POST({
            url: url,
            data: { username: username, password: password },
            success: function (res) {
                var res = JSON.parse(res);
                if (res.code == 0) {
                    _this.tips_text.text = '恭喜你注册成功！';
                    _this.group_tips.visible = true;
                    setTimeout(function () {
                        _this.group_tips.visible = false;
                        _this.panel_reg.visible = false;
                        _this.panel_log.visible = true;
                    }, 2000);
                }
                else {
                    _this.tips_text.text = res.msg;
                    _this.group_tips.visible = true;
                    setTimeout(function () {
                        _this.group_tips.visible = false;
                    }, 2000);
                }
                console.log(res);
            },
            error: function (error) {
                console.log(error);
            },
            progress: function () {
                console.log('等待！');
            }
        });
    };
    index.prototype.onInputFocusOut = function (e) {
        e.currentTarget.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.onInputFocusOut, this);
        if (e.currentTarget.text == '') {
            e.currentTarget.text = this.placeHolder;
        }
    };
    index.prototype.onInputFocusIn = function (e) {
        var patt = new RegExp('(请输入|请设置|请充值|请确认)');
        if (patt.test(e.currentTarget.text)) {
            this.placeHolder = e.currentTarget.text;
            e.currentTarget.text = '';
        }
        e.currentTarget.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onInputFocusOut, this);
    };
    return index;
}(eui.Component));
__reflect(index.prototype, "index");
