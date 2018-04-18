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
	//果园用户名
	private other_user_name:string;
	//顶部果园用户头像、昵称信息
	private group_top:eui.Group;

	//果子熟了画
	private guozishule_mc_1:any;
	//干枯动画
	private ganku_mc_1:any;
	//防偷动画
	private fangtou_mc_1:any;
	//长虫动画
	private insect_mc_1:any;
	//浇水动画
	private jiaoshui_mc_1:any;
	//干旱状态
	private isDry:number;
	//可浇水状态
	private isWater:number;
	//成熟状态
	private isMature:number;
	//虫害状态
	private isWormy:number;
	//是否防偷
	private fangtou:number;
	//昼夜状态
	private isNight:number;
	//提示框
	public tips:any;
	
	public constructor(other_user_name:string) {
		super();
		this.skinName = "resource/garden_skins/OthersGarden.exml";
		this.right = 0;
		this.left = 0;
		this.top = 0;
		this.bottom = 0;
		this.tips = Tips.Shared();
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
					this.group_top.addChild(topAvatarBg);		
					this.group_top.addChild(topAvatar);
					this.group_top.addChild(label);

					this.isDry = res.data.isDry;
					this.isWater = res.data.isWater;
					this.isWormy = res.data.isWormy;
					this.isNight = res.data.isNight;
					this.isMature = res.data.isMature;
					this.fangtou = res.data.fangtou ? res.data.fangtou : 0;
					//是否显示干旱动画
					if(this.isDry > 0){
						console.log('dry');
						this.ganku_mc_1 = this.common.mc('ganku', 425, 425);
						this.group_top.addChild( this.ganku_mc_1);
						this.ganku_mc_1.gotoAndPlay(0, -1);
						this.ganku_mc_1.touchEnabled = true;
						this.ganku_mc_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onWaterTap, this);
					}
					//是否显示成熟动画
					if(this.isMature > 0){
						console.log('dry2');
						this.guozishule_mc_1 = this.common.mc('guozishule', 300, 600);
						this.group_top.addChild( this.guozishule_mc_1 );
						this.guozishule_mc_1.gotoAndPlay(0, -1);
						this.guozishule_mc_1.touchEnabled = true;
						this.guozishule_mc_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFruitTap, this);
					}
					//是否显示夜晚场景
					if(this.isNight > 0){

					}
					//是否长虫
					if(this.isWormy > 0){
						console.log('dry3');
						this.insect_mc_1 = this.common.mc('insect', 200, 425);
						this.group_top.addChild( this.insect_mc_1 );
						this.insect_mc_1.gotoAndPlay(0, -1);
						this.insect_mc_1.touchEnabled = true;
						this.insect_mc_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onInsectTap, this);
					}
					//是否开启防偷
					if(this.fangtou > 0){
						console.log('dry4');
						this.fangtou_mc_1 = this.common.mc('fangtou', 300, 350);
						this.group_top.addChild( this.fangtou_mc_1 );
						this.fangtou_mc_1.gotoAndPlay(0, -1);
					}
				}else{
					this.tips.showTips(res.msg);
				}
			},
			error:()=>{
				console.log('error');
			},
			progress:()=>{
				console.log('waiting......');
			}
		});

		//返回
		this.back.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBackTap,this);
	
		//横线
        var line:egret.Shape = new egret.Shape();
		line.graphics.lineStyle(2, 0x000000, 0.1 );
		line.graphics.moveTo(750, -30);
		line.graphics.lineTo(0, -30);
        line.graphics.endFill();
		this.group_avatar.addChild(line);

		//尾部果园互动消息列表
		var httpReq = new HttpReq();
		var url = 'v1.0/user/user_logs';
		httpReq.GET({
			url:url,
			data:{},
			success:(res:any)=>{
				var res = JSON.parse(res);
				if(res.code == 0){
					let userLogList = res.data.userLogList;
					var len = userLogList.length > 6 ? 6 : userLogList.length;
					for(var i = 0; i < len; i++){
						let avatar = new AvatarList();
						avatar.x = 25 + i * 120;
						//let avatar_source = userLogList[i].avatar ? userLogList[i].avatar : "mygarden_png"; 
						let avatar_source = "mygarden_png"; 
						switch(userLogList[i].curType){
							case 'steal':
								let avatar_cell1 = avatar.createAvatar(2, avatar_source, userLogList[i].fruit);
								this.group_avatar.addChild(avatar_cell1);
							break;
							case 'pick':
								let avatar_cell2 = avatar.createAvatar(2, avatar_source, userLogList[i].fruit);
								this.group_avatar.addChild(avatar_cell2);
							break;
							default:
								let avatar_cell3 = avatar.createAvatar(1, avatar_source, 'interaction_' + userLogList[i].curType+ '_png');
								this.group_avatar.addChild(avatar_cell3);
							break;
						}
					}
				}else{
					this.tips.showTips(res.msg);
				}
			},
			error:()=>{
				console.log('error');
			},
			progress:()=>{
				console.log('waiting......');
			}
		});


		//点击浇水
		this.water.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onWaterTap,this);
		this.jiaoshui_mc_1 = this.common.mc('jiaoshui', 350, 750);
		this.jiaoshui_mc_1.addEventListener(egret.Event.COMPLETE, (e:egret.Event)=>{
			this.group_top.removeChild( this.jiaoshui_mc_1 );
			if(this.group_top.getChildIndex(this.ganku_mc_1) > 0){
				this.group_top.removeChild( this.ganku_mc_1 );
			}

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
					this.group_top.addChild( this.jiaoshui_mc_1 );
					this.jiaoshui_mc_1.gotoAndPlay(1, 2);
				}else{
					this.tips.showTips(res.msg);
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

	//点击偷取果子
	 private onFruitTap(e:egret.TouchEvent){
		var httpReq = new HttpReq();
		var url = 'v1.0/user/put_steal';
		httpReq.POST({
			url:url,
			data:{toUsername:this.other_user_name},
			success:(res:any)=>{
				var res = JSON.parse(res);
				if(res.code == 0){
					this.group_top.removeChild(this.guozishule_mc_1);
				}
				this.tips.showTips(res.msg);
			},
			error:()=>{
				console.log('error');
			},
			progress:()=>{
				console.log('waiting......');
			}
		});
	 }

	//点击虫子
	private onInsectTap(e:egret.TouchEvent){
		this.tips.showTips('只有主人才可以除虫');
	}

}