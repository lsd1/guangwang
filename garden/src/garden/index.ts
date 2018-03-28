class index extends eui.Component {

	//单例模式
	private static shared:index;
	public static Shared(){
		if(this.shared == null){
			this.shared = new index();
		}
		return this.shared;
	}

	private btn_log:eui.Button;
	private btn_reg:eui.Button;
	private log_close:eui.Button;
	private reg_close:eui.Button;
	private group_log_reg:eui.Group;
	private panel_log:eui.Group;
	private panel_reg:eui.Group;
	private commit_log:eui.Group;
	private commit_reg:eui.Group;
	private log_user_name:eui.EditableText;
	private log_pass_word:eui.EditableText;
	private reg_user_name:eui.EditableText;
	private reg_pass_word:eui.EditableText;
	private reg_rep_pass_word:eui.EditableText;
	public constructor() {
		super();
		this.skinName = "resource/garden_skins/Index.exml";

		//打开登录、注册弹框
		this.btn_log.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnLogClick, this);
		this.btn_reg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRegClick, this);

		//关闭登录、注册弹框
		this.log_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLogCloseClick, this);
		this.reg_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRegCloseClick, this);

		//登录帐号、密码
		// this.log_user_name.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCommitLogClick, this);
		// this.log_pass_word.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCommitRegClick, this);

		//注册帐号、密码、确认密码
		// this.reg_user_name.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCommitRegClick, this);
		// this.reg_pass_word.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCommitRegClick, this);
		// this.reg_rep_pass_word.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCommitRegClick, this);

		//提交登录、注册
		this.commit_log.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCommitLogClick, this);
		this.commit_reg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCommitRegClick, this);
	}

	//弹出登录框 
	private onBtnLogClick(){
		this.group_log_reg.visible = true;
		this.panel_log.visible = true;
		console.log('open log');
	}
	//弹出注册框 
	private onBtnRegClick(){
		this.group_log_reg.visible = true;		
		this.panel_reg.visible = true;
		console.log('open reg');
	}

	//关闭登录框 
	private onLogCloseClick(){
		this.group_log_reg.visible = false;		
		this.panel_log.visible = false;
		console.log('close log');
		
	}

	//关闭注册框 
	private onRegCloseClick(){
		this.group_log_reg.visible = false;		
		this.panel_reg.visible = false;
		console.log('close reg');
	}

	//登录
	private onCommitLogClick(){
		this.parent.addChild(MyGarden.Shared())
		this.parent.removeChild(this);
		//var httpReq = new HttpReq();
		//var url:string = 'http://httpbin.org/post';
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
	private onCommitRegClick(){
		console.log(this.reg_user_name.text);
		console.log(this.reg_pass_word.text);
		console.log(this.reg_rep_pass_word.text);
	}
}