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
		this.group_tool.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onToolGroupTap, this);
	}

	//点击使用道具
	private onToolGroupTap(e:egret.TouchEvent){
		if(parseInt(this.tool_num.text) < 1){
			MyGarden.Shared().full_mask.visible = true;
			MyGarden.Shared().package_no.text = '请输入激活码';
			MyGarden.Shared().panel_active_package.visible = true;
		}else{
			MyGarden.Shared().useToolGroup = this;
			var httpReq = new HttpReq();
			var url = 'v1.0/tool/show_tips';
			httpReq.GET({
				url:url,
				data:{toolId:this.tool_id},
				success:(res:any)=>{
					var res = JSON.parse(res);
					if(res.code == 0){
						var toolInfo = res.data.toolInfo;
						MyGarden.Shared().tips_title.text = toolInfo.tooltips;
						MyGarden.Shared().tips_title.text = '使用' + toolInfo.toolname;
						MyGarden.Shared().panel_tool_tips.visible = true;					
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