class MyGarden extends eui.Component{
	private static shared:MyGarden;
	private common:Common = Common.Shared();
	private wait:Wait = Wait.Shared();
	public static Shared(){
		if(this.shared == null){
			this.shared = new MyGarden();
		}
		return this.shared;
	}

	//主界面上部分
	private group_top:eui.Group;

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
	private new_area_group:eui.Group;
	//原始图片
	private origin_image:eui.Image;
	private startX:any;
	private startY:any;
	//确认裁剪
	private cut_commit:eui.Button;
	//裁剪后图片
	private new_image:eui.Image;
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
	private fangtou:number;
	//昼夜状态
	private isNight:number;
	//背景图
	private bg_img:eui.Image;
	//用户头像
	private avatar = new eui.Image();
	//提示框
	public tips:any;

	public constructor() {
		super();
		this.skinName = "resource/garden_skins/MyGarden.exml";
		this.right = 0;
		this.left = 0;
		this.top = 0;
		this.bottom = 0;
		this.tips = Tips.Shared();
		this.addChildAt(this.tips, -1);
		this.addChildAt(this.wait, -2);

		//判断果园是否激活
		var isActivate:any = this.common.getCookie('isActivate');
		if(isActivate <= 0){
			this.full_mask.visible = true;
			this.panel_active_garden.visible = true;
		} 

		//获取果园信息
		var httpReq = new HttpReq();
		var url = 'v1.0/user/show_garden';
		httpReq.GET({
			url:url,
			data:{},
			success:(res:any)=>{
				var res = JSON.parse(res);
				if(res.code == 0){
					this.isDry = res.data.isDry;
					this.isWater = res.data.isWater;
					this.isWormy = res.data.isWormy;
					this.isNight = res.data.isNight;
					this.isMature = res.data.isMature;
					this.fangtou = res.data.fangtou ? res.data.fangtou : 0;
					//是否显示干旱动画
					if(this.isDry > 0){
						this.ganku_mc_1 = this.common.mc('ganku', 425, 425);
						this.group_top.addChild( this.ganku_mc_1);
						this.ganku_mc_1.gotoAndPlay(0, -1);
						this.ganku_mc_1.touchEnabled = true;
						this.ganku_mc_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDryTap, this);
					}
					//是否显示成熟动画
					if(this.isMature > 0){
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
						this.insect_mc_1 = this.common.mc('insect', 200, 425);
						this.group_top.addChild( this.insect_mc_1 );
						this.insect_mc_1.gotoAndPlay(0, -1);
						this.insect_mc_1.touchEnabled = true;
						this.insect_mc_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onInsectTap, this);
					}
					//是否开启防偷
					if(this.fangtou > 0){
						this.fangtou_mc_1 = this.common.mc('fangtou', 300, 350);
						this.group_top.addChild( this.fangtou_mc_1 );
						this.fangtou_mc_1.gotoAndPlay(0, -1);
					}
				}
			},
			error:()=>{
				console.log('error');
			},
			progress:()=>{
				console.log('waiting......');
			}
		});


		//关闭激活套餐弹框
		this.active_package_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onActivePackageCloseTap, this);
		this.package_no.addEventListener(egret.FocusEvent.FOCUS_IN,this.onInputFocusIn,this);
		//激活礼包获取道具
		this.commit_active_package.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCommitActivePackageTap,this);
		
		//激活果园
		this.commit_active_garden.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCommitActiveGardenTap,this);
		//果园激活码输入框
		this.activate_no.addEventListener(egret.FocusEvent.FOCUS_IN,this.onInputFocusIn,this);
		
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
		this.old_pass_word.addEventListener(egret.FocusEvent.FOCUS_IN,this.onInputFocusIn,this);
		this.new_pass_word.addEventListener(egret.FocusEvent.FOCUS_IN,this.onInputFocusIn,this);
		this.repeat_pass_word.addEventListener(egret.FocusEvent.FOCUS_IN,this.onInputFocusIn,this);

		//提取积分
		this.extract_point.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExtractPointTap, this);
		this.extract_point_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExtractPointCloseTap, this);
		this.commit_extract_point.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCommitExtractPointTap, this);
		this.wallet_address.addEventListener(egret.FocusEvent.FOCUS_IN,this.onInputFocusIn,this);
		this.point_number.addEventListener(egret.FocusEvent.FOCUS_IN,this.onInputFocusIn,this);

		//修改头像
		this.change_avatar.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeAvatarTap, this);
		this.cut_area.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onCutAreaBegin, this);
		this.cut_area.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onCutAreaMove,this);
		this.cut_area.addEventListener(egret.TouchEvent.TOUCH_END,this.onCutAreaEnd,this);		
		this.cut_area.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onCutAreaEnd,this);		
		this.cut_commit.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCutCommitTap,this);

		//顶部果园用户头像、昵称信息
		this.my_avatar.source = this.common.getCookie('avatar');
		this.user_name.text = this.common.getCookie('username');
		this.avatar.source = this.common.getCookie('avatar');
		var topAvatar = this.common.createCircleMask(100, 100, this.avatar, 20, 20);
		var topAvatarBg = this.common.createImage(350, 140, 'garden_data_bg_png', 0, 0);
		var label:eui.Label = new eui.Label();
		label.width = 380;
		label.height = 140;
		label.textAlign = "center";
		label.verticalAlign = "middle";
		label.size = 30;
		label.text = this.common.getCookie('username');
		label.textColor = 0x000000;
		this.group_top.addChild(topAvatarBg);		
		this.group_top.addChild(topAvatar);
		this.group_top.addChild(label);
		//横线
        var line:egret.Shape = new egret.Shape();
		line.graphics.lineStyle(2, 0x000000, 0.1 );
		line.graphics.moveTo(750, -30);
		line.graphics.lineTo(0, -30);
        line.graphics.endFill();
		this.group_avatar.addChild(line);

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
						
						//更多
						if(i==5){
							this.garden_more_news = avatar.createAvatar(3, avatar_source, "30");
							this.group_avatar.addChild(this.garden_more_news);
							this.garden_more_news.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGardenMoreNewsTap, this);
						}
					}
				}
			},
			error:()=>{
				console.log('error');
			},
			progress:()=>{
				console.log('waiting......');
			}
		});

		//尾部果园互动消息列表

	}

	private onCommitActiveGardenTap(e:egret.TouchEvent){
		var activateNo = this.activate_no.text;
		if(activateNo == ''){
			this.tips.showTips('激活码不能为空');
			return false;
		}
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

	//点击道具
	private onPropsTap(e:egret.TouchEvent){
		this.wait.show();
		this.full_mask.visible = true;
		var httpReq = new HttpReq();
		var url:string = 'v1.0/tool/show';
		httpReq.GET({
			url:url,
			data:{},
			success:(res)=>{
				var res = JSON.parse(res);
				if(res.code == 0){
					var toolList = res.data.toolList;
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
						this.panel_props.addChild(myTool);
					}
					
					this.panel_props.visible = true;
				}else{
					this.tips.showTips(res.msg);
				}
				this.wait.hide();
			},
			error:()=>{
				console.log('error');
			},
			progress:()=>{
				console.log('waiting......');
			}
		});
	}

	//点击互动
	private onInteractionTap(e:egret.TouchEvent){
		var httpReq = new HttpReq();
		var url = 'v1.0/user/pick_list';
		httpReq.GET({
			url:url,
			data:{},
			success:(res:any)=>{
				var res = JSON.parse(res);
				if(res.code == 0){
					var pickList = res.data.pickList;			
					for(var i = 0; i < pickList.length; i++){
						let interaction = new InteractionList(pickList[i].id, pickList[i].username);
						let typeArr = [];

						if(pickList[i].countdown > 0){
							typeArr.push(3);
							var list = interaction.createList('https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=188103899,3971327013&fm=27&gp=0.jpg', pickList[i].username, typeArr, [pickList[i].countdown], 0, i * 122);
						}else{
							pickList[i].isMature > 0 ? typeArr.push(2) : null;
							pickList[i].isWater > 0 ? typeArr.push(1) : null;
							//var list = interaction.createList(pickList[i].avatar, pickList[i].username, typeArr, [], 0, i * 122);
							var list = interaction.createList('https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=188103899,3971327013&fm=27&gp=0.jpg', pickList[i].username, typeArr, [], 0, i * 122);
						}
						this.group_interactive_list.addChild(list);
					}
				}
			},
			error:()=>{
				console.log('error');
			},
			progress:()=>{
				console.log('waiting......');
			}
		});


		this.panel_garden_interactive.visible = true;
	}

	//点击管理
	private onManageTap(e:egret.TouchEvent){
		var httpReq = new HttpReq();
		var url = 'v1.0/user/score_logs';
		httpReq.GET({
			url:url,
			data:{},
			success:(res:any)=>{
				var res = JSON.parse(res);
				if(res.code == 0){
					var scoreLogList = res.data.scoreLogList;
					for(let i = 0; i < scoreLogList.length; i++){
						let score_log = new ScoreList(10, 10 + 40 *i);
						score_log.score_desc.text = scoreLogList[i].content;
						score_log.score_change.text	= scoreLogList[i].changeScore;
						score_log.score_date.text	= scoreLogList[i].datetime;
						this.group_point_list.addChild(score_log);
					}
				}
			},
			error:()=>{
				console.log('error');
			},
			progress:()=>{
				console.log('waiting......');
			}
		});
		this.panel_garden_manger.visible = true;
	}

	//关闭我的果园弹框
	private onGardenMangerCloseTap(e:egret.TouchEvent){
		this.full_mask.visible = false;		
		this.panel_garden_manger.visible = false;
	}

	//关闭道具弹框
	private onPropsCloseTap(e:egret.TouchEvent){
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
		this.full_mask.visible = false;
		this.panel_active_package.visible = false;
	}

	//提交套餐激活弹框
	private onCommitActivePackageTap(e:egret.TouchEvent){
		this.panel_active_package.visible = false;
		this.full_mask.visible = false;
		let packageNo = this.package_no.text;
		if(packageNo == ''){
			this.tips.showTips('请输入激活码');		
			return false;
		}

		var httpReq = new HttpReq();
		var url = 'v1.0/user/put_package';
		httpReq.POST({
			url:url,
			data:{packageNo:packageNo},
			success:(res:any)=>{
				var res = JSON.parse(res);
				if(res.code == 0){
					this.full_mask.visible = true;	
					this.tips.showTips('恭喜你获得了道具大礼包！');		
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
		var data = {"packageNo":999,"price":10,"payOrder":"mcoinTrade"};

	}

	//弹出果园动态框
	private onGardenMoreNewsTap(e:egret.TouchEvent){
		var httpReq = new HttpReq();
		var url = 'v1.0/user/user_logs';
		httpReq.GET({
			url:url,
			data:{},
			success:(res:any)=>{
				var res = JSON.parse(res);
				if(res.code == 0){
					let userLogList = res.data.userLogList;
					for(var i = 0; i < userLogList.length; i++){
							let news = new NewsList();
							let avatar_source = userLogList[i].avatar ? userLogList[i].avatar : 'mygarden_png';
							if(i == 0){
								var list = news.createList(avatar_source, userLogList[i].username, userLogList[i].datetime, userLogList[i].content, 0, i * 122);
							}else if(i < 2 && i > 0){
								var list = news.createList(avatar_source, userLogList[i].username, userLogList[i].datetime, userLogList[i].content, 0, i * 122);
							}else{
								var list = news.createList(avatar_source, userLogList[i].username, userLogList[i].datetime, userLogList[i].content, 0, i * 122);
							}
							this.group_news_list.addChild(list);
					}
					this.panel_garden_news.visible = true;		
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


	private onChangePasswordTap(e:egret.TouchEvent){
		this.full_mask.visible = true;
		this.panel_set_pass_word.visible = true;
	}

	private onSetPassWordCloseTap(e:egret.TouchEvent){
		this.full_mask.visible = false;
		this.panel_set_pass_word.visible = false;
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
		
	}

	//提取积分弹框
	private onExtractPointTap(e:egret.TouchEvent){
		this.full_mask.visible = true;	
		this.panel_extract_point.visible = true;
	}

	//关闭提取积分弹框
	private onExtractPointCloseTap(e:egret.TouchEvent){
		this.full_mask.visible = false;		
		this.panel_extract_point.visible = false;
	}

	//提交提取积分
	private onCommitExtractPointTap(e:egret.TouchEvent){
		
		var httpReq = new HttpReq();
		var url = 'v1.0/user/draw_score';
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
		httpReq.POST({
			url:url,
			data:{score:score,address:address},
			success:(res:any)=>{
				var res = JSON.parse(res);
				if(res.code == 0){
					this.tips.showTips('积分提取成功');
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
		a.cut_area_group.height = a.stage.stageHeight / 2;

		//新图片的呈现区域范围，舞台下半部分
		a.new_area_group.y =  a.stage.stageHeight / 2;
		a.new_area_group.width = a.stage.stageWidth;
		a.new_area_group.height = a.stage.stageHeight / 2;

		a.origin_image.addEventListener(egret.Event.COMPLETE, a.onOriginImageComplete, a);

		// var mydisp:any = b;
		// var rt: egret.RenderTexture = new egret.RenderTexture();   //建立缓冲画布
		// rt.drawToTexture(mydisp, new egret.Rectangle(0, 0, mydisp.width, mydisp.height));  //将对象画到缓冲画布上（可指定画对象的某个区域，或画整个）
		// this.my_avatar.texture = rt;
		// var imageBase64:string = rt.toDataURL("image/png");  //转换为图片base64。  （对的你没看错！就这么3行。。。。）
		// console.log(imageBase64); //弹出来看看

		// var saveImage: HTMLImageElement = new Image;
		// saveImage.onload = () => {   //图片加载完成事件（只有加载完成才能转换）
		// 	saveImage.onload = null;
		// 	var myBmp:egret.Bitmap = new egret.Bitmap(<any>saveImage);   //将image强转为egret.Texture即可，也可以将HTMLCanvasElement强转为egret.Texture
		// 	this.addChild(myBmp);   //假设有一个容器叫myContainer，将建立的egret.Bitmap添加到容器
		// }
		// saveImage.src = imageBase64;  //使用上面生成的base64字符串开始加载图片
	}

	//原始图片加载完成
	private onOriginImageComplete(e:egret.Event){
			this.origin_image.removeEventListener(egret.Event.COMPLETE, this.onOriginImageComplete,this);
			//舞台和原始图片的宽高比
			var stage_aspect_ratio = this.stage.stageWidth / this.stage.stageHeight;
			var image_aspect_ratio = this.origin_image.width / this.origin_image.height;

			//计算原始图片宽高比和舞台宽高比，然后等比缩放图片到舞台。
			if(image_aspect_ratio > stage_aspect_ratio){
				this.origin_image.width = this.stage.stageWidth / 2;
				this.origin_image.height = this.stage.stageWidth / image_aspect_ratio / 2;
			}else{
				this.origin_image.height = this.stage.stageHeight / 2;
				this.origin_image.width = this.stage.stageHeight * image_aspect_ratio / 2;
			}

			//裁剪区域为正方形。
			this.cut_area.width = this.cut_area.height = this.origin_image.height < this.origin_image.width ? this.origin_image.height : this.origin_image.width
			this.cut_area.x = this.stage.stageWidth / 2 - (this.cut_area.width / 2);
			this.cut_area.y = 0;
			this.setImageTexture(this.new_image);	
			this.swapChildren(this.full_mask, this.panel_garden_manger);		
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
		this.setImageTexture(this.new_image);
	}

	//确认裁剪
	private onCutCommitTap(e:egret.TouchEvent){
		//确定裁剪之后，更新头像。
		var avatar = this.getImageBase64(this.origin_image);
		var url = 'v1.0/user/upload_avatar';
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
				}else{
					this.tips.showTips(res.msg);
				}
				this.swapChildren(this.full_mask, this.panel_garden_manger);		
				this.cut_image.visible = false;
				this.full_mask.fillAlpha = 0.4;
				this.full_mask.visible = false;
			},
			error:()=>{
				console.log('error');
			},
			progress:()=>{
				console.log('waiting......');
			}
		});
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
		this.full_mask.visible = false;		
		this.panel_tool_tips.visible = false;
	}

	//确认使用道具
	private onCommitToolTipsTap(e:egret.TouchEvent){
		var toolId = this.useToolGroup.tool_id;
		this.useToolGroup.tool_num.text--;
		this.panel_tool_tips.visible = false;
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
							var mc = this.common.mc(mv_name, 320, 950, this);
							this.group_top.addChild( mc );
							mc.gotoAndPlay(1, 2);	
						break;
						case 2:
							mv_name = 'shachong';		
							var mc = this.common.mc(mv_name,  225, 425, this);	
							this.group_top.addChild( mc );
							mc.gotoAndPlay(1, 2);				
						break;
						case 3:
							mv_name = 'cuishu';		
							var mc = this.common.mc(mv_name, 320, 950, this);		
							this.group_top.addChild( mc );
							mc.gotoAndPlay(1, 2);			
						break;
						case 4:
							mv_name = 'fangtou';	
							var mc = this.common.mc(mv_name,  225, 425);	
							this.group_top.addChild( mc );
							mc.gotoAndPlay(1, -1);					
						break;
						case 5:
							mv_name = 'yaoji';	
							var mc = this.common.mc(mv_name,  225, 425, this);	
							this.group_top.addChild( mc );
							mc.gotoAndPlay(1, 2);				
						break;
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

	}

	//点击水滴浇水
	private onDryTap(e:egret.TouchEvent){
		if(this.isWater > 0){
			return false;
		}
		var httpReq = new HttpReq();
		var url = 'v1.0/user/put_water';
		httpReq.POST({
			url:url,
			data:{},
			success:(res:any)=>{
				var res = JSON.parse(res);
				if(res.code == 0){
					this.jiaoshui_mc_1 = this.common.mc('jiaoshui', 350, 900, this.group_top);
					this.group_top.addChild( this.jiaoshui_mc_1 );
					this.jiaoshui_mc_1.gotoAndPlay(1, 2);
					this.group_top.removeChild(this.ganku_mc_1);
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
		 this.onPropsTap(e);
	 }
}