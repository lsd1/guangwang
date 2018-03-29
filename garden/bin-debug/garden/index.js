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
        _this.skinName = "resource/garden_skins/Index.exml";
        //打开登录、注册弹框
        _this.btn_log.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnLogClick, _this);
        _this.btn_reg.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnRegClick, _this);
        //关闭登录、注册弹框
        _this.log_close.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onLogCloseClick, _this);
        _this.reg_close.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onRegCloseClick, _this);
        //登录帐号、密码
        _this.log_user_name.addEventListener(egret.FocusEvent.FOCUS_IN, _this.onInputFocusIn, _this);
        _this.log_pass_word.addEventListener(egret.FocusEvent.FOCUS_IN, _this.onInputFocusIn, _this);
        //注册帐号、密码、确认密码
        _this.reg_user_name.addEventListener(egret.FocusEvent.FOCUS_IN, _this.onInputFocusIn, _this);
        _this.reg_pass_word.addEventListener(egret.FocusEvent.FOCUS_IN, _this.onInputFocusIn, _this);
        _this.reg_rep_pass_word.addEventListener(egret.FocusEvent.FOCUS_IN, _this.onInputFocusIn, _this);
        //登录帐号、密码
        _this.log_user_name.addEventListener(egret.FocusEvent.FOCUS_OUT, _this.onInputFocusOut, _this);
        _this.log_pass_word.addEventListener(egret.FocusEvent.FOCUS_OUT, _this.onInputFocusOut, _this);
        //注册帐号、密码、确认密码
        _this.reg_user_name.addEventListener(egret.FocusEvent.FOCUS_OUT, _this.onInputFocusOut, _this);
        _this.reg_pass_word.addEventListener(egret.FocusEvent.FOCUS_OUT, _this.onInputFocusOut, _this);
        //提交登录、注册
        _this.commit_log.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onCommitLogClick, _this);
        _this.commit_reg.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onCommitRegClick, _this);
        return _this;
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
        //this.parent.addChild(MyGarden.Shared())
        //this.parent.removeChild(this);
        var httpReq = new HttpReq();
        var url = 'v1.0/register';
        var username = this.log_user_name.text;
        var password = Md5(this.log_pass_word.text);
        httpReq.GET({
            url: url,
            data: { username: username, password: password },
            success: function (res) {
                console.log(res);
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
    index.prototype.onCommitRegClick = function () {
        console.log(this.reg_user_name.text);
        console.log(this.reg_pass_word.text);
        console.log(this.reg_rep_pass_word.text);
    };
    index.prototype.onInputFocusOut = function (e) {
        e.currentTarget.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.onInputFocusOut, this);
        if (e.currentTarget.text == '') {
            e.currentTarget.text = this.placeHolder;
        }
    };
    index.prototype.onInputFocusIn = function (e) {
        var patt = new RegExp('请输入');
        if (patt.test(e.currentTarget.text)) {
            this.placeHolder = e.currentTarget.text;
        }
        e.currentTarget.text = '';
        e.currentTarget.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onInputFocusOut, this);
    };
    return index;
}(eui.Component));
__reflect(index.prototype, "index");
//# sourceMappingURL=Index.js.map