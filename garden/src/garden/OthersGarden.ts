class OthersGarden extends eui.Component {
	private static shared:OthersGarden = null;
	private common:Common = Common.Shared();
	public static Shared(){
		if(this.shared == null){
			this.shared = new OthersGarden();
		}
		return this.shared;
	}

	//尾部互动信息列表
	private group_avatar:eui.Group;
	//返回图标
	private back:eui.Image;
	//互动图标
	private interaction:eui.Image;
	//浇水图标
	private water:eui.Image;
	
	public constructor() {
		super();
		this.skinName = "resource/garden_skins/OthersGarden.exml";
		//顶部果园用户头像、昵称信息
		this.back.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBackTap,this);
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

	private onBackTap(e:egret.TouchEvent){
		this.parent.addChild(MyGarden.Shared());
		this.parent.removeChild(this);
	}


}