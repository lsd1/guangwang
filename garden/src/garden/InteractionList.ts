class InteractionList extends eui.ItemRenderer{
	private common = Common.Shared();
	private id:number;
	private group:eui.Group = new eui.Group();
	private userAvatar:eui.Group;
	private userName:eui.Label = new eui.Label();
	private username:string;
	private typeImage:any;
	public constructor() {
		super();
		//背景
        var rect:egret.Shape = new egret.Shape();
		rect.graphics.beginFill(0xFFEFBD, 1);
		rect.graphics.drawRoundRect(10, 10, 700, 120, 30);
		//用户昵称
		this.userName.width = 400;
		this.userName.height = 140;
		this.userName.textAlign = "center";
		this.userName.verticalAlign = "middle";
		this.userName.size = 30;
		//this.userName.text = username;
		this.userName.textColor = 0x7c3c03;
		this.group.addChild(rect);

		//用户头像
		//this.group.addChild(this.common.createCircleMask(100,100,resource,20,20));
		this.group.addChild(this.userName);
		this.addChild(this.group);

		this.group.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onInteractionListTap,this);
		this.cacheAsBitmap = true;
	}

	public onInteractionListTap(e:egret.TouchEvent){
		MyGarden.Shared().parent.addChild(new OthersGarden(this.username));
		MyGarden.Shared().parent.removeChild(MyGarden.Shared());
	}

	protected dataChanged():void{
        //数据改变时，会自动调用 dataChanged 这个方法
		if(this.userAvatar){
			this.group.removeChild(this.userAvatar);
		}
		if(this.typeImage){
			this.group.removeChild(this.typeImage);
		}
		//头像
		this.group.addChild(this.common.createCircleMask(100,100,this.data.resource,20,20));
		//昵称
		this.userName.text = this.data.username;
		this.username = this.data.username;

		//状态图标
		for(let i = 0; i < this.data.type.length; i++){
			//let typeImage:any;
			switch(this.data.type[i]){
				case 1:  
					this.typeImage = this.common.createImage(40,40,'interaction_water_png',(610+30*i),50)
					break;
				case 2:  
					this.typeImage = this.common.createImage(40,40,'interaction_pick_png',(610+30*i),50)
					break;
				case 3:  
					this.typeImage = new eui.Label();
					this.typeImage.width = 680;
					this.typeImage.height = 140;
					this.typeImage.textAlign = "right";
					this.typeImage.verticalAlign = "middle";
					this.typeImage.size = 30;
					
					this.typeImage.textColor = 0x7c3c03;
						setInterval(()=>{
							if(this.data.typeResource[i]>0){
								this.typeImage.text = this.common.secondToTime(this.data.typeResource[i]--);
							}else{
								this.group.removeChild(this.typeImage);
								this.typeImage = this.common.createImage(40, 40,'interaction_take_png',(610 + 30 * i), 50);
								this.group.addChild(this.typeImage);
							}
						}, 1000);
					break;
			}
			this.group.addChild(this.typeImage);
		}
    }

}