class ScrollerInteraction extends eui.Scroller{
	private list:eui.List = new eui.List;
	private tips:Tips = Tips.Shared();
	private Scroller_interaction:eui.Scroller;
	//0:数据加载完成；1：需要加载更多；-1：没有更多
	private is_need_more = 0;
	private collection:any[];
	private news_last_id:number = 0;
	public constructor(collection:any, news_last_id:number) {
		super();
		this.skinName = 'resource/garden_skins/scrollerNews.exml';
		this.list.itemRenderer = NewsList;
		this.collection = collection;
		this.news_last_id = news_last_id;
		this.list.dataProvider = new eui.ArrayCollection(this.collection);
		this.Scroller_interaction.viewport = this.list;
		//尾部果园互动消息列表
		this.Scroller_interaction.addEventListener(eui.UIEvent.CHANGE, this.moveHandler, this);  
        this.Scroller_interaction.addEventListener(eui.UIEvent.CHANGE_END, this.outHandler, this);  
	}

	public moveHandler(e:eui.UIEvent){
		if(this.Scroller_interaction.viewport.scrollV > (this.Scroller_interaction.viewport.contentHeight - this.Scroller_interaction.viewport.height) + 40){  
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
			this.loreMoreNews();
		}
	}

		//加载更多果园信息
	private loreMoreNews(){
		var httpReq = new HttpReq();
		var url = 'v1.0/user/user_logs';
		return httpReq.GET({
			url:url,
			data:{'lastId':this.news_last_id},
			//data:{},
			success:(res:any)=>{
				var res = JSON.parse(res);
				if(res.code == 0){	
					let userLogList = res.data.userLogList;
					if(userLogList.length > 0){
						for(var i = 0; i < userLogList.length; i++){
							this.collection.push({
							"userAvatar":'mygarden_png',
							"username":userLogList[i].username,
							"time":userLogList[i].datetime,
							"content":userLogList[i].content
							});
							this.news_last_id = userLogList[i].id;
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