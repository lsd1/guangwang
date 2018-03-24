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
var OthersGarden = (function (_super) {
    __extends(OthersGarden, _super);
    function OthersGarden() {
        var _this = _super.call(this) || this;
        _this.common = Common.Shared();
        _this.skinName = "resource/garden_skins/OthersGarden.exml";
        //顶部果园用户头像、昵称信息
        _this.back.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBackTap, _this);
        var topGrop = new eui.Group();
        var topAvatar = _this.common.createCircleMask(100, 100, "mygarden_png", 20, 20);
        var topAvatarBg = _this.common.createImage(350, 140, "garden_data_bg_png", 0, 0);
        var label = new eui.Label();
        label.width = 380;
        label.height = 140;
        label.textAlign = "center";
        label.verticalAlign = "middle";
        label.size = 30;
        label.text = "Tammy";
        label.textColor = 0x000000;
        topGrop.x = 0;
        topGrop.y = 30;
        topGrop.addChild(topAvatarBg);
        topGrop.addChild(topAvatar);
        topGrop.addChild(label);
        _this.addChild(topGrop);
        //横线
        var line = new egret.Shape();
        line.graphics.lineStyle(2, 0x000000, 0.1);
        line.graphics.moveTo(750, -30);
        line.graphics.lineTo(0, -30);
        line.graphics.endFill();
        _this.group_avatar.addChild(line);
        //尾部果园互动消息列表
        for (var i = 0; i < 6; i++) {
            var avatar = new AvatarList();
            avatar.x = 25 + i * 120;
            var avatar_cell = avatar.createAvatar(i + 1, "mygarden_png", "30");
            _this.group_avatar.addChild(avatar_cell);
        }
        return _this;
    }
    OthersGarden.Shared = function () {
        if (this.shared == null) {
            this.shared = new OthersGarden();
        }
        return this.shared;
    };
    OthersGarden.prototype.onBackTap = function (e) {
        this.parent.addChild(MyGarden.Shared());
        this.parent.removeChild(this);
    };
    OthersGarden.shared = null;
    return OthersGarden;
}(eui.Component));
__reflect(OthersGarden.prototype, "OthersGarden");
//# sourceMappingURL=OthersGarden.js.map