class ScrollerInteraction extends eui.Scroller{
	private list:eui.List = new eui.List;
	private tips:Tips = Tips.Shared();
	private scroller_interaction:eui.Scroller;
	//0:数据加载完成；1：需要加载更多；-1：没有更多
	private is_need_more = 0;
	private collection:any[];
	private news_last_id:number = 0;
	public constructor(collection:any, news_last_id:number) {
		super();
		this.skinName = 'resource/garden_skins/ScrollerInteraction.exml';
		this.list.itemRenderer = InteractionList;
		this.collection = collection;
		this.news_last_id = news_last_id;
		this.list.dataProvider = new eui.ArrayCollection(this.collection);
		this.scroller_interaction.viewport = this.list;
		//尾部果园互动消息列表
		this.scroller_interaction.addEventListener(eui.UIEvent.CHANGE, this.moveHandler, this);  
        this.scroller_interaction.addEventListener(eui.UIEvent.CHANGE_END, this.outHandler, this);  
	}

	public moveHandler(e:eui.UIEvent){
		if(this.scroller_interaction.viewport.scrollV > (this.scroller_interaction.viewport.contentHeight - this.scroller_interaction.viewport.height) + 40){  
			if (this.is_need_more > -1) {
				this.is_need_more = 1;  
			} else {
				this.tips.showTips('没有更多了！');
			}
        }  
	}

	public outHandler(e:eui.UIEvent){
		if(this.is_need_more > 0){
			this.is_need_more = 0;
			this.loreMore();
		}
	}

		//加载更多果园信息
	private loreMore(){
		var httpReq = new HttpReq();
		var url = 'v1.0/user/pick_list';
		console.log(this.news_last_id);
		httpReq.GET({
			url:url,
			data:{"lastId":this.news_last_id},
			success:(res:any)=>{
				var res = JSON.parse(res);
				if(res.code == 0){
					let pickList = res.data.pickList;	
					if(pickList.length > 0 ){
						for(let i = 0; i < pickList.length; i++){
							let typeArr = [];
							if(pickList[i].countdown > 0){
								typeArr.push(3);
								this.collection.push({"resource":'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=188103899,3971327013&fm=27&gp=0.jpg', "username":pickList[i].username, "type":typeArr, "typeResource":[pickList[i].countdown]});
							}else{
								pickList[i].isMature > 0 ? typeArr.push(2) : null;
								pickList[i].isWater > 0 ? typeArr.push(1) : null;
								this.collection.push({"resource":'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=188103899,3971327013&fm=27&gp=0.jpg', "username":pickList[i].username, "type":typeArr, "typeResource":[]});
							}
							this.news_last_id = pickList[i].id;
						}
					}else{
						this.is_need_more = -1;
					}
				}else{
					this.tips.showTips(res.msg);
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

}