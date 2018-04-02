class MyGarden extends eui.Component{
	private static shared:MyGarden;
	private common:Common = Common.Shared();
	public static Shared(){
		if(this.shared == null){
			this.shared = new MyGarden();
		}
		return this.shared;
	}

	//主界面上部分
	private group_top:eui.Group;

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

	//肥料名称
	private muck_text:eui.Label;

	//驱虫剂名称
	private insecticide_text:eui.Label;

	//药剂名称
	private medicine_text:eui.Label;

	//催熟剂名称
	private ripening_text:eui.Label;

	//防偷名称
	private protextion_text:eui.Label;

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
	private commit_use_muck:eui.Group;
	//施用肥料弹框按钮
	private panel_use_muck:eui.Button;
	//关闭施用肥料按钮
	private use_muck_close:eui.Button;

	//使用道具的id
	private useToolId:number;
	//道具使用提示弹框
	private panel_tool_tips:eui.Group;
	//确认使用道具按钮
	private commit_tool_tips:eui.Group;
	//关闭道具使用提示按钮
	private tool_tips_close:eui.Button;
	//提示内容
	private tool_tips:eui.Label;

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
	//提示弹框
	private group_tips:eui.Group;
	//关闭提示弹框
	private tips_close:eui.Group;
	//提示内容
	private tips_text:eui.Label;

	public constructor() {
		super();
		this.skinName = "resource/garden_skins/MyGarden.exml";

		//关闭提示弹框
		this.tips_close.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{this.group_tips.visible = false;}, this);
		
		//道具列表
		this.props.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPropsTap, this);
		this.props_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPropsCloseTap, this);
		
		this.interaction.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onInteractionTap, this);

		//道具使用提示
		this.tool_tips_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onToolTipsCloseTap, this);

		//施用肥料
		// this.use_muck_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onUseMuckCloseTap, this);
		// this.group_muck.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupMuckTap, this);
		// this.commit_use_muck.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCommitUseMuckTap, this);

		//道具使用
		// this.group_insecticide.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupInsecticideTap, this);
		// this.group_medicine.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupMedicineTap, this);
		// this.group_ripening.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupRipeningTap, this);
		// this.group_protection.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupProtectionTap, this);

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

		//修改头像
		this.change_avatar.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeAvatarTap, this);
		//this.commit_extract_point.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCommitExtractPointTap, this);
		this.cut_area.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onCutAreaBegin, this);
		this.cut_area.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onCutAreaMove,this);
		this.cut_area.addEventListener(egret.TouchEvent.TOUCH_END,this.onCutAreaEnd,this);		
		this.cut_area.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onCutAreaEnd,this);		
		this.cut_commit.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCutCommitTap,this);

		//顶部果园用户头像、昵称信息
		
		var topAvatar = this.common.createCircleMask(100, 100, this.common.getCookie('avatar'), 20, 20);
		var topAvatarBg = this.common.createImage(350, 140, "garden_data_bg_png", 0, 0);
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
		var httpReq = new HttpReq();
		var url:string = 'v1.0/tool/show';
		console.log('show tool');
		httpReq.GET({
			url:url,
			data:{},
			success:(res)=>{
				var res = JSON.parse(res);
				if(res.code == 0){
					var toolList = res.data.toolList;
					for(var i = 0; i < toolList.length; i++){
						let toolInfo = toolList[i];
						let myTool = new tools();
						if(i<3){
							myTool.x = 101+180*(i);	
							myTool.y = 494;	
						}else{
							myTool.x = 101+180*(i-3);	
							myTool.y = 494+209;	
						}
						switch(toolInfo.toolId){
							case 1:
								myTool.tool_img.source = 'props_icon01_png';

								break;
							case 2:
								myTool.tool_img.source = 'props_icon02_png';

								break;
							case 3:
								myTool.tool_img.source = 'props_icon03_png';

								break;
							case 4:
								myTool.tool_img.source = 'props_icon04_png';

								break;
							case 5:
								myTool.tool_img.source = 'props_icon05_png';
								break;
						}
						myTool.tool_num.text = toolInfo.count;
						myTool.tool_name.text = toolInfo.toolname;
						myTool.tool_id = toolInfo.toolId;
						this.panel_props.addChild(myTool);
					}

					this.panel_props.visible = true;
				}else{
					this.tips_text = res.msg;
					this.group_tips.visible = true;
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
		this.panel_use_muck.visible = true;
	}

	//关闭施用肥料弹框
	private onUseMuckCloseTap(e:egret.TouchEvent){
		this.panel_use_muck.visible = false;
	}

	//确认施用肥料
	private onCommitUseMuckTap(e:egret.TouchEvent){
		this.panel_use_muck.visible = false;
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
	}

	private onChangeAvatarTap(e:egret.TouchEvent){
		selectImage(this.selImg, this);
	}

	private selImg(a:any,b:any,c:any){
		a.origin_image.source = b;
		//裁剪区域范围，舞台上半部分
		a.cut_area_group.width = a.stage.stageWidth;
		a.cut_area_group.height = a.stage.stageHeight / 2;

		//新图片的呈现区域范围，舞台下半部分
		a.new_area_group.y =  a.stage.stageHeight / 2;
		a.new_area_group.width = a.stage.stageWidth;
		a.new_area_group.height = a.stage.stageHeight / 2;

		a.origin_image.addEventListener(egret.Event.COMPLETE, ()=>{

			//舞台和原始图片的宽高比
			var stage_aspect_ratio = a.stage.stageWidth / a.stage.stageHeight;
			var image_aspect_ratio = a.origin_image.width / a.origin_image.height;

			//计算原始图片宽高比和舞台宽高比，然后等比缩放图片到舞台。
			if(image_aspect_ratio > stage_aspect_ratio){
				a.origin_image.width = a.stage.stageWidth / 2;
				a.origin_image.height = a.stage.stageWidth / image_aspect_ratio / 2;
			}else{
				a.origin_image.height = a.stage.stageHeight / 2;
				a.origin_image.width = a.stage.stageHeight * image_aspect_ratio / 2;
			}

			//裁剪区域为正方形。
			a.cut_area.width = a.cut_area.height = a.origin_image.height < a.origin_image.width ? a.origin_image.height : a.origin_image.width
			a.cut_area.x = a.stage.stageWidth / 2 - (a.cut_area.width / 2);
			a.cut_area.y = a.stage.stageHeight / 4 - (a.cut_area.height / 2);
			a.setImageTexture(a.new_image);			
			a.cut_image.visible = true;
		}, a);

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

	private onCutAreaBegin(e:egret.TouchEvent){
		this.startX = e.localX;
		this.startY = e.localY;
	}

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

	private onCutAreaEnd(e:egret.TouchEvent){
		//停止移动时把裁剪区域更新到新图片区域
		this.setImageTexture(this.new_image);
	}

	private onCutCommitTap(e:egret.TouchEvent){
		//确定裁剪之后，更新头像。
		this.setImageTexture(this.my_avatar);
		this.cut_image.visible = false;
	}

	private setImageTexture(image:eui.Image){
		var rt:egret.RenderTexture = new egret.RenderTexture;
		rt.drawToTexture( this.origin_image, new egret.Rectangle(this.cut_area.x - this.origin_image.x, this.cut_area.y - this.origin_image.y , this.cut_area.width,this.cut_area.height), 1 );
		image.texture = rt;
	}

	private onToolTipsCloseTap(e:egret.TouchEvent){
		this.panel_tool_tips.visible = false;
	}

	private onCommitToolTipsTap(e:egret.TouchEvent){
		switch(this.useToolId){
			case 1:
			break;
			case 2:
			break;
			case 3:
			break;
			case 4:
			break;
			case 5:
			break;
		}
		this.panel_tool_tips.visible = false;
	}
}