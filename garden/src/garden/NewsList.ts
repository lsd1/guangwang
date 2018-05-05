class NewsList extends eui.ItemRenderer{
	private common = Common.Shared();
	private labelName:eui.Label = new eui.Label;
	private labelTime:eui.Label = new eui.Label;
	private labelNews:eui.Label = new eui.Label;
	private group:eui.Group = new eui.Group();

	//自定义的 ItemRenderer
	public constructor() {
		super();
        var rect:egret.Shape = new egret.Shape();
		rect.graphics.beginFill(0xFFEFBD, 1);
		rect.graphics.drawRoundRect(10, 10, 700, 120, 30);

		//用户名称
		this.labelName.width = 400;
		this.labelName.height = 140;
		this.labelName.textAlign = "center";
		this.labelName.verticalAlign = "middle";
		this.labelName.size = 30;
		this.labelName.textColor = 0x673C13;
		this.labelName.bold = true;

		//果园消息
		this.labelNews.x = 250;		
		this.labelNews.width = 250;
		this.labelNews.height = 140;
		this.labelNews.textAlign = "center";
		this.labelNews.verticalAlign = "middle";
		this.labelNews.size = 30;
		this.labelNews.textColor = 0x673C13;

		//时间
		this.labelTime.width = 400;
		this.labelTime.height = 140;
		this.labelTime.x = 290;
		this.labelTime.textAlign = "right";
		this.labelTime.verticalAlign = "middle";
		this.labelTime.size = 30;
		this.labelTime.textColor = 0xDDA024;

		this.group.addChild(rect);
		this.group.addChild(this.labelName);
		this.group.addChild(this.labelNews);
		this.group.addChild(this.labelTime);
		this.addChild(this.group);
		this.cacheAsBitmap = true;
	}

	protected dataChanged():void{
        //数据改变时，会自动调用 dataChanged 这个方法
		this.group.addChild(this.common.createCircleMask(100, 100, this.data.userAvatar, 20, 20));
		this.labelName.text = this.common.getChar(this.data.username, 5);
		this.labelNews.text =  this.common.getChar(this.data.content, 7);
		this.labelTime.text = this.data.time.toString().substring(5);
    }
}