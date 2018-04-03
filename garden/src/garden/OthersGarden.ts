class OthersGarden extends eui.Component {
	private common = Common.Shared();
	//尾部互动信息列表
	private group_avatar:eui.Group;
	//返回图标
	private back:eui.Image;
	//互动图标
	private interaction:eui.Image;
	//浇水图标
	private water:eui.Image;
	//浇水动画
	private jiaoshui_ske:egret.MovieClip;
	//果园用户名
	private other_user_name:string;
	
	
	public constructor(other_user_name:string) {
		super();
		this.skinName = "resource/garden_skins/OthersGarden.exml";
		//顶部果园用户头像、昵称信息
		this.other_user_name = other_user_name;
		
		//获取果园信息
		var httpReq = new HttpReq();
		var url = 'v1.0/user/show_garden';
		httpReq.GET({
			url:url,
			data:{toUsername:this.other_user_name},
			success:(res:any)=>{
				var res = JSON.parse(res);
				if(res.code == 0){
					var topGrop:eui.Group = new eui.Group();
					var topAvatar = this.common.createCircleMask(100, 100, "mygarden_png", 20, 20);
					var topAvatarBg = this.common.createImage(350, 140, "garden_data_bg_png", 0, 0);
					var label:eui.Label = new eui.Label();
					label.width = 380;
					label.height = 140;
					label.textAlign = "center";
					label.verticalAlign = "middle";
					label.size = 30;
					label.text = other_user_name;
					label.textColor = 0x000000;
					topGrop.x = 0;
					topGrop.y = 30;
					topGrop.addChild(topAvatarBg);		
					topGrop.addChild(topAvatar);
					topGrop.addChild(label);
					this.addChild(topGrop);
				}
			},
			error:()=>{
				console.log('error');
			},
			progress:()=>{
				console.log('waiting......');
			}
		});


		this.back.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBackTap,this);
	
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

		//点击浇水
		this.water.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onWaterTap,this);

		var data = RES.getRes("jiaoshui_ske_mc_json");
		var txtr = RES.getRes("jiaoshui_ske_tex_png");
		var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
		this.jiaoshui_ske = new egret.MovieClip( mcFactory.generateMovieClipData( "jiaoshui_ske" ) );
		this.jiaoshui_ske.x = 350;
		this.jiaoshui_ske.y = 750;

		this.jiaoshui_ske.addEventListener(egret.Event.COMPLETE, (e:egret.Event)=>{
			this.removeChild( this.jiaoshui_ske );
		}, this);
	}

	private onBackTap(e:egret.TouchEvent){
		this.parent.addChild(MyGarden.Shared());
		this.parent.removeChild(this);
	}

	private onWaterTap(e:egret.TouchEvent){
		
		var httpReq = new HttpReq();
		var url = 'v1.0/user/put_water';
		
		httpReq.POST({
			url:url,
			data:{toUsername:this.other_user_name},
			success:(res:any)=>{
				var res = JSON.parse(res);
				if(res.code == 0){
					this.addChild( this.jiaoshui_ske );
					this.jiaoshui_ske.gotoAndPlay(1, 2);
				}
			},
			error:()=>{
				console.log('error');
			},
			progress:()=>{
				console.log('waiting......');
			}
		});
	}

}