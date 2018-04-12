class AvatarList extends eui.Component{
	private group:eui.Group = new eui.Group;
	private avatarImage:eui.Image;
	private statusImage:eui.Image;
	private statusCircle:egret.Shape;
	private bgCircle:egret.Shape;
	private statusNumber:eui.Label;
	public x:number;
	public y:number;
	public constructor() {
		super();
		this.x = 0;
		this.y = 0;

		//圆形头像
		this.avatarImage = new eui.Image();
		this.avatarImage.width = 100;
		this.avatarImage.height = 100;
		this.avatarImage.x = 0;
		this.avatarImage.y = 0;
		
		//背景遮罩
		this.bgCircle = new egret.Shape();
		this.bgCircle.graphics.beginFill(0x000000, 1);
		this.bgCircle.graphics.drawCircle(50, 50, 50);
		this.avatarImage.mask = this.bgCircle;

		//状态图标
		this.statusImage = new eui.Image();
		this.statusImage.x = 80;
		this.statusImage.y = 60;
		this.statusImage.width = 40;
		this.statusImage.height = 40;

		//或是状态圆形
		this.statusCircle = new egret.Shape();
		this.statusCircle.graphics.beginFill(0x00BFFF, 1);		
		this.statusCircle.graphics.drawCircle(100, 80, 20);

		this.statusNumber = new eui.Label();
		this.statusNumber.width = 40;
		this.statusNumber.height = 40;
		this.statusNumber.x = 80;
		this.statusNumber.y = 60;
		this.statusNumber.textAlign = "center";
		this.statusNumber.verticalAlign = "middle";
		this.statusNumber.size = 20;
	}

	public createAvatar(type:number, avatarResource:string, statusResource:string){
		var group:eui.Group = new eui.Group;
		this.group.x = this.x;
		this.group.y = this.y;
		this.group.addChild(this.bgCircle);
		
		switch(type){
			case 1://浇水
				this.avatarImage.source = avatarResource;	
				this.statusImage.source = statusResource;

				this.group.addChild(this.avatarImage);
				this.group.addChild(this.statusImage);
				break;
			case 2://偷取数量
				this.avatarImage.source = avatarResource;	
				this.statusNumber.text = statusResource;
				
				this.group.addChild(this.avatarImage);
				this.group.addChild(this.statusCircle);
				this.group.addChild(this.statusNumber);
				break;
			default://更多
				var moreLabel = new eui.Label();
				moreLabel.text = '更多';
				moreLabel.size = 25;
				moreLabel.width = 100;
				moreLabel.height = 100;
				moreLabel.textAlign = "center";
				moreLabel.verticalAlign = "middle"
				moreLabel.x = 0;
				moreLabel.y = 0;
				var moreCircle = new egret.Shape();
				moreCircle.graphics.beginFill(0x000000, 0.5)
				moreCircle.graphics.drawCircle(50, 50, 50);
				var moreImage:eui.Image = new eui.Image();
				moreImage.x = 7;
				moreImage.y = 7;
				moreImage.width = 86;
				moreImage.height = 86;
				moreImage.source = "garden_interaction_more_png";
				this.group.addChild(moreCircle);
				this.group.addChild(moreImage);
				this.group.addChild(moreLabel);		
		}
		return this.group;
	}

}