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
var Index = (function (_super) {
    __extends(Index, _super);
    function Index() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/my_skins/Index.exml";
        _this.right = 0;
        _this.left = 0;
        _this.top = 0;
        _this.bottom = 0;
        var config = RES.getRes('config_json');
        _this.ios_url = config.ios_url;
        _this.android_url = config.android_url;
        var isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //判断是否ios终端
        _this.download_dom = document.createElement('a');
        _this.download_dom.download = isiOS ? _this.ios_url : _this.android_url;
        _this.download_dom.href = isiOS ? _this.ios_url : _this.android_url;
        _this.download_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { console.log(_this.download_dom.download); _this.download_dom.click(); }, _this);
        return _this;
    }
    Index.Shared = function () {
        if (this.shared == null) {
            this.shared = new Index();
        }
        return this.shared;
    };
    return Index;
}(eui.Component));
__reflect(Index.prototype, "Index");
//# sourceMappingURL=Index.js.map