class MyGarden extends eui.ItemRenderer{
	private static shared:MyGarden;
	common:Common = Common.Shared();
	public wait:Wait = Wait.Shared();
	public static Shared(){
		if(this.shared == null){
			this.shared = new MyGarden();
		}
		return this.shared;
	}
	public gameConfig = RES.getRes('gameConfig_json');
	//退出登录
	private logout:eui.Image;
	//主界面上部分
	private group_top:eui.Group;

	//成熟倒计时
	private countdownNum:number = 0;

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
	//道具列表Group
	private toolGroup:eui.Group;

	//激活套餐弹框
	public panel_active_package:eui.Group;
	//激活套餐关闭按钮
	public active_package_close:eui.Button;
	//套餐激活码
	public package_no:eui.Label;
	//提交激活
	public commit_active_package:eui.EditableText;

	//当前点击的道具
	public useToolGroup:any;
	//道具使用提示弹框
	public panel_tool_tips:eui.Group;
	//弹框tips_title
	public tips_title:eui.Label;
	//确认使用道具按钮
	public commit_tool_tips:eui.Group;
	//关闭道具使用提示按钮
	public tool_tips_close:eui.Button;
	//提示内容
	public tool_tips:eui.Label;

	//果园互动弹框
	private panel_garden_interactive:eui.Group;
	//果园互动列表
	private group_interactive_list:eui.Group;
	//关闭果园互动按钮
	private garden_interactive_close:eui.Button;
	//互动数据
	private scroller_interaction:any = false;

	//果园动态弹出框
	private panel_garden_news:eui.Group;
	//果园动态关闭按钮
	private garden_news_close:eui.Button;
	//果园动态列表
	private scroller_news:eui.Scroller;
	//更多动态按钮
	private garden_more_news:any;

	//我的果园弹框
	private panel_garden_manger:eui.Group;
	//关闭我的果园按钮
	private garden_manger_close:eui.Button;
	//激活时间
	private active_date:eui.Label;
	//用户帐号
	private username:eui.Label;
	//用户帐号
	private user_name:eui.Label;
	//用户积分
	private user_point:eui.Label;
	//积分纪录列表
	private group_point_list:eui.Group;
	//积分列表滚动框
	private score_list:eui.Scroller;
	//提取积分按钮
	private extract_point:eui.Group;
	//修改密码按钮
	private change_password:eui.Group;
	//更多记录按钮
	private more_point_log:eui.Label;
	//暂无记录
	private no_score:eui.Label;

	//设置新密码弹框
	private panel_set_pass_word:eui.Group;
	//旧密码
	private old_pass_word:eui.Label;
	//新密码
	private new_pass_word:eui.Label;
	//重复新密码
	private repeat_pass_word:eui.Label;
	//提交修改
	private commit_change:eui.Group;
	//关闭设置新密码按钮
	private set_pass_word_close:eui.Button;	

	//设置新昵称
	//设置按钮
	private change_nickname:eui.Group;
	private panel_set_nickname:eui.Group;
	//新昵称
	private new_nickname:eui.Label;
	//提交修改
	private commit_nickname:eui.Group;
	//关闭设置新密码按钮
	private set_nickname_close:eui.Button;	
	
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

	//我的头像
	private my_avatar:eui.Image;
	//修改头像按钮
	private change_avatar:eui.Group;

	//图片裁剪
	private cut_image:eui.Group;
	//裁剪区域
	private cut_area:eui.Rect;
	//裁剪区上半部分
	private cut_area_group:eui.Group;
	//裁剪区下半部分
	//private new_area_group:eui.Group;
	//原始图片
	private origin_image:eui.Image;
	private cache_image:eui.Image;
	private startX:any;
	private startY:any;
	//确认裁剪
	private cut_commit:eui.Button;
	//裁剪后图片
	//private new_image:eui.Image;
	//全局遮罩
	public full_mask:eui.Rect;

	//施肥动画
	private feiliao_mc_1:any;
	//果子熟了画
	private guozishule_mc_1:any;
	//催熟动画
	private cuishu_mc_1:any;
	//干枯动画
	private ganku_mc_1:any;
	//药剂动画
	private yaoji_mc_1:any;
	//防偷动画
	private fangtou_mc_1:any;
	//长虫动画
	private insect_mc_1:any;
	//杀虫动画
	private shachong_mc_1:any;
	//浇水
	private jiaoshui_mc_1:any;
	//激活果园
	private panel_active_garden:eui.Group;
	//果园激活码
	private activate_no:eui.EditableText;
	//提交激活码
	private commit_active_garden:eui.Group;

	//干旱状态
	private isDry:number;
	//可浇水状态
	private isWater:number;
	//成熟状态
	private isMature:number;
	//虫害状态
	private isWormy:number;
	//是否防偷
	private fangtou:number = 0;
	//昼夜状态
	private isNight:number;
	//背景图
	private bg_img:eui.Image;
	//用户头像
	private avatar = new eui.Image();
	//提示框
	public tips:any;

	//果园信息是否加载更多
	private news_is_more:number = 0;//-1：没有更多数据，0：加载完成，1：需要加载更多。
	//果园信息
	public news_data:any[] = [];
	//果园last_id
	private news_last_id:number = 0;
	//是否正在切换界面
	private isSwitch:boolean = false;
	//倒计时
	private countDown:eui.Label;

	//邀请按钮
	private invite:eui.Image;
	//邀请界面
	private panel_invite:eui.Group;
	//复制按钮
	private copy:eui.Group;
	//邀请链接
	private inviteUrl:eui.Label;
	//邀请二维码
	private qr_code:eui.Image;
	//邀请人数
	private invite_number:eui.Label;
	//关闭邀请界面
	private invite_close:eui.Button;
	
	public constructor() {
		super();
		this.skinName = "resource/garden_skins/MyGarden.exml";
		this.data = JSON.parse(egret.localStorage.getItem('langData'));
		this.right = 0;
		this.left = 0;
		this.top = 0;
		this.bottom = 0;
		this.cacheAsBitmap = true;
		this.tips = Tips.Shared();
		this.addChildAt(this.wait, -2);
		this.addChildAt(this.tips, -3);		
		//判断果园是否激活
		var isActivate:any = this.common.getCookie('isActivate');
		if(isActivate <= 0){
			this.full_mask.visible = true;
			this.panel_active_garden.visible = true;
		} 
		//退出登录
		this.logout.addEventListener(egret.TouchEvent.TOUCH_TAP, this.signOut, this);
		//点击邀请
		this.invite.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onInviteTap, this);
		//关闭邀请界面
		this.invite_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onInviteCloseTap, this);

		this.copy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCopyTap, this);
		//获取果园信息
		var httpReq = new HttpReq();
		var url = 'v1.0/user/show_garden';
		httpReq.GET({
			url:url,
			data:{},
			success:(res:any)=>{
				var res = JSON.parse(res);
				console.log(res);
				if(res.code == 0){
					//顶部果园用户头像、昵称信息
					this.my_avatar.source = res.data.avatar;
					this.user_name.text = res.data.nickname;
					this.avatar.source = res.data.avatar;
					var topAvatar = this.common.createCircleMask(100, 100, this.avatar, 20, 20);
					var topAvatarBg = this.common.createImage(350, 140, 'garden_data_bg_png', 0, 0);
					this.username = new eui.Label();
					this.username.x = 150;
					this.username.width = 380;
					this.username.height = 140;
					//label.textAlign = "center";
					this.username.verticalAlign = "middle";
					this.username.size = 30;
					this.username.text = res.data.nickname;
					this.username.textColor = 0x000000;
					this.group_top.addChild(topAvatarBg);		
					this.group_top.addChild(topAvatar);
					this.group_top.addChild(this.username);
					//横线
					var line:egret.Shape = new egret.Shape();
					line.graphics.lineStyle(2, 0x000000, 0.1 );
					line.graphics.moveTo(750, -30);
					line.graphics.lineTo(0, -30);
					line.graphics.endFill();
					this.group_avatar.addChild(line);

					this.isDry = res.data.isDry;
					this.isWater = res.data.isWater;
					this.isWormy = res.data.isWormy;
					this.isNight = res.data.isNight;
					this.isMature = res.data.isMature;
					//是否显示干旱动画
					if(this.isDry > 0){
						this.ganku_mc_1 = this.common.mc('ganku', 525, 325);
						this.group_top.addChild( this.ganku_mc_1);
						this.ganku_mc_1.gotoAndPlay(0, -1);
						this.ganku_mc_1.touchEnabled = true;
						this.ganku_mc_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDryTap, this);
					}
					//是否显示成熟动画
					if(this.isMature > 0){
						this.guozishule_mc_1 = this.common.mc('guozishule', 370, 550);
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
						this.insect_mc_1 = this.common.mc('insect', 200, 325);
						this.group_top.addChild( this.insect_mc_1 );
						this.insect_mc_1.gotoAndPlay(0, -1);
						this.insect_mc_1.touchEnabled = true;
						this.insect_mc_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onInsectTap, this);
					}
					//是否开启防偷
					if(res.data.fangtou > 0){
						this.startFangtou(res.data.fangtou);
					}
					if(res.data.countdown > 0){
						//var countdown:number = res.data.countdown;
						this.startCountDown(res.data.countdown);
					}

				}else if(res.code == 110){
					this.tips.showTips(res.msg);
					setTimeout((e)=>{this.signOut(e)}, 2000);
				
				}else{
					this.tips.showTips(res.msg);
				}
			},
			error:()=>{
				console.log('error');
				this.tips.showTips('网络错误！请重新尝试！');
			}
		});


		//关闭激活套餐弹框
		this.active_package_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onActivePackageCloseTap, this);
		//this.package_no.addEventListener(egret.FocusEvent.FOCUS_IN,this.onInputFocusIn,this);
		//激活礼包获取道具
		this.commit_active_package.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCommitActivePackageTap,this);
		
		//激活果园
		this.commit_active_garden.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCommitActiveGardenTap,this);
		//果园激活码输入框
		//this.activate_no.addEventListener(egret.FocusEvent.FOCUS_IN,this.onInputFocusIn,this);
		
		//道具列表
		this.props.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPropsTap, this);
		this.props_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPropsCloseTap, this);
		this.interaction.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onInteractionTap, this);

		//道具使用提示
		this.tool_tips_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onToolTipsCloseTap, this);
		this.commit_tool_tips.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCommitToolTipsTap, this);

		//我的果园
		this.manage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onManageTap, this);
		this.garden_interactive_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGardenInteractiveCloseTap, this);
		this.garden_news_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGardenNewsCloseTap, this);
		this.garden_manger_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGardenMangerCloseTap, this);

		//修改密码
		this.change_password.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangePasswordTap, this);	
		this.set_pass_word_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSetPassWordCloseTap, this);
		this.commit_change.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCommitChangeTap,this);		
		// this.old_pass_word.addEventListener(egret.FocusEvent.FOCUS_IN,this.onInputFocusIn,this);
		// this.new_pass_word.addEventListener(egret.FocusEvent.FOCUS_IN,this.onInputFocusIn,this);
		// this.repeat_pass_word.addEventListener(egret.FocusEvent.FOCUS_IN,this.onInputFocusIn,this);

		//修改昵称
		this.change_nickname.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeNicknameTap, this);	
		this.set_nickname_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSetNicknameCloseTap, this);	
		this.commit_nickname.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCommitNicknameTap, this);	

		//提取积分
		this.extract_point.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExtractPointTap, this);
		this.extract_point_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExtractPointCloseTap, this);
		this.commit_extract_point.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCommitExtractPointTap, this);
		//this.wallet_address.addEventListener(egret.FocusEvent.FOCUS_IN,this.onInputFocusIn,this);
		//this.point_number.addEventListener(egret.FocusEvent.FOCUS_IN,this.onInputFocusIn,this);

		//修改头像
		this.change_avatar.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeAvatarTap, this);
		this.cut_area.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onCutAreaBegin, this);
		this.cut_area.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onCutAreaMove,this);
		this.cut_area.addEventListener(egret.TouchEvent.TOUCH_END,this.onCutAreaEnd,this);		
		this.cut_area.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onCutAreaEnd,this);		
		this.cut_commit.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCutCommitTap,this);

		//复制邀请链接
		this.copy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCopyTap, this);
		
		//获取果园日志
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
						let avatar_source = userLogList[i].avatar ? userLogList[i].avatar : "mygarden_png";
						//更多
						if(i==5){
							this.garden_more_news = avatar.createAvatar(3, avatar_source, "30");
							this.group_avatar.addChild(this.garden_more_news);
							this.garden_more_news.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGardenMoreNewsTap, this);
						}else{
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
					}
				}else if(res.code == 110){
					this.tips.showTips(res.msg);
					setTimeout((e)=>{this.signOut(e)}, 2000);
				}else{
					this.tips.showTips(res.msg);
				}
			},
			error:()=>{
				console.log('error');
				this.tips.showTips('网络错误！请重新尝试！');
			}
		});

	}

	private onCommitActiveGardenTap(e:egret.TouchEvent){
		var activateNo = this.activate_no.text;
		if(activateNo == ''){
			this.tips.showTips('激活码不能为空');
			return false;
		}
		this.wait.show();
		var httpReq = new HttpReq();
		var url = 'v1.0/user/put_activate';
		httpReq.POST({
			url:url,
			data:{activateNo:activateNo},
			success:(res:any)=>{
				var res = JSON.parse(res);
				if(res.code == 0){
					this.panel_active_garden.visible = false;
					this.full_mask.visible = false;
					this.tips.showTips('恭喜你激活成功！');
					this.common.setCookie('isActivate', true, 30);
				}else if(res.code == 110){
					this.tips.showTips(res.msg);
					setTimeout((e)=>{this.signOut(e)}, 2000);
				
				}else{
					this.tips.showTips(res.msg);
				}
				this.wait.hide();
			},
			error:()=>{
				this.wait.hide();
				this.tips.showTips('网络错误！请重新尝试！');
				console.log('error');
			}
		}, e.currentTarget);
	}

	//点击道具
	private onPropsTap(e:egret.TouchEvent){
		this.wait.show();		
		var httpReq = new HttpReq();
		var url:string = 'v1.0/tool/show';
		httpReq.GET({
			url:url,
			data:{},
			success:(res)=>{
				var res = JSON.parse(res);
				if(res.code == 0){
					this.toolGroup = new eui.Group();
					var originToolList = 
					{
						0:{toolId:1,toolname:'化肥',count:0},
						1:{toolId:2,toolname:'驱虫器',count:0},
						2:{toolId:3,toolname:'催熟剂',count:0},
						3:{toolId:4,toolname:'防偷神器',count:0},
						4:{toolId:5,toolname:'药剂',count:0},
					};
					var toolList = res.data.toolList.length > 0 ? res.data.toolList : originToolList;
					for(var i = 0; i < toolList.length; i++){
						let toolInfo = toolList[i];
						let myTool = new Tools();
						if(i<3){
							myTool.x = 21+180*(i);	
							myTool.y = 93;	
						}else{
							myTool.x = 21+180*(i-3);	
							myTool.y = 93+209;	
						}
						switch(toolInfo.toolId){
							case 1:
								myTool.tool_img.source = 'props_icon01_png';

								break;
							case 2:
								myTool.tool_img.source = 'props_icon02_png';

								break;
							case 3:
								myTool.tool_img.source = 'props_icon04_png';

								break;
							case 4:
								myTool.tool_img.source = 'props_icon05_png';

								break;
							case 5:
								myTool.tool_img.source = 'props_icon03_png';
								break;
						}
						myTool.tool_num.text = toolInfo.count;
						myTool.tool_name.text = toolInfo.toolname;
						myTool.tool_id = toolInfo.toolId;
						this.toolGroup.addChild(myTool);
					}
					this.setChildIndex(this.full_mask, -1);
					this.setChildIndex(this.panel_props, -1);
					this.full_mask.visible = true;
					this.panel_props.addChild(this.toolGroup);
					this.panel_props.swapChildren(this.toolGroup, this.props_close);
					this.panel_props.visible = true;
				}else if(res.code == 110){
					this.tips.showTips(res.msg);
					setTimeout((e)=>{this.signOut(e)}, 2000);
				
				}else{
					this.tips.showTips(res.msg);
				}
				this.wait.hide();
			},
			error:()=>{
				console.log('error');
				this.wait.hide();
				this.tips.showTips('网络错误！请重新尝试！');
			}
		}, e.currentTarget);
	}

	//点击互动
	private onInteractionTap(e:egret.TouchEvent){
		if(this.scroller_interaction){
			this.panel_garden_interactive.removeChild(this.scroller_interaction);
		}
		this.wait.show();		
		var httpReq = new HttpReq();
		var url = 'v1.0/user/pick_list';
		httpReq.GET({
			url:url,
			data:{},
			success:(res:any)=>{
				var res = JSON.parse(res);
				let lastId:number;
				if(res.code == 0){
					var pickList = res.data.pickList;	
					var collect:any[] = [];
					for(var i = 0; i < pickList.length; i++){
						let typeArr = [];
						if(pickList[i].countdown > 0){
							typeArr.push(3);
							collect.push({"resource":pickList[i].avatar, "username":pickList[i].username, "type":typeArr, "typeResource":[pickList[i].countdown]});
						}else{
							pickList[i].isMature > 0 ? typeArr.push(2) : null;
							pickList[i].isWater > 0 ? typeArr.push(1) : null;
							collect.push({"resource":pickList[i].avatar, "username":pickList[i].username, "type":typeArr, "typeResource":[]});
						}
						lastId = pickList[i].id;
					}
					this.scroller_interaction = new ScrollerInteraction(collect, lastId)
					this.scroller_interaction.bottom = 0;
					this.scroller_interaction.horizontalCenter = 0;
					this.panel_garden_interactive.addChild(this.scroller_interaction);
				}else if(res.code == 110){
					this.tips.showTips(res.msg);
					setTimeout((e)=>{this.signOut(e)}, 2000);
				
				}else{
					this.tips.showTips(res.msg);
				}
				this.wait.hide();
			},
			error:()=>{
				this.wait.hide();
				this.tips.showTips('网络错误！请重新尝试！');
				console.log('error');
			}
		}, e.currentTarget);
		this.panel_garden_interactive.visible = true;
	}

	//点击管理
	private onManageTap(e:egret.TouchEvent){
		if(this.score_list){
			this.group_point_list.removeChild(this.score_list);
		}
		this.wait.show();
		var httpReq = new HttpReq();
		var url = 'v1.0/user/score_logs';
		httpReq.GET({
			url:url,
			data:{},
			success:(res:any)=>{
				var res = JSON.parse(res);
				if(res.code == 0){
					this.user_point.text = res.data.score;
					this.active_date.text = res.data.activateTime;
					var scoreLogList = res.data.scoreLogList;
					var scoreCollection:any[] = [];
					var lastId:number = 0;
					if(scoreLogList.length > 0){
						for(let i = 0; i < scoreLogList.length; i++){
							scoreCollection.push({
								"score_desc":scoreLogList[i].content,
								"score_change":scoreLogList[i].changeScore,
								"score_date":scoreLogList[i].datetime
							});
							lastId = scoreLogList[i].id;
						}
						this.score_list = new ScrollerScore(scoreCollection, lastId);
						this.group_point_list.addChild(this.score_list);
						this.no_score.visible = false;
					}else{
						this.no_score.visible = true;
					}
				}else if(res.code == 110){
					this.tips.showTips(res.msg);
					setTimeout((e)=>{this.signOut(e)}, 2000);
				}else{
					this.tips.showTips(res.msg);
				}
				this.wait.hide();
			},
			error:()=>{
				this.wait.hide();
				this.tips.showTips('网络错误！请重新尝试！');
				console.log('error');
			}
		}, e.currentTarget);
		this.panel_garden_manger.visible = true;
	}

	//关闭我的果园弹框
	private onGardenMangerCloseTap(e:egret.TouchEvent){
		this.full_mask.visible = false;		
		this.panel_garden_manger.visible = false;
	}

	//关闭道具弹框
	public onPropsCloseTap(e:egret.TouchEvent){
		this.panel_props.removeChild(this.toolGroup);
		this.full_mask.visible = false;		
		this.panel_props.visible = false;
	}

	//关闭果园互动
	private onGardenInteractiveCloseTap(e:egret.TouchEvent){
		this.panel_garden_interactive.visible = false;
	}

	//关闭果园动态
	private onGardenNewsCloseTap(e:egret.TouchEvent){
		this.panel_garden_news.visible = false;
	}

	//关闭套餐激活弹框
	private onActivePackageCloseTap(e:egret.TouchEvent){
		//this.full_mask.visible = false;
		this.panel_active_package.visible = false;
	}

	//提交套餐激活弹框
	private onCommitActivePackageTap(e:egret.TouchEvent){
		this.panel_active_package.visible = false;
		//this.full_mask.visible = false;
		let packageNo = this.package_no.text;
		if(packageNo == ''){
			this.tips.showTips('请输入激活码');		
			return false;
		}
		this.wait.show();
		var httpReq = new HttpReq();
		var url = 'v1.0/user/put_package';
		httpReq.POST({
			url:url,
			data:{packageNo:packageNo},
			success:(res:any)=>{
				var res = JSON.parse(res);
				if(res.code == 0){
					this.tips.showTips('恭喜你获得了道具大礼包！');		
				}else if(res.code == 110){
					this.tips.showTips(res.msg);
					setTimeout((e)=>{this.signOut(e)}, 2000);
				}else{
					this.tips.showTips(res.msg);		
				}
				this.wait.hide();
			},
			error:()=>{
				this.wait.hide();
				this.tips.showTips('网络错误！请重新尝试！');
				console.log('error');
			}
		}, e.currentTarget);
		var data = {"packageNo":999,"price":10,"payOrder":"mcoinTrade"};
	}

	//弹出果园动态框
	private onGardenMoreNewsTap(e:egret.TouchEvent){
		this.wait.show();
		var httpReq = new HttpReq();
		var url = 'v1.0/user/user_logs';
		httpReq.GET({
			url:url,
			data:{},
			success:(res:any)=>{
				var res = JSON.parse(res);
				if(res.code == 0){
					var news_data = [];
					let userLogList = res.data.userLogList;
					for(var i = 0; i < userLogList.length; i++){
						news_data.push({
						"userAvatar":userLogList[i].avatar,
						"username":userLogList[i].username,
						"time":userLogList[i].datetime,
						"content":userLogList[i].content
						});
						this.news_last_id = userLogList[i].id;
					}
					var scroller_news = new ScrollerNews(news_data, this.news_last_id);
					scroller_news.horizontalCenter="0" 
					scroller_news.bottom="0"
					this.panel_garden_news.addChild(scroller_news);
					this.panel_garden_news.visible = true;		
				}else if(res.code == 110){
					this.tips.showTips(res.msg);
					setTimeout((e)=>{this.signOut(e)}, 2000);
				
				}else{
					this.tips.showTips(res.msg);
				}
				this.wait.hide();
			},
			error:()=>{
				this.wait.hide();
				this.tips.showTips('网络错误！请重新尝试！');
				console.log('error');
			}
		}, e.currentTarget);
	}

	private onChangePasswordTap(e:egret.TouchEvent){
		this.setChildIndex(this.full_mask, -1);
		this.setChildIndex(this.panel_set_pass_word, -1);
		this.full_mask.visible = true;
		this.panel_set_pass_word.visible = true;
	}

	private onSetPassWordCloseTap(e:egret.TouchEvent){
		this.full_mask.visible = false;
		this.panel_set_pass_word.visible = false;
	}

	private onChangeNicknameTap(e:egret.TouchEvent){
		this.setChildIndex(this.full_mask, -1);
		this.setChildIndex(this.panel_set_nickname, -1);
		this.full_mask.visible = true;
		this.panel_set_nickname.visible = true;
	}

	private onSetNicknameCloseTap(e:egret.TouchEvent){
		this.full_mask.visible = false;
		this.panel_set_nickname.visible = false;
	}

	private onCommitNicknameTap(e:egret.TouchEvent){
		var nickname = this.new_nickname.text;
		if(nickname == ''){
			this.tips.showTips('昵称不能为空！');
			return false;
		}

		this.wait.show();
		var httpReq = new HttpReq();
		var url = 'v1.0/user/edit_nickname';
		httpReq.POST({
			url:url,
			data:{nickname:nickname},
			success:(res:any)=>{
				var res = JSON.parse(res);
				if(res.code == 0){
					this.tips.showTips('修改昵称成功');	
					this.user_name.text = nickname;
					this.username.text = nickname;
					this.panel_set_pass_word.visible = false;
					this.onSetNicknameCloseTap(e);
				}else if(res.code == 110){
					this.tips.showTips(res.msg);
					setTimeout((e)=>{this.signOut(e)}, 2000);
				}else{
					this.tips.showTips(res.msg);		
				}
				this.wait.hide();
			},
			error:()=>{
				this.wait.hide();
				this.tips.showTips('网络错误！请重新尝试！');
				console.log('error');
			}
		}, e.currentTarget);
	}

	//修改密码-提交
	private onCommitChangeTap(e:egret.TouchEvent){
		if(this.old_pass_word.text == ''){
			this.tips.showTips('请输入原来的密码！');		
			return false;
		}
		if(this.old_pass_word.text == ''){
			this.tips.showTips('请输入新密码！');		
			return false;
		}

		if(this.old_pass_word.text == ''){
			this.tips.showTips('请再次输入新密码！');		
			return false;	
		}

		if(this.new_pass_word.text !== this.repeat_pass_word.text){
			this.tips.showTips('两次输入密码不一致！');		
			return false;					
		}else{
			this.wait.show();
			var httpReq = new HttpReq();
			var url = 'v1.0/user/edit_password';
			httpReq.POST({
				url:url,
				data:{oldpassword:hex_md5(this.old_pass_word.text),newpassword:hex_md5(this.new_pass_word.text)},
				success:(res:any)=>{
					var res = JSON.parse(res);
					if(res.code == 0){
						this.tips.showTips('修改密码成功');		
						this.panel_set_pass_word.visible = false;
					}else if(res.code == 110){
						this.tips.showTips(res.msg);
						setTimeout((e)=>{this.signOut(e)}, 2000);
					}else{
						this.tips.showTips(res.msg);		
					}
					this.wait.hide();
					this.full_mask.visible = false;
				},
				error:()=>{
					this.wait.hide();
					this.tips.showTips('网络错误！请重新尝试！');
					console.log('error');
					this.full_mask.visible = false;					
				}
			}, e.currentTarget);
		}
		
	}

	//提取积分弹框
	private onExtractPointTap(e:egret.TouchEvent){
		this.tips.showTips('该功能暂未开放，敬请期待！');
		// this.setChildIndex(this.full_mask, -1);
		// this.setChildIndex(this.panel_extract_point, -1);
		// this.full_mask.visible = true;	
		// this.panel_extract_point.visible = true;
	}

	//关闭提取积分弹框
	private onExtractPointCloseTap(e:egret.TouchEvent){
		this.full_mask.visible = false;		
		this.panel_extract_point.visible = false;
	}

	//提交提取积分
	private onCommitExtractPointTap(e:egret.TouchEvent){
		var score = this.point_number.text;
		var address = this.wallet_address.text;
		if(parseInt(score) <= 0 || score == ''){
			this.tips.showTips('请输入正确的积分数目');
			return false;
		}
		if(address == ''){
			this.tips.showTips('钱包地址不能为空');
			return false;
		}
		this.wait.show();
		var httpReq = new HttpReq();
		var url = 'v1.0/user/draw_score';
		httpReq.POST({
			url:url,
			data:{score:score,address:address},
			success:(res:any)=>{
				var res = JSON.parse(res);
				if(res.code == 0){
					this.tips.showTips('积分提取成功');
				}else if(res.code == 110){
					this.tips.showTips(res.msg);
					setTimeout((e)=>{this.signOut(e)}, 2000);
				
				}else{
					this.tips.showTips(res.msg);
				}
				this.wait.hide();
				this.full_mask.visible = false;	
				
			},
			error:()=>{
				this.full_mask.visible = false;					
				this.wait.hide();
				this.tips.showTips('网络错误！请重新尝试！');
				console.log('error');
			}
		}, e.currentTarget);
		this.panel_extract_point.visible = false;
	}

	//输入框获得焦点
	private onInputFocusIn(e:egret.FocusEvent){
		var patt = new RegExp('(请输入|请设置|请充值|请确认|请再次)');
		if(patt.test(e.currentTarget.text)){
			e.currentTarget.placeHolder = e.currentTarget.text;
			e.currentTarget.text = '';	
		}

		e.currentTarget.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onInputFocusOut, this);
	}

	//输入框失去焦点
	private onInputFocusOut(e:egret.FocusEvent){
		e.currentTarget.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.onInputFocusOut, this);
		if(e.currentTarget.text == ''){
			e.currentTarget.text = e.currentTarget.placeHolder;
		}
	}

	//修改头像
	private onChangeAvatarTap(e:egret.TouchEvent){
		selectImage(this.selImg, this);
	}

	//选择图片
	private selImg(a:any,b:any,c:any){
		a.origin_image.source = b;
		//裁剪区域范围，舞台上半部分
		a.cut_area_group.width = a.stage.stageWidth;
		a.cut_area_group.height = a.stage.stageHeight;
		a.cache_image = new eui.Image(b);
		a.cache_image.visible = false;
		a.addChild(a.cache_image);
		a.cache_image.addEventListener(egret.Event.COMPLETE, a.onOriginImageComplete, a);
	}

	//原始图片加载完成
	private onOriginImageComplete(e:egret.Event){
			this.origin_image.removeEventListener(egret.Event.COMPLETE, this.onOriginImageComplete,this);
			//舞台和原始图片的宽高比
			var stage_aspect_ratio = this.stage.stageWidth / this.stage.stageHeight;
			var image_aspect_ratio = this.cache_image.width / this.cache_image.height;
			console.log(this.cache_image.width );
			console.log(this.cache_image.height );
			//计算原始图片宽高比和舞台宽高比，然后等比缩放图片到舞台。
			if(image_aspect_ratio > stage_aspect_ratio){
				this.origin_image.width = this.stage.stageWidth;
				this.origin_image.height = this.stage.stageWidth / image_aspect_ratio;
			}else{
				this.origin_image.height = this.stage.stageHeight;
				this.origin_image.width = this.stage.stageHeight * image_aspect_ratio;
			}

			//裁剪区域为正方形。
			this.cut_area.width = this.cut_area.height = this.origin_image.height < this.origin_image.width ? this.origin_image.height : this.origin_image.width
			this.cut_area.x = this.stage.stageWidth / 2 - (this.cut_area.width / 2);
			this.cut_area.y = 0;
			//this.setImageTexture(this.new_image);	
			//this.swapChildren(this.full_mask, this.panel_garden_manger);
			this.setChildIndex(this.cut_image, -1);		
			this.cut_image.visible = true;
			this.full_mask.fillAlpha = 1;
			this.full_mask.visible = true;
	}

	//图像裁剪框开始移动
	private onCutAreaBegin(e:egret.TouchEvent){
		this.startX = e.localX;
		this.startY = e.localY;
	}

	//图像裁剪框移动中
	private onCutAreaMove(e:egret.TouchEvent){
		let stepX:number = e.localX-this.startX;
		let stepY:number = e.localY-this.startY;
		let minX = this.origin_image.x;
		let maxX = this.origin_image.width + this.origin_image.x - this.cut_area.width;
		let minY = this.origin_image.y;
		let maxY = this.origin_image.height + this.origin_image.y - this.cut_area.height;
		let nowX = this.cut_area.x + stepX;
		let nowY = this.cut_area.y + stepY;

		//移动裁剪区域时，裁剪区域不能超过图片区域。
		nowX = nowX > maxX ? maxX : nowX;
		nowX = nowX < minX ? minX : nowX;
		nowY = nowY > maxY ? maxY : nowY;
		nowY = nowY < minY ? minY : nowY;

		this.cut_area.x = nowX;
		this.cut_area.y = nowY;
		this.startX = e.localX;
		this.startY = e.localY;
	}

	//图像裁剪框停止移动
	private onCutAreaEnd(e:egret.TouchEvent){
		//停止移动时把裁剪区域更新到新图片区域
		//this.setImageTexture(this.new_image);
	}

	//确认裁剪
	private onCutCommitTap(e:egret.TouchEvent){
		//确定裁剪之后，更新头像。
		var avatar = this.getImageBase64(this.origin_image);
		var url = 'v1.0/user/upload_avatar';
		this.wait.show();		
		var httpReq = new HttpReq();
		httpReq.POST({
			url:url,
			data:{'avatar': avatar},
			success:(res:any)=>{
				var res = JSON.parse(res);
				if(res.code == 0){
					this.tips.showTips('修改头像成功！');
					this.setImageTexture(this.my_avatar);
					this.setImageTexture(this.avatar);
				}else if(res.code == 110){
					this.tips.showTips(res.msg);
					setTimeout((e)=>{this.signOut(e)}, 2000);
				
				}else{
					this.tips.showTips(res.msg);
				}
				//this.swapChildren(this.full_mask, this.panel_garden_manger);		
				this.cut_image.visible = false;
				this.full_mask.fillAlpha = 0.4;
				this.full_mask.visible = false;
				this.wait.hide();
				this.removeChild(this.cache_image);
			},
			error:()=>{
				this.removeChild(this.cache_image);
				this.wait.hide();
				console.log('error');
				this.cut_image.visible = false;
				this.full_mask.fillAlpha = 0.4;
				this.full_mask.visible = false;
				this.tips.showTips('网络错误！请重新尝试！');
			}
		}, e.currentTarget);
	}

	//填充图片
	private setImageTexture(image:eui.Image){
		var rt:egret.RenderTexture = new egret.RenderTexture;
		rt.drawToTexture( this.origin_image, new egret.Rectangle(this.cut_area.x - this.origin_image.x, this.cut_area.y - this.origin_image.y , this.cut_area.width,this.cut_area.height), 1 );
		image.texture = rt;		
	}

	//获取裁剪后图片的base64字符串
	private getImageBase64(image:eui.Image){
		var rt:egret.RenderTexture = new egret.RenderTexture;
		rt.drawToTexture( image, new egret.Rectangle(this.cut_area.x - this.origin_image.x, this.cut_area.y - this.origin_image.y , this.cut_area.width,this.cut_area.height), 1 );	
		return rt.toDataURL("image/png");
	}

	//关闭道具使用提示
	private onToolTipsCloseTap(e:egret.TouchEvent){
		//this.full_mask.visible = false;		
		this.panel_tool_tips.visible = false;
	}

	//确认使用道具
	private onCommitToolTipsTap(e:egret.TouchEvent){
		var toolId = this.useToolGroup.tool_id;
		this.panel_tool_tips.visible = false;
		this.wait.show();		
		var httpReq = new HttpReq();
		var url = 'v1.0/user/use_tool';
		httpReq.POST({
			url:url,
			data:{toolId:toolId,useNum:1},
			success:(res:any)=>{
				var res = JSON.parse(res);
				if(res.code == 0){
					//播放施肥动画
					//成熟倒计时
					this.full_mask.visible = false;
					this.panel_tool_tips.visible = false;
					this.panel_props.visible = false;
					var mv_name = '';
					switch(toolId){
						case 1:
							mv_name = 'feiliao';
							var mc = this.common.mc(mv_name, 320, 650, this.group_top);
							this.group_top.addChild( mc );
							mc.gotoAndPlay(1, 2);
							this.startCountDown();
						break;
						case 2:
							mv_name = 'shachong';		
							var mc = this.common.mc(mv_name,  230, 325, this.group_top);	
							this.group_top.addChild( mc );
							mc.gotoAndPlay(1, 2);				
						break;
						case 3:
							mv_name = 'cuishu';		
							var mc = this.common.mc(mv_name, 350, 650, this.group_top);		
							this.group_top.addChild( mc );
							mc.gotoAndPlay(1, 2);
							this.countdownNum = Math.ceil(this.countdownNum / 2);		
						break;
						case 4:
							mv_name = 'fangtou';
							this.startFangtou();
						break;
						case 5:
							mv_name = 'yaoji';	
							var mc = this.common.mc(mv_name,  230, 325, this.group_top);	
							this.group_top.addChild( mc );
							mc.gotoAndPlay(1, 2);				
						break;
					}

					this.useToolGroup.tool_num.text--;
				}else if(res.code == 110){
					this.tips.showTips(res.msg);
					setTimeout((e)=>{this.signOut(e)}, 2000);
				
				}else{
					this.tips.showTips(res.msg);
				}
				this.wait.hide();
			},
			error:()=>{
				this.wait.hide();
				console.log('error');
				this.tips.showTips('网络错误！请重新尝试！');
			}
		}, e.currentTarget);

	}

	//点击水滴浇水
	private onDryTap(e:egret.TouchEvent){
		var httpReq = new HttpReq();
		var url = 'v1.0/user/put_water';
		httpReq.POST({
			url:url,
			data:{},
			success:(res:any)=>{
				var res = JSON.parse(res);
				if(res.code == 0){
					this.jiaoshui_mc_1 = this.common.mc('jiaoshui', 400, 750, this.group_top);
					this.group_top.addChild( this.jiaoshui_mc_1 );
					this.jiaoshui_mc_1.gotoAndPlay(1, 2);
					this.group_top.removeChild(this.ganku_mc_1);
				}else if(res.code == 110){
					this.tips.showTips(res.msg);
					setTimeout((e)=>{this.signOut(e)}, 2000);
				
				}else{
					this.tips.showTips(res.msg);
				}
			},
			error:()=>{
				console.log('error');
				this.tips.showTips('网络错误！请重新尝试！');
			}
		}, e.currentTarget);
	}

	//点击果子收获
	 private onFruitTap(e:egret.TouchEvent){
		var httpReq = new HttpReq();
		var url = 'v1.0/user/put_pick';
		httpReq.POST({
			url:url,
			data:{},
			success:(res:any)=>{
				var res = JSON.parse(res);
				if(res.code == 0){
					this.group_top.removeChild(this.guozishule_mc_1);
				}else if(res.code == 110){
					this.tips.showTips(res.msg);
					setTimeout((e)=>{this.signOut(e)}, 2000);
				
				}
				this.tips.showTips(res.msg);
			},
			error:()=>{
				console.log('error');
				this.tips.showTips('网络错误！请重新尝试！');
			}
		}, e.currentTarget);
	 }
	 
	 //点击虫子
	 private onInsectTap(e:egret.TouchEvent){
		 this.onPropsTap(e);
	 }

	 //退出登陆
	 public signOut(e:egret.Event){
		if(this.isSwitch) return false;
		this.isSwitch = true;
		this.common.setCookie('token', '', 30);
		this.common.setCookie('uid', '' , 30);
		this.parent.addChild(Index.Shared());
		this.parent.removeChild(this);
	 }

	 //复制邀请链接
	 private onCopyTap(e:egret.Event){
		var input = document.createElement("input");
        input.value = this.inviteUrl.text;
        document.body.appendChild(input);
        input.select();
        input.setSelectionRange(0, input.value.length),
		document.execCommand('Copy');
        document.body.removeChild(input);
		this.tips.showTips('复制成功！');
		setTimeout(()=>{
			this.tips.closeTips();
		}, 800);
	 }

	 //打开邀请界面
	public onInviteTap(e:egret.TouchEvent){
		this.panel_invite.visible = true;		
		var httpReq = new HttpReq();
		var url = 'v1.0/share/show';
		httpReq.GET({
			url:url,
			data:{},
			success:(res:any)=>{
				var res = JSON.parse(res);
				if(res.code == 0){
					console.log(res);
					this.inviteUrl.text = res.data.shareUrl;
					var QRCode = getQRImgUrl(document.createElement('div'), res.data.shareUrl); 
					setTimeout(()=>{
						this.qr_code.source = QRCode.getImgUrl();
					});
					//this.invite_number.text = '你已经成功邀请好友'+''+'位';
					this.panel_invite.visible = true;	
				}else{
					this.tips.showTips(res.msg);
				}
			},
			error:()=>{
				console.log('error');
				this.tips.showTips('网络错误！请重新尝试！');
			}
		});
	}

	//关闭邀请界面
	private onInviteCloseTap(e:egret.TouchEvent){
		this.panel_invite.visible = false;
	}

	//成熟倒计时
	private startCountDown(countdownNum?:number){
		if(this.countdownNum > 0){
			return false;
		}
		this.countdownNum = countdownNum ? countdownNum : this.gameConfig.mature_time;
		this.countDown.visible = true;
		var t = setInterval(()=>{
			if(this.countdownNum > 0){
				this.countDown.text = this.common.secondToTime(this.countdownNum) + '后成熟';
				this.countdownNum--;
			}else{
				clearInterval(t);
				this.countDown.visible = false;						
				this.guozishule_mc_1 = this.common.mc('guozishule', 380, 530);
				this.group_top.addChild( this.guozishule_mc_1 );
				this.guozishule_mc_1.gotoAndPlay(0, -1);
				this.guozishule_mc_1.touchEnabled = true;
				this.guozishule_mc_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFruitTap, this);									
			}

		},1000);	
	}

	//开启防偷
	private startFangtou(second?:number){
		if(this.fangtou > 0){
			return false;
		}
		this.fangtou = second ? second : this.gameConfig.fangtou;
		this.fangtou_mc_1 = this.common.mc('fangtou', 380, 350);
		this.fangtou_mc_1.scaleX = 1.5;
		this.fangtou_mc_1.scaleY = 1.5;
		this.group_top.addChild( this.fangtou_mc_1 );
		this.fangtou_mc_1.gotoAndPlay(0, -1);
		var t = setInterval(()=>{
			if(this.fangtou > 0){
				this.fangtou--;
			}else{
				clearInterval(t);
				this.group_top.removeChild(this.fangtou_mc_1);
			}
		}, 999);
	}
}