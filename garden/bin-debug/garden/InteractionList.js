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
var InteractionList = (function (_super) {
    __extends(InteractionList, _super);
    function InteractionList(userInfo) {
        var _this = _super.call(this) || this;
        _this.common = Common.Shared();
        _this.userInfo = userInfo;
        console.log(_this.userInfo);
        return _this;
    }
    //生成互动列表
    InteractionList.prototype.createList = function (resource, username, type, typeResource, x, y) {
        var _this = this;
        var group = new eui.Group();
        group.x = x > 0 ? x : 0;
        group.y = y > 0 ? y : 0;
        var rect = new egret.Shape();
        rect.graphics.beginFill(0xFFEFBD, 1);
        rect.graphics.drawRoundRect(10, 10, 700, 120, 30);
        var label = new eui.Label();
        label.width = 400;
        label.height = 140;
        label.textAlign = "center";
        label.verticalAlign = "middle";
        label.size = 30;
        label.text = username;
        label.textColor = 0x7c3c03;
        group.addChild(rect);
        group.addChild(this.common.createCircleMask(100, 100, resource, 20, 20));
        group.addChild(label);
        group.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onInteractionListTap, this);
        var _loop_1 = function (i) {
            var typeImage;
            switch (type[i]) {
                case 1:
                    typeImage = this_1.common.createImage(40, 40, 'interaction_water_png', (610 + 30 * i), 50);
                    break;
                case 2:
                    typeImage = this_1.common.createImage(40, 40, 'interaction_take_png', (610 + 30 * i), 50);
                    break;
                case 3:
                    typeImage = new eui.Label();
                    typeImage.width = 680;
                    typeImage.height = 140;
                    typeImage.textAlign = "right";
                    typeImage.verticalAlign = "middle";
                    typeImage.size = 30;
                    typeImage.textColor = 0x7c3c03;
                    setInterval(function () {
                        if (typeResource[i] > 0) {
                            typeImage.text = _this.common.secondToTime(typeResource[i]--, 3);
                        }
                        else {
                            group.removeChild(typeImage);
                            typeImage = _this.common.createImage(40, 40, 'interaction_take_png', (610 + 30 * i), 50);
                            group.addChild(typeImage);
                        }
                    }, 1000);
                    break;
            }
            group.addChild(typeImage);
        };
        var this_1 = this;
        for (var i = 0; i < type.length; i++) {
            _loop_1(i);
        }
        return group;
    };
    InteractionList.prototype.onInteractionListTap = function (e) {
        this.parent.addChild(OthersGarden.Shared());
        this.parent.removeChild(this);
        //console.log(this.userInfo);
    };
    return InteractionList;
}(eui.Component));
__reflect(InteractionList.prototype, "InteractionList");
//# sourceMappingURL=InteractionList.js.map