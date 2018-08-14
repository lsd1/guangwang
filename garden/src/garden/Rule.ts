class Rule extends eui.ItemRenderer{

	public static share:Rule;
	public static Shared(){
		if(!this.share){
			this.share = new Rule();
		}
		return this.share;
	}

	//全剧这遮罩
	private full_mask:eui.Rect;
	//tips面板组
	private group_tips:eui.Group;
	//提示内容
	private tips_text:eui.Label;
	//关闭按钮
	private tips_close:eui.Group;

	public constructor() {
		super();
		this.skinName = "resource/garden_skins/Rule.exml";
		this.data = JSON.parse(egret.localStorage.getItem('langData'));
		this.cacheAsBitmap = true;
		this.right = 0;
		this.left = 0;
		this.top = 0;
		this.bottom = 0;
		this.tips_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTipsCloseTap, this);
	}

	//点击确定关闭提示框
	private onTipsCloseTap(e:egret.TouchEvent){
		this.closeTips();
	}

	//关闭提示框
	public closeTips(){
		this.parent.removeChild(this);
	}
}