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
var garden = (function (_super) {
    __extends(garden, _super);
    function garden() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/garden_skins/myGarden.exml";
        _this.props.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onPropsTap, _this);
        _this.interaction.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onInteractionTap, _this);
        _this.manage.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onManageTap, _this);
        _this.props_close.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onPropsCloseTap, _this);
        _this.panel_use_musk.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onUseMuskCloseTap, _this);
        _this.group_muck.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupMuckTap, _this);
        _this.group_insecticide.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupInsecticideTap, _this);
        _this.group_medicine.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupMedicineTap, _this);
        _this.group_ripening.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupRipeningTap, _this);
        _this.group_protection.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupProtectionTap, _this);
        _this.commit_use_musk.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onCommitUseMuskTap, _this);
        //顶部果园用户头像、昵称信息
        var topGrop = new eui.Group();
        var topAvatar = _this.createCircleMask(100, 100, "mygarden_png", 20, 20);
        var topAvatarBg = _this.createImage(350, 140, "garden_data_bg_png", 0, 0);
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
        line.graphics.moveTo(750, 1170);
        line.graphics.lineTo(0, 1170);
        line.graphics.endFill();
        _this.addChild(line);
        //尾部果园互动消息列表
        for (var i = 0; i < 6; i++) {
            var avatar = new AvatarList();
            avatar.x = 25 + i * 120;
            var avatar_cell = avatar.createAvatar(i + 1, "mygarden_png", "30");
            _this.group_avatar.addChild(avatar_cell);
        }
        return _this;
    }
    garden.Shared = function () {
        if (this.shared == null) {
            this.shared = new garden();
        }
        return this.shared;
    };
    //创建圆形遮罩图片
    garden.prototype.createCircleMask = function (width, height, source, x, y) {
        var group = new eui.Group();
        x = x > 0 ? x : 0;
        y = y > 0 ? y : 0;
        var image = this.createImage(width, height, source, x, y);
        var circle = new egret.Shape();
        circle.graphics.beginFill(0x000000, 1);
        circle.graphics.drawCircle(width / 2 + x, width / 2 + y, width / 2);
        image.mask = circle;
        group.addChild(circle);
        group.addChild(image);
        return group;
    };
    //创建一张图片
    garden.prototype.createImage = function (width, height, source, x, y) {
        var image = new eui.Image();
        image.width = width;
        image.height = height;
        image.x = x > 0 ? x : 0;
        image.y = y > 0 ? y : 0;
        image.source = source;
        return image;
    };
    //点击道具
    garden.prototype.onPropsTap = function (e) {
        this.panel_props.visible = true;
    };
    //点击互动
    garden.prototype.onInteractionTap = function (e) {
    };
    //点击管理
    garden.prototype.onManageTap = function (e) {
    };
    //关闭道具弹框
    garden.prototype.onPropsCloseTap = function (e) {
        this.panel_props.visible = false;
    };
    //点击肥料图标
    garden.prototype.onGroupMuckTap = function (e) {
        this.panel_use_musk.visible = true;
    };
    //关闭施用肥料弹框
    garden.prototype.onUseMuskCloseTap = function (e) {
        this.panel_use_musk.visible = false;
    };
    //确认施用肥料
    garden.prototype.onCommitUseMuskTap = function (e) {
        this.panel_use_musk.visible = false;
        console.log("施用肥料");
    };
    //点击驱虫图标
    garden.prototype.onGroupInsecticideTap = function (e) {
    };
    //点击药剂图标
    garden.prototype.onGroupMedicineTap = function (e) {
    };
    //点击催熟图标
    garden.prototype.onGroupRipeningTap = function (e) {
    };
    //点击保护图标
    garden.prototype.onGroupProtectionTap = function (e) {
    };
    return garden;
}(eui.Component));
__reflect(garden.prototype, "garden");
//# sourceMappingURL=garden.js.map