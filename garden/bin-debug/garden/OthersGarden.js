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
    function OthersGarden(other_user_name) {
        var _this = _super.call(this) || this;
        _this.common = Common.Shared();
        _this.skinName = "resource/garden_skins/OthersGarden.exml";
        _this.right = 0;
        _this.left = 0;
        _this.top = 0;
        _this.bottom = 0;
        //顶部果园用户头像、昵称信息
        _this.other_user_name = other_user_name;
        //获取果园信息
        var httpReq = new HttpReq();
        var url = 'v1.0/user/show_garden';
        httpReq.GET({
            url: url,
            data: { toUsername: _this.other_user_name },
            success: function (res) {
                var res = JSON.parse(res);
                if (res.code == 0) {
                    var topAvatar = _this.common.createCircleMask(100, 100, "mygarden_png", 20, 20);
                    var topAvatarBg = _this.common.createImage(350, 140, "garden_data_bg_png", 0, 0);
                    var label = new eui.Label();
                    label.width = 380;
                    label.height = 140;
                    label.textAlign = "center";
                    label.verticalAlign = "middle";
                    label.size = 30;
                    label.text = other_user_name;
                    label.textColor = 0x000000;
                    _this.group_top.x = 0;
                    _this.group_top.y = 30;
                    _this.group_top.addChild(topAvatarBg);
                    _this.group_top.addChild(topAvatar);
                    _this.group_top.addChild(label);
                    _this.addChild(_this.group_top);
                }
            },
            error: function () {
                console.log('error');
            },
            progress: function () {
                console.log('waiting......');
            }
        });
        _this.back.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBackTap, _this);
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
        //点击浇水
        _this.water.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onWaterTap, _this);
        var data = RES.getRes("jiaoshui_mc_json");
        var txtr = RES.getRes("jiaoshui_tex_png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        _this.jiaoshui_mc_1 = new egret.MovieClip(mcFactory.generateMovieClipData("jiaoshui_mc_1"));
        _this.jiaoshui_mc_1.x = 350;
        _this.jiaoshui_mc_1.y = 750;
        _this.jiaoshui_mc_1.addEventListener(egret.Event.COMPLETE, function (e) {
            _this.removeChild(_this.jiaoshui_mc_1);
        }, _this);
        return _this;
    }
    OthersGarden.prototype.onBackTap = function (e) {
        this.parent.addChild(MyGarden.Shared());
        this.parent.removeChild(this);
    };
    OthersGarden.prototype.onWaterTap = function (e) {
        var _this = this;
        console.log(1);
        var httpReq = new HttpReq();
        var url = 'v1.0/user/put_water';
        httpReq.POST({
            url: url,
            data: { toUsername: this.other_user_name },
            success: function (res) {
                var res = JSON.parse(res);
                if (res.code == 0) {
                    console.log(res.code);
                    _this.addChild(_this.jiaoshui_mc_1);
                    _this.jiaoshui_mc_1.gotoAndPlay(1, 2);
                }
            },
            error: function () {
                console.log('error');
            },
            progress: function () {
                console.log('waiting......');
            }
        });
    };
    return OthersGarden;
}(eui.Component));
__reflect(OthersGarden.prototype, "OthersGarden");
//# sourceMappingURL=OthersGarden.js.map