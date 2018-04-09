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
var ScoreList = (function (_super) {
    __extends(ScoreList, _super);
    function ScoreList(x, y) {
        var _this = _super.call(this) || this;
        _this.skinName = 'resource/garden_skins/scoreList.exml';
        _this.score_list.x = x ? x : 0;
        _this.score_list.y = y ? y : 0;
        return _this;
    }
    return ScoreList;
}(eui.Component));
__reflect(ScoreList.prototype, "ScoreList");
//# sourceMappingURL=ScoreList.js.map