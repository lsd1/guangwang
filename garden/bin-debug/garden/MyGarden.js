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
var MyGarden = (function (_super) {
    __extends(MyGarden, _super);
    function MyGarden() {
        var _this = _super.call(this) || this;
        _this.common = Common.Shared();
        _this.skinName = "resource/garden_skins/myGarden.exml";
        _this.props.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onPropsTap, _this);
        _this.interaction.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onInteractionTap, _this);
        _this.manage.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onManageTap, _this);
        _this.props_close.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onPropsCloseTap, _this);
        _this.use_musk_close.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onUseMuskCloseTap, _this);
        _this.group_muck.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupMuckTap, _this);
        _this.group_insecticide.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupInsecticideTap, _this);
        _this.group_medicine.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupMedicineTap, _this);
        _this.group_ripening.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupRipeningTap, _this);
        _this.group_protection.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupProtectionTap, _this);
        _this.commit_use_musk.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onCommitUseMuskTap, _this);
        _this.garden_interactive_close.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGardenInteractiveCloseTap, _this);
        //顶部果园用户头像、昵称信息
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
    MyGarden.Shared = function () {
        if (this.shared == null) {
            this.shared = new MyGarden();
        }
        return this.shared;
    };
    //点击道具
    MyGarden.prototype.onPropsTap = function (e) {
        this.panel_props.visible = true;
    };
    //点击互动
    MyGarden.prototype.onInteractionTap = function (e) {
        for (var i = 0; i < 17; i++) {
            var interaction = new InteractionList(i);
            if (i == 0) {
                var list = interaction.createList('mygarden_png', '曲终人散', [1, 2], [], 0, i * 122);
            }
            else if (i < 2 && i > 0) {
                var list = interaction.createList('mygarden_png', '曲终人散', [i], [], 0, i * 122);
            }
            else {
                var list = interaction.createList('mygarden_png', '曲终人散', [3], [i * 120], 0, i * 122);
            }
            this.group_interactive_list.addChild(list);
        }
        this.panel_garden_interactive.visible = true;
    };
    //点击管理
    MyGarden.prototype.onManageTap = function (e) {
    };
    //关闭道具弹框
    MyGarden.prototype.onPropsCloseTap = function (e) {
        this.panel_props.visible = false;
    };
    //点击肥料图标
    MyGarden.prototype.onGroupMuckTap = function (e) {
        this.panel_use_musk.visible = true;
    };
    //关闭施用肥料弹框
    MyGarden.prototype.onUseMuskCloseTap = function (e) {
        this.panel_use_musk.visible = false;
    };
    //确认施用肥料
    MyGarden.prototype.onCommitUseMuskTap = function (e) {
        this.panel_use_musk.visible = false;
        this.muck_num.text = 'X887';
        console.log("施用肥料");
    };
    //点击驱虫图标
    MyGarden.prototype.onGroupInsecticideTap = function (e) {
    };
    //点击药剂图标
    MyGarden.prototype.onGroupMedicineTap = function (e) {
    };
    //点击催熟图标
    MyGarden.prototype.onGroupRipeningTap = function (e) {
    };
    //点击保护图标
    MyGarden.prototype.onGroupProtectionTap = function (e) {
    };
    //关闭果园互动
    MyGarden.prototype.onGardenInteractiveCloseTap = function (e) {
        this.panel_garden_interactive.visible = false;
    };
    return MyGarden;
}(eui.Component));
__reflect(MyGarden.prototype, "MyGarden");
//# sourceMappingURL=MyGarden.js.map