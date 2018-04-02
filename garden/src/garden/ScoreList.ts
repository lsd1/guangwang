class ScoreList extends eui.Component{
	public score_list:eui.Group;
	public score_desc:eui.Label;
	public score_change:eui.Label;
	public score_date:eui.Label;
	public constructor(x?:number,y?:number) {
		super();
		this.skinName = 'resource/garden_skins/scoreList.exml'
		this.score_list.x = x?x:0;
		this.score_list.y = y?y:0;
	}
}