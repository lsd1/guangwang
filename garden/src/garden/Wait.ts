class Wait extends eui.Component{
	public static share:Wait;
	public static Shared(){
		if(!this.share){
			this.share = new Wait();
		}
		return this.share;
	}
	private full_mask:eui.Rect;
	private wait_text:eui.Label;
	public constructor() {
		super();
		this.skinName = ''
		this.skinName = "resource/garden_skins/Wait.exml";
		this.right = 0;
		this.left = 0;
		this.top = 0;
		this.bottom = 0;		
		this.cacheAsBitmap = true;
	}

	//显示
	public show(){
		this.full_mask.visible = true;
		this.wait_text.visible = true;
	}
	
	//隐藏
	public hide(){
		this.full_mask.visible = false;
		this.wait_text.visible = false;
	}

}