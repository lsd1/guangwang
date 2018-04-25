class Index extends eui.Component {

	//单例模式
	private static shared:Index;
	public static Shared(){
		if(this.shared == null){
			this.shared = new Index();
		}
		return this.shared;
	}
	private common:Common = Common.Shared();
	public wait:Wait = Wait.Shared();

	//登录、注册按钮
	private btn_log:eui.Button;
	private btn_reg:eui.Button;

	//关闭登陆、注册按钮
	private log_close:eui.Button;
	private reg_close:eui.Button;
	private reg_invite_close:eui.Button;

	//登陆、注册框
	private panel_log:eui.Group;
	private panel_reg:eui.Group;
	private panel_reg_invite:eui.Group;

	//确认登陆、注册、下一步、返回、获取验证码按钮
	private commit_log:eui.Group;
	private commit_reg:eui.Group;
	private reg_invite_next:eui.Group;
	private reg_back:eui.Button;
	private invite_get_code:eui.Group;
	private get_code_text:eui.Label;

	//登陆、注册、邀请输入框
	private log_user_name:eui.EditableText;
	private log_pass_word:eui.EditableText;
	private reg_user_name:eui.EditableText;
	private reg_pass_word:eui.EditableText;
	private reg_rep_pass_word:eui.EditableText;

	private reg_invite_mobile:eui.EditableText;
	private reg_invite_code:eui.EditableText;
	private reg_invite_number:eui.EditableText;
	//提示弹框
	private tips:any;
	//全屏遮罩
	private full_mask:eui.Rect;

	public constructor() {
		super();
		this.skinName = "resource/garden_skins/Index.exml";
		this.right = 0;
		this.left = 0;
		this.top = 0;
		this.bottom = 0;

		this.tips = Tips.Shared();
		this.addChildAt(this.tips, -1);
		this.addChildAt(this.wait, -2);

		//打开登录、注册弹框
		this.btn_log.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnLogClick, this);
		this.btn_reg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRegClick, this);

		//关闭登录、注册弹框
		this.log_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLogCloseClick, this);
		this.reg_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRegCloseClick, this);
		this.reg_invite_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRegInviteCloseClick, this);
		

		//获取验证码
		this.invite_get_code.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onInviteGetCodeTap, this);
		//注册下一步
		this.reg_invite_next.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRegInviteNextTap, this);
		//返回上一部
		this.reg_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRegBackTap, this);

		//提交登录、注册
		this.commit_log.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCommitLogClick, this);
		this.commit_reg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCommitRegClick, this);
	}

	//弹出登录框 
	private onBtnLogClick(){
		this.full_mask.visible = true;
		this.panel_log.visible = true;
	}
	//弹出注册框 
	private onBtnRegClick(){
		this.full_mask.visible = true;		
		this.panel_reg_invite.visible = true;
	}

	//关闭登录框 
	private onLogCloseClick(){
		this.full_mask.visible = false;		
		this.panel_log.visible = false;
	}

	//关闭注册_邀请框 
	private onRegInviteCloseClick(){
		this.full_mask.visible = false;		
		this.panel_reg_invite.visible = false;
	}

	//关闭注册框 
	private onRegCloseClick(){
		this.full_mask.visible = false;		
		this.panel_reg.visible = false;
	}

	//登录
	private onCommitLogClick(e:egret.TouchEvent){
		this.wait.show();
		var httpReq = new HttpReq();
		var url:string = 'v1.0/login';
		var username = this.log_user_name.text;
		var password = hex_md5(this.log_pass_word.text);
		httpReq.POST({
			url:url,
			data:{username:username,password:password},
			success:(res)=>{
				var res = JSON.parse(res);
				if(res.code == 0){
					this.common.setCookie('username', res.data.userInfo.username, 30);
					this.common.setCookie('uid', res.data.userInfo.id, 30);
					this.common.setCookie('avatar', res.data.userInfo.avatar, 30);
					//this.common.setCookie('avatar', 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1373411777,3992091759&fm=27&gp=0.jpg', 30);
					this.common.setCookie('token', res.token, 30);
					this.common.setCookie('isActivate', res.data.userInfo.isActivate, 30);
					this.parent.addChild(MyGarden.Shared())
					this.parent.removeChild(this);
				}else{
					this.tips.showTips(res.msg);
				}
				this.wait.hide();
			},
			error:(error)=>{
				this.wait.hide();
				this.tips.showTips('网络错误！请重新尝试！');				
				console.log(error);
			}
		}, e.currentTarget);
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
	}

	//注册
	private onCommitRegClick(e:egret.TouchEvent){
		if(this.reg_pass_word.text != this.reg_rep_pass_word.text){
			this.tips.showTips('两次输入密码不一致');
			return false;
		}
		this.wait.show();
		var httpReq = new HttpReq();
		var url:string = 'v1.0/register';

		var username = this.reg_user_name.text;
		var password = hex_md5(this.reg_pass_word.text);

		httpReq.POST({
			url:url,
			data:{username:username,password:password},
			success:(res)=>{
				var res = JSON.parse(res);
				if(res.code == 0){
					this.tips.showTips('恭喜你注册成功！');
					setTimeout(()=>{
						this.tips.closeTips();
						this.panel_reg.visible = false;
						this.panel_log.visible = true;				
					} ,2000)
				} else {
					this.tips.showTips(res.msg);
				}
				this.wait.hide();
			},
			error:(error)=>{
				this.wait.hide();
				this.tips.showTips('网络错误！请重新尝试！');				
				console.log(error);
			}
		}, e.currentTarget);



	}

	//获取验证码
	private onInviteGetCodeTap(e:egret.TouchEvent){
		var patt = /\d{3}-\d{8}|\d{4}-\{7,8}/;
		var mobile = this.reg_invite_mobile;
		var is_mobile = patt.test(mobile.text);
		if(is_mobile){
			this.tips.showTips('请输入正确的手机号码');
			return false;
		}

		var httpReq = new HttpReq();
		var url:string = 'v1.0/get_code';

		httpReq.POST({
			url:url,
			data:{},
			success:(res)=>{
				var res = JSON.parse(res);
				if(res.code == 0){
					var time = 60;
					var t = setInterval(()=>{
						if(time > 0){
							this.get_code_text.text = time + '';
							time--;
						}else{
							this.get_code_text.text = '获取验证码';
							clearInterval(t);
						}
					},999);
				} else {
					this.tips.showTips(res.msg);
				}
			},
			error:(error)=>{
				this.tips.showTips('网络错误！请重新尝试！');				
				console.log(error);
			}
		}, e.currentTarget);
	}

	//下一步
	private onRegInviteNextTap(e:egret.TouchEvent){
		var mobile = this.reg_invite_mobile.text;
		var invite_code = this.reg_invite_code.text;
		var invite_number = this.reg_invite_number.text;

		if(mobile == ''){
			this.tips.showTips('手机号码不能为空！');
			return false;
		}

		if(invite_code == ''){
			this.tips.showTips('验证码不能为空！');
			return false;
		}

		if(invite_number == ''){
			this.tips.showTips('邀请人号码不能为空！');
			return false;
		}

		this.panel_reg_invite.visible = false;
		this.panel_reg.visible = true;

	}

	//上一步
	private onRegBackTap(e:egret.TouchEvent){
		this.panel_reg_invite.visible = true;
		this.panel_reg.visible = false;
	}

}