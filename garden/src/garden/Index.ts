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

	//登陆、注册框
	private panel_log:eui.Group;
	private panel_reg:eui.Group;

	//确认登陆、注册
	private commit_log:eui.Group;
	private commit_reg:eui.Group;

	//登陆、注册输入框
	private log_user_name:eui.EditableText;
	private log_pass_word:eui.EditableText;
	private reg_user_name:eui.EditableText;
	private reg_pass_word:eui.EditableText;
	private reg_rep_pass_word:eui.EditableText;
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

		//登录帐号、密码
		this.log_user_name.addEventListener(egret.FocusEvent.FOCUS_IN, this.onInputFocusIn, this);
		this.log_pass_word.addEventListener(egret.FocusEvent.FOCUS_IN, this.onInputFocusIn, this);

		//注册帐号、密码、确认密码
		this.reg_user_name.addEventListener(egret.FocusEvent.FOCUS_IN, this.onInputFocusIn, this);
		this.reg_pass_word.addEventListener(egret.FocusEvent.FOCUS_IN, this.onInputFocusIn, this);
		this.reg_rep_pass_word.addEventListener(egret.FocusEvent.FOCUS_IN, this.onInputFocusIn, this);

		//登录帐号、密码
		this.log_user_name.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onInputFocusOut, this);
		this.log_pass_word.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onInputFocusOut, this);

		//注册帐号、密码、确认密码
		this.reg_user_name.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onInputFocusOut, this);
		this.reg_pass_word.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onInputFocusOut, this);


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
		this.panel_reg.visible = true;
	}

	//关闭登录框 
	private onLogCloseClick(){
		this.full_mask.visible = false;		
		this.panel_log.visible = false;
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
					//this.common.setCookie('avatar', res.data.userInfo.avatar, 30);
					this.common.setCookie('avatar', 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1373411777,3992091759&fm=27&gp=0.jpg', 30);
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

	private onInputFocusOut(e:egret.FocusEvent){
		e.currentTarget.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.onInputFocusOut, this);
		if(e.currentTarget.text == ''){
			e.currentTarget.text = e.currentTarget.placeHolder;
		}
	}

	private onInputFocusIn(e:egret.FocusEvent){
		var patt = new RegExp('(请输入|请设置|请充值|请确认)');
		if(patt.test(e.currentTarget.text)){
			e.currentTarget.placeHolder =  e.currentTarget.text;	
			e.currentTarget.text = '';	
		}

		e.currentTarget.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onInputFocusOut, this);
	}
}