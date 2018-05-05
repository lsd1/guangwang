class ScrollerScore extends eui.Scroller{
	private list:eui.List = new eui.List;
	private tips:Tips = Tips.Shared();
	private scroller_score:eui.Scroller;
	//0:数据加载完成；1：需要加载更多；-1：没有更多
	private is_need_more = 0;
	private collection:any[];
	private last_id:number = 0;
	public constructor(collection:any, last_id:number) {
		super();
		this.skinName = 'resource/garden_skins/ScrollerScore.exml';
		this.cacheAsBitmap = true;
		this.list.itemRenderer = ScoreList;
		this.collection = collection;
		this.last_id = last_id;
		this.list.dataProvider = new eui.ArrayCollection(this.collection);
		this.scroller_score.viewport = this.list;
		//尾部果园互动消息列表
		this.scroller_score.addEventListener(eui.UIEvent.CHANGE, this.moveHandler, this);  
        this.scroller_score.addEventListener(eui.UIEvent.CHANGE_END, this.outHandler, this);  
	}

	public moveHandler(e:eui.UIEvent){
		if(this.scroller_score.viewport.scrollV > (this.scroller_score.viewport.contentHeight - this.scroller_score.viewport.height) + 40){  
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
		var url = 'v1.0/user/score_logs';
		httpReq.GET({
			url:url,
			data:{lastId:this.last_id},
			success:(res:any)=>{
				var res = JSON.parse(res);
				if(res.code == 0){
					var scoreLogList = res.data.scoreLogList;
					if(scoreLogList.length>0){
						for(let i = 0; i < scoreLogList.length; i++){
							this.collection.push({
								"score_desc":scoreLogList[i].content,
								"score_change":scoreLogList[i].changeScore,
								"score_date":scoreLogList[i].datetime
							});
							this.last_id = scoreLogList[i].id;
						}
					}else{
						this.is_need_more = -1;
					}

				}else if(res.code == 110){
					this.tips.showTips(res.msg);
					//setTimeout((e)=>{this.signOut(e)}, 2000);
				
				}else{
					this.tips.showTips(res.msg);
				}
				//this.wait.hide();
			},
			error:()=>{
				//this.wait.hide();
				this.tips.showTips('网络错误！请重新尝试！');
				console.log('error');
			}
		});
	}

}