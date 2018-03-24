class InteractionList extends eui.Component {
	private common = Common.Shared();
	private userInfo:any;
	public constructor(userInfo) {
		super();
		this.userInfo = userInfo;
		console.log(this.userInfo);
	}

	//生成互动列表
	public createList(resource?:string, username?:string,type?:any,typeResource?:any,x?:number,y?:number){
		var group:eui.Group = new eui.Group();
		group.x = x>0?x:0;
		group.y = y>0?y:0;
        var rect:egret.Shape = new egret.Shape();
		rect.graphics.beginFill(0xFFEFBD, 1);
		rect.graphics.drawRoundRect(10, 10, 700, 120, 30);
		var label:eui.Label = new eui.Label();
		label.width = 400;
		label.height = 140;
		label.textAlign = "center";
		label.verticalAlign = "middle";
		label.size = 30;
		label.text = username;
		label.textColor = 0x7c3c03;
		group.addChild(rect);
		group.addChild(this.common.createCircleMask(100,100,resource,20,20));
		group.addChild(label);

		group.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onInteractionListTap,this);

		for(let i = 0; i < type.length; i++){
			let typeImage:any;
			switch(type[i]){
				case 1:  
					typeImage = this.common.createImage(40,40,'interaction_water_png',(610+30*i),50)
					break;
				case 2:  
					typeImage = this.common.createImage(40,40,'interaction_take_png',(610+30*i),50)
					break;
				case 3:  
					typeImage = new eui.Label();
					typeImage.width = 680;
					typeImage.height = 140;
					typeImage.textAlign = "right";
					typeImage.verticalAlign = "middle";
					typeImage.size = 30;
					
					typeImage.textColor = 0x7c3c03;
						setInterval(()=>{
							if(typeResource[i]>0){
								typeImage.text = this.common.secondToTime(typeResource[i]--, 3);
							}else{
								group.removeChild(typeImage);
								typeImage = this.common.createImage(40, 40,'interaction_take_png',(610 + 30 * i), 50);
								group.addChild(typeImage);
							}
						}, 1000);
					break;
			}
			group.addChild(typeImage);
		}
		return group;
	}

	public onInteractionListTap(e:egret.TouchEvent){
		this.parent.addChild(OthersGarden.Shared())
		this.parent.removeChild(this);
		//console.log(this.userInfo);
	}

}