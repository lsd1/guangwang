class NewsList {
	private common = Common.Shared();
	private userInfo:any;
	public constructor() {

	}

	private count:number = 0;

	//生成动态列表
	public createList(userAvatar?:string, username?:string,time?:number, content?:string, x?:number,y?:number){
		var group:eui.Group = new eui.Group();
		group.x = x>0?x:0;
		group.y = y>0?y:0;
		
        var rect:egret.Shape = new egret.Shape();
		rect.graphics.beginFill(0xFFEFBD, 1);
		rect.graphics.drawRoundRect(10, 10, 700, 120, 30);

		//用户名称
		var labelName:eui.Label = new eui.Label();
		labelName.width = 400;
		labelName.height = 140;
		labelName.x = 5;
		labelName.textAlign = "center";
		labelName.verticalAlign = "middle";
		labelName.size = 30;
		labelName.text = username;
		labelName.textColor = 0x673C13;
		labelName.bold = true;

		//果园消息
		var labelNews:eui.Label = new eui.Label();
		labelNews.x = 250;		
		labelNews.width = 250;
		labelNews.height = 140;
		labelNews.textAlign = "center";
		labelNews.verticalAlign = "middle";
		labelNews.size = 30;
		labelNews.text = content;
		labelNews.textColor = 0x673C13;

		//时间
		var labelTime:eui.Label = new eui.Label();
		labelTime.width = 400;
		labelTime.height = 140;
		labelTime.x = 350;
		labelTime.textAlign = "right";
		labelTime.verticalAlign = "middle";
		labelTime.size = 30;
		labelTime.text = time.toString();
		labelTime.textColor = 0xDDA024;

		group.addChild(rect);
		group.addChild(this.common.createCircleMask(100, 100, userAvatar, 20, 20));
		group.addChild(labelName);
		group.addChild(labelNews);
		group.addChild(labelTime);

		return group;
	}
}