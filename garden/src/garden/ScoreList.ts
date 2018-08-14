class ScoreList extends eui.ItemRenderer{
	public score_list:eui.Group;
	public score_desc:eui.Label;
	public score_change:eui.Label;
	public score_date:eui.Label;
	public constructor() {
		super();
		this.skinName = 'resource/garden_skins/ScoreList.exml'
	}
	protected dataChanged():void{
        //数据改变时，会自动调用 dataChanged 这个方法
		this.score_desc.text = this.data.score_desc;
		this.score_change.text = this.data.score_change;
		this.score_date.text = this.data.score_date;
    }
	
}