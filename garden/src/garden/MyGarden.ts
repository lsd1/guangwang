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
	
	public constructor() {
		super();
		this.skinName = "resource/garden_skins/myGarden.exml";
		this.props.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPropsTap, this);
		this.interaction.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onInteractionTap, this);
		this.manage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onManageTap, this);
		this.props_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPropsCloseTap, this);
		this.use_musk_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onUseMuskCloseTap, this);
		this.group_muck.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupMuckTap, this);
		this.group_insecticide.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupInsecticideTap, this);
		this.group_medicine.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupMedicineTap, this);
		this.group_ripening.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupRipeningTap, this);
		this.group_protection.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupProtectionTap, this);
		this.commit_use_musk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCommitUseMuskTap, this);
		this.garden_interactive_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGardenInteractiveCloseTap, this);
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
			let avatar_cell = avatar.createAvatar(i + 1, "mygarden_png", "30");
			this.group_avatar.addChild(avatar_cell);
		}
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

}