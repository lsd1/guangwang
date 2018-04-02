class tools extends eui.Component {
	public group_tool:eui.Group;
	public tool_name:eui.Label;
	public tool_num:eui.Label;
	public tool_img:eui.Image;
	public tool_id:number;
	public constructor() {
		super();
		this.skinName = 'resource/garden_skins/tool.exml';
		this.group_tool.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onToolGroupTap, this);
	}

	private onToolGroupTap(e:egret.TouchEvent){
		console.log(this.tool_id + 'touch!')
	}


}