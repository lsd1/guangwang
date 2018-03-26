class MyGarden extends eui.Component{
	private static shared:MyGarden;
	private common:Common = Common.Shared();
	public static Shared(){
		if(this.shared == null){
			this.shared = new MyGarden();
		}
		return this.shared;
	}

	//肥料数量
	private muck_num:eui.Label;

	//驱虫剂数量
	private insecticide_num:eui.Label;

	//药剂数量
	private medicine_num:eui.Label;

	//催熟剂数量
	private ripening_num:eui.Label;

	//防偷数量
	private protextion_num:eui.Label;

	//尾部互动信息列表
	private group_avatar:eui.Group;
	
	//道具图标
	private props:eui.Image;
	//互动图标
	private interaction:eui.Image;
	//管理图标
	private manage:eui.Image;

	//道具列表弹框
	private panel_props:eui.Group;
	//关闭道具弹框按钮
	private props_close:eui.Button;
	
	//肥料图标
	private group_muck:eui.Group;
	//驱虫图标
	private group_insecticide:eui.Group;
	//药剂图标
	private group_medicine:eui.Group;
	//催熟图标
	private group_ripening:eui.Group;
	//防偷图标
	private group_protection:eui.Group;

	//确认使用肥料按钮
	private commit_use_musk:eui.Rect;
	//施用肥料弹框按钮
	private panel_use_musk:eui.Button;
	//关闭施用肥料按钮
	private use_musk_close:eui.Button;

	//激活肥料弹框
	private panel_active_musk:eui.Group;
	//确认激活肥料按钮
	private commit_active_musk:eui.Rect;
	//关闭激活肥料按钮
	private active_musk_close:eui.Button;

	//果园互动弹框
	private panel_garden_interactive:eui.Group;
	//果园互动列表
	private group_interactive_list:eui.Group;
	//关闭果园互动按钮
	private garden_interactive_close:eui.Button;

	//果园动态弹出框
	private panel_garden_news:eui.Group;
	//果园动态关闭按钮
	private garden_news_close:eui.Button;
	//果园动态列表
	private group_news_list:eui.Group;
	//更多动态按钮
	private garden_more_news:any;

	//我的果园弹框
	private panel_garden_manger:eui.Group;
	//关闭我的果园按钮
	private garden_manger_close:eui.Button;
	//激活时间
	private active_date:eui.Label;
	//用户帐号
	private user_name:eui.Label;
	//用户积分
	private user_point:eui.Label;
	//积分纪录列表
	private group_point_list:eui.Group;
	//提取积分按钮
	private extract_point:eui.Group;
	//修改密码按钮
	private change_password:eui.Group;
	//更多记录按钮
	private more_point_log:eui.Label;

	//修改密码弹框
	private panel_change_pass_word:eui.Group;
	//设置新密码弹框
	private panel_set_pass_word:eui.Group;
	//旧密码
	private old_pass_word:eui.Label;
	//下一步
	private next_step:eui.Group;
	//设置新密码
	private new_pass_word:eui.Label;
	//重复新密码
	private repeat_new_pass_word:eui.Label;
	//提交修改
	private commit_change:eui.Group;
	//关闭设置新密码按钮
	private set_pass_word_close:eui.Button;	
	//关闭验证旧密码按钮
	private change_pass_word_close:eui.Button;
	
	//提取积分弹框
	private panel_extract_point:eui.Group;
	//关闭提取积分按钮
	private extract_point_close:eui.Button;
	//钱包地址
	private wallet_address:eui.Label;
	//提取数额
	private point_number:eui.Label;
	//提交请求
	private commit_extract_point:eui.Group;	

	public constructor() {
		super();
		this.skinName = "resource/garden_skins/MyGarden.exml";
		
		//道具列表
		this.props.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPropsTap, this);
		this.props_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPropsCloseTap, this);
		
		this.interaction.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onInteractionTap, this);

		//施用肥料
		this.use_musk_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onUseMuskCloseTap, this);
		this.group_muck.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupMuckTap, this);
		this.commit_use_musk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCommitUseMuskTap, this);

		//道具使用
		this.group_insecticide.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupInsecticideTap, this);
		this.group_medicine.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupMedicineTap, this);
		this.group_ripening.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupRipeningTap, this);
		this.group_protection.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupProtectionTap, this);

		//我的果园
		this.manage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onManageTap, this);
		this.garden_interactive_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGardenInteractiveCloseTap, this);
		this.garden_news_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGardenNewsCloseTap, this);
		this.garden_manger_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGardenMangerCloseTap, this);

		//修改密码
		this.change_password.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangePasswordTap, this);
		this.next_step.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNextStepTap, this);
		this.set_pass_word_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSetPassWordCloseTap, this);
		this.change_pass_word_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangePassWordCloseTap, this);
		this.old_pass_word.addEventListener(egret.FocusEvent.FOCUS_IN,this.onInputFocus,this);

		//提取积分
		this.extract_point.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExtractPointTap, this);
		this.extract_point_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExtractPointCloseTap, this);
		this.commit_extract_point.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCommitExtractPointTap, this);

	

		//顶部果园用户头像、昵称信息
		var topGrop:eui.Group = new eui.Group();
		var topAvatar = this.common.createCircleMask(100, 100, "mygarden_png", 20, 20);
		var topAvatarBg = this.common.createImage(350, 140, "garden_data_bg_png", 0, 0);
		var label:eui.Label = new eui.Label();
		label.width = 380;
		label.height = 140;
		label.textAlign = "center";
		label.verticalAlign = "middle";
		label.size = 30;
		label.text = "Tammy";
		label.textColor = 0x000000;
		topGrop.x = 0;
		topGrop.y = 30;
		topGrop.addChild(topAvatarBg);		
		topGrop.addChild(topAvatar);
		topGrop.addChild(label);
		this.addChild(topGrop);

		//横线
        var line:egret.Shape = new egret.Shape();
		line.graphics.lineStyle(2, 0x000000, 0.1 );
		line.graphics.moveTo(750, -30);
		line.graphics.lineTo(0, -30);
        line.graphics.endFill();
		this.group_avatar.addChild(line);

		//尾部果园互动消息列表
		for(var i = 0; i < 6; i++){
			let avatar = new AvatarList();
			avatar.x = 25 + i * 120;
			if(i==5){
				this.garden_more_news = avatar.createAvatar(i + 1, "mygarden_png", "30");
				this.group_avatar.addChild(this.garden_more_news);
				
			}else{
				let avatar_cell = avatar.createAvatar(i + 1, "mygarden_png", "30");
				this.group_avatar.addChild(avatar_cell);
			}
		}

		this.garden_more_news.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGardenMoreNewsTap, this);
	}

	//点击道具
	private onPropsTap(e:egret.TouchEvent){
		this.panel_props.visible = true;
	}

	//点击互动
	private onInteractionTap(e:egret.TouchEvent){
		for(var i = 0; i < 17; i++){
			let interaction = new InteractionList(i);
			if(i == 0){
				var list = interaction.createList('mygarden_png', '曲终人散', [1,2], [], 0, i * 122);
			}else if(i < 2 && i > 0){
				var list = interaction.createList('mygarden_png', '曲终人散', [i], [], 0, i * 122);
			}else{
				var list = interaction.createList('mygarden_png', '曲终人散', [3], [i*120], 0, i * 122);
			}
			
			this.group_interactive_list.addChild(list);
		}
		this.panel_garden_interactive.visible = true;
	}

	//点击管理
	private onManageTap(e:egret.TouchEvent){

		for(let i = 0; i < 40; i++){
			let point_log:eui.Label = new eui.Label();
			point_log.text = '提取积分-800 2018-03-05 14:00';
			point_log.textColor = 0x673C13;
			point_log.size = 25;
			point_log.y = 40*i;
			point_log.x = 50;
			point_log.width = 650;
			point_log.height = 80;
			this.group_point_list.addChild(point_log);
		}

		this.panel_garden_manger.visible = true;
	}

	//关闭我的果园弹框
	private onGardenMangerCloseTap(e:egret.TouchEvent){
		this.panel_garden_manger.visible = false;
	}

	//关闭道具弹框
	private onPropsCloseTap(e:egret.TouchEvent){
		this.panel_props.visible = false;
	}

	//点击肥料图标
	private onGroupMuckTap(e:egret.TouchEvent){
		this.panel_use_musk.visible = true;
	}

	//关闭施用肥料弹框
	private onUseMuskCloseTap(e:egret.TouchEvent){
		this.panel_use_musk.visible = false;
	}

	//确认施用肥料
	private onCommitUseMuskTap(e:egret.TouchEvent){
		this.panel_use_musk.visible = false;
		this.muck_num.text = 'X887';
		console.log("施用肥料");
	}

	//点击驱虫图标
	private onGroupInsecticideTap(e:egret.TouchEvent){

	}

	//点击药剂图标
	private onGroupMedicineTap(e:egret.TouchEvent){

	}

	//点击催熟图标
	private onGroupRipeningTap(e:egret.TouchEvent){

	}

	//点击保护图标
	private onGroupProtectionTap(e:egret.TouchEvent){

	}

	//关闭果园互动
	private onGardenInteractiveCloseTap(e:egret.TouchEvent){
		this.panel_garden_interactive.visible = false;
	}

	//关闭果园动态
	private onGardenNewsCloseTap(e:egret.TouchEvent){
		this.panel_garden_news.visible = false;
	}

	//弹出果园动态框
	private onGardenMoreNewsTap(e:egret.TouchEvent){
		for(var i = 0; i < 17; i++){
			let news = new NewsList();
			if(i == 0){
				var list = news.createList('mygarden_png', '曲终人散', 3600, 0, i * 122);
			}else if(i < 2 && i > 0){
				var list = news.createList('mygarden_png', '曲终人散', 3500, 0, i * 122);
			}else{
				var list = news.createList('mygarden_png', '曲终人散', 3400, 0, i * 122);
			}
			this.group_news_list.addChild(list);
		}
		this.panel_garden_news.visible = true;		
	}


	private onChangePasswordTap(e:egret.TouchEvent){
		this.panel_change_pass_word.visible = true;
	}

	private onChangePassWordCloseTap(e:egret.TouchEvent){
		this.panel_change_pass_word.visible = false;

	}

	private onNextStepTap(e:egret.TouchEvent){
		this.panel_change_pass_word.visible = false;
		this.panel_set_pass_word.visible = true;

	}

	private onSetPassWordCloseTap(e:egret.TouchEvent){
		this.panel_set_pass_word.visible = false;
	}

	private onExtractPointTap(e:egret.TouchEvent){
		this.panel_extract_point.visible = true;
	}

	private onExtractPointCloseTap(e:egret.TouchEvent){
		this.panel_extract_point.visible = false;
	}

	private onCommitExtractPointTap(e:egret.TouchEvent){
		this.panel_extract_point.visible = false;
	}

	private onInputFocus(e:egret.FocusEvent){
		console.log(EventTarget);
		console.log(1);
	}



}