class Tools extends eui.Component {
	public group_tool:eui.Group;
	//道具名称
	public tool_name:eui.Label;
	//道具数量
	public tool_num:eui.Label;
	//道具图标
	public tool_img:eui.Image;
	//道具ID
	public tool_id:number;
	public constructor() {
		super();
		this.skinName = 'resource/garden_skins/Tools.exml';
		this.cacheAsBitmap = true;
		this.group_tool.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onToolGroupTap, this);
	}

	//点击使用道具
	private onToolGroupTap(e:egret.TouchEvent){
		if(parseInt(this.tool_num.text) < 1){
			MyGarden.Shared().onPropsCloseTap(e);
			MyGarden.Shared().onInviteTap(e);
			// MyGarden.Shared().setChildIndex(MyGarden.Shared().panel_active_package, -1);
			// MyGarden.Shared().full_mask.visible = true;
			// MyGarden.Shared().package_no.text = '请输入激活码';
			// MyGarden.Shared().panel_active_package.visible = true;
		}else{
			MyGarden.Shared().useToolGroup = this;
			var httpReq = new HttpReq();
			var url = 'v1.0/tool/show_tips';
			MyGarden.Shared().wait.show();
			httpReq.GET({
				url:url,
				data:{toolId:this.tool_id},
				success:(res:any)=>{
					var res = JSON.parse(res);
					if(res.code == 0){
						MyGarden.Shared().setChildIndex(MyGarden.Shared().panel_tool_tips, -1);
						var toolInfo = res.data.toolInfo;
						MyGarden.Shared().tool_tips.text = toolInfo.tooltips;
						MyGarden.Shared().tips_title.text = '使用' + toolInfo.toolname;
						MyGarden.Shared().panel_tool_tips.visible = true;					
					}else if(res.code == 110){
						MyGarden.Shared().tips.showTips(res.msg);
						setTimeout(MyGarden.Shared().signOut, 2000);
					}else{
						MyGarden.Shared().tips.showTips(res.msg);
					}
					MyGarden.Shared().wait.hide();
				},
				error:()=>{
					MyGarden.Shared().wait.hide();
					MyGarden.Shared().tips.showTips('网络错误！请重新尝试！');
					console.log('error');
				}
			});
		}

		// tool/show_tips
		//toolId
		// var httpReq = new HttpReq();
		// var url = 'v1.0/tool/show_tips';
		// httpReq.GET({
		// 	url:url,
		// 	data:{toolId:this.tool_id},
		// 	success:(res:any)=>{
		// 		var res = JSON.parse(res);
		// 		if(res.code == 0){
					
		// 		}
		// 	},
		// 	error:()=>{
		// 		console.log('error');
		// 	},
		// 	progress:()=>{
		// 		console.log('waiting......');
		// 	}
		// });
	}


}