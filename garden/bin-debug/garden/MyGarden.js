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
        _this.skinName = "resource/garden_skins/MyGarden.exml";
        //道具列表
        _this.props.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onPropsTap, _this);
        _this.props_close.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onPropsCloseTap, _this);
        _this.interaction.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onInteractionTap, _this);
        //施用肥料
        _this.use_musk_close.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onUseMuskCloseTap, _this);
        _this.group_muck.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupMuckTap, _this);
        _this.commit_use_musk.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onCommitUseMuskTap, _this);
        //道具使用
        _this.group_insecticide.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupInsecticideTap, _this);
        _this.group_medicine.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupMedicineTap, _this);
        _this.group_ripening.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupRipeningTap, _this);
        _this.group_protection.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupProtectionTap, _this);
        //我的果园
        _this.manage.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onManageTap, _this);
        _this.garden_interactive_close.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGardenInteractiveCloseTap, _this);
        _this.garden_news_close.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGardenNewsCloseTap, _this);
        _this.garden_manger_close.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGardenMangerCloseTap, _this);
        //修改密码
        _this.change_password.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onChangePasswordTap, _this);
        _this.next_step.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onNextStepTap, _this);
        _this.set_pass_word_close.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onSetPassWordCloseTap, _this);
        _this.change_pass_word_close.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onChangePassWordCloseTap, _this);
        _this.old_pass_word.addEventListener(egret.FocusEvent.FOCUS_IN, _this.onInputFocus, _this);
        //提取积分
        _this.extract_point.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onExtractPointTap, _this);
        _this.extract_point_close.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onExtractPointCloseTap, _this);
        _this.commit_extract_point.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onCommitExtractPointTap, _this);
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
            if (i == 5) {
                _this.garden_more_news = avatar.createAvatar(i + 1, "mygarden_png", "30");
                _this.group_avatar.addChild(_this.garden_more_news);
            }
            else {
                var avatar_cell = avatar.createAvatar(i + 1, "mygarden_png", "30");
                _this.group_avatar.addChild(avatar_cell);
            }
        }
        _this.garden_more_news.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGardenMoreNewsTap, _this);
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
        for (var i = 0; i < 40; i++) {
            var point_log = new eui.Label();
            point_log.text = '提取积分-800 2018-03-05 14:00';
            point_log.textColor = 0x673C13;
            point_log.size = 25;
            point_log.y = 40 * i;
            point_log.x = 50;
            point_log.width = 650;
            point_log.height = 80;
            this.group_point_list.addChild(point_log);
        }
        this.panel_garden_manger.visible = true;
    };
    //关闭我的果园弹框
    MyGarden.prototype.onGardenMangerCloseTap = function (e) {
        this.panel_garden_manger.visible = false;
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
    //关闭果园动态
    MyGarden.prototype.onGardenNewsCloseTap = function (e) {
        this.panel_garden_news.visible = false;
    };
    //弹出果园动态框
    MyGarden.prototype.onGardenMoreNewsTap = function (e) {
        for (var i = 0; i < 17; i++) {
            var news = new NewsList();
            if (i == 0) {
                var list = news.createList('mygarden_png', '曲终人散', 3600, 0, i * 122);
            }
            else if (i < 2 && i > 0) {
                var list = news.createList('mygarden_png', '曲终人散', 3500, 0, i * 122);
            }
            else {
                var list = news.createList('mygarden_png', '曲终人散', 3400, 0, i * 122);
            }
            this.group_news_list.addChild(list);
        }
        this.panel_garden_news.visible = true;
    };
    MyGarden.prototype.onChangePasswordTap = function (e) {
        this.panel_change_pass_word.visible = true;
    };
    MyGarden.prototype.onChangePassWordCloseTap = function (e) {
        this.panel_change_pass_word.visible = false;
    };
    MyGarden.prototype.onNextStepTap = function (e) {
        this.panel_change_pass_word.visible = false;
        this.panel_set_pass_word.visible = true;
    };
    MyGarden.prototype.onSetPassWordCloseTap = function (e) {
        this.panel_set_pass_word.visible = false;
    };
    MyGarden.prototype.onExtractPointTap = function (e) {
        this.panel_extract_point.visible = true;
    };
    MyGarden.prototype.onExtractPointCloseTap = function (e) {
        this.panel_extract_point.visible = false;
    };
    MyGarden.prototype.onCommitExtractPointTap = function (e) {
        this.panel_extract_point.visible = false;
    };
    MyGarden.prototype.onInputFocus = function (e) {
        console.log(EventTarget);
        console.log(1);
    };
    return MyGarden;
}(eui.Component));
__reflect(MyGarden.prototype, "MyGarden");
//# sourceMappingURL=MyGarden.js.map