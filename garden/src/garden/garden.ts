class garden extends eui.Component{
	private static shared:garden;
	public static Shared(){
		if(this.shared == null){
			this.shared = new garden();
		}
		return this.shared;
	}

	
	//道具图标
	private props:eui.Image;
	//互动图标
	private interaction:eui.Image;
	//管理图标
	private manage:eui.Image;
	//尾部互动信息列表
	private group_avatar:eui.Group;
	//道具列表弹框
	private panel_props:eui.Group;
	//关闭道具弹框按钮
	private props_close:eui.Button;
	//关闭施用肥料弹框按钮
	private panel_use_musk:eui.Button;
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
	
	public constructor() {
		super();
		this.skinName = "resource/garden_skins/myGarden.exml";

		this.props.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPropsTap, this);
		this.interaction.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onInteractionTap, this);
		this.manage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onManageTap, this);
		this.props_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPropsCloseTap, this);
		this.panel_use_musk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onUseMuskCloseTap, this);
		this.group_muck.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupMuckTap, this);
		this.group_insecticide.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupInsecticideTap, this);
		this.group_medicine.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupMedicineTap, this);
		this.group_ripening.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupRipeningTap, this);
		this.group_protection.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupProtectionTap, this);
		this.commit_use_musk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCommitUseMuskTap, this);

		//顶部果园用户头像、昵称信息
		var topGrop:eui.Group = new eui.Group();
		var topAvatar = this.createCircleMask(100, 100, "mygarden_png", 20, 20);
		var topAvatarBg = this.createImage(350, 140, "garden_data_bg_png", 0, 0);
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
		line.graphics.moveTo(750, 1170);
		line.graphics.lineTo(0, 1170);
        line.graphics.endFill();
		this.addChild(line);

		//尾部果园互动消息列表
		for(var i = 0; i < 6; i++){
			let avatar = new AvatarList();
			avatar.x = 25 + i * 120;
			let avatar_cell = avatar.createAvatar(i + 1, "mygarden_png", "30");
			this.group_avatar.addChild(avatar_cell);
		}
	}

	//创建圆形遮罩图片
	public createCircleMask(width:number, height:number, source:string, x?:number, y?:number){
		var group:eui.Group = new eui.Group();
		x =  x > 0 ? x : 0;
		y =  y > 0 ? y : 0;
		var image = this.createImage(width, height, source, x, y);
		var circle:egret.Shape = new egret.Shape();
		circle.graphics.beginFill(0x000000, 1);		
		circle.graphics.drawCircle(width/2+x, width/2+y, width/2);
		image.mask = circle;
		group.addChild(circle);
		group.addChild(image);
		return group;
	}

	//创建一张图片
	public createImage(width:number, height:number, source:string, x?:number, y?:number){
		var image:eui.Image = new eui.Image();
		image.width = width;
		image.height = height;
		image.x = x > 0 ? x : 0;
		image.y = y > 0 ? y : 0;
		image.source = source;
		return image;
	}

	//点击道具
	private onPropsTap(e:egret.TouchEvent){
		this.panel_props.visible = true;
	}

	//点击互动
	private onInteractionTap(e:egret.TouchEvent){
		
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

}