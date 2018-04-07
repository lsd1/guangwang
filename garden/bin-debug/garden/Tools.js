var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Tools = (function (_super) {
    __extends(Tools, _super);
    function Tools() {
        var _this = _super.call(this) || this;
        _this.skinName = 'resource/garden_skins/tool.exml';
        _this.group_tool.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onToolGroupTap, _this);
        return _this;
    }
    //点击使用道具
    Tools.prototype.onToolGroupTap = function (e) {
        if (parseInt(this.tool_num.text) < 1) {
        }
        else {
            MyGarden.Shared().useToolGroup = this;
            var httpReq = new HttpReq();
            var url = 'v1.0/tool/show_tips';
            httpReq.GET({
                url: url,
                data: { toolId: this.tool_id },
                success: function (res) {
                    var res = JSON.parse(res);
                    if (res.code == 0) {
                        var toolInfo = res.data.toolInfo;
                        console.log(toolInfo);
                        MyGarden.Shared().tool_tips.text = toolInfo.tooltips;
                        MyGarden.Shared().tips_title.text = '使用' + toolInfo.toolname;
                        MyGarden.Shared().panel_tool_tips.visible = true;
                    }
                },
                error: function () {
                    console.log('error');
                },
                progress: function () {
                    console.log('waiting......');
                }
            });
        }
        // tool/show_tips
        //toolId
        // var httpReq = new HttpReq();
        // var url = 'v1.0/tool/show_tips';
        // httpReq.GET({
        // 	url:url,
        // 	data:{toolId:this.tool_id},
        // 	success:(res:any)=>{
        // 		var res = JSON.parse(res);
        // 		if(res.code == 0){
        // 		}
        // 	},
        // 	error:()=>{
        // 		console.log('error');
        // 	},
        // 	progress:()=>{
        // 		console.log('waiting......');
        // 	}
        // });
    };
    return Tools;
}(eui.Component));
__reflect(Tools.prototype, "Tools");
//# sourceMappingURL=Tools.js.map