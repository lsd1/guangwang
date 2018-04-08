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
var AvatarList = (function (_super) {
    __extends(AvatarList, _super);
    function AvatarList() {
        var _this = _super.call(this) || this;
        _this.group = new eui.Group;
        _this.x = 0;
        _this.y = 0;
        //圆形头像
        _this.avatarImage = new eui.Image();
        _this.avatarImage.width = 100;
        _this.avatarImage.height = 100;
        _this.avatarImage.x = 0;
        _this.avatarImage.y = 0;
        //背景遮罩
        _this.bgCircle = new egret.Shape();
        _this.bgCircle.graphics.beginFill(0x000000, 1);
        _this.bgCircle.graphics.drawCircle(50, 50, 50);
        _this.avatarImage.mask = _this.bgCircle;
        //状态图标
        _this.statusImage = new eui.Image();
        _this.statusImage.x = 80;
        _this.statusImage.y = 60;
        _this.statusImage.width = 40;
        _this.statusImage.height = 40;
        //或是状态圆形
        _this.statusCircle = new egret.Shape();
        _this.statusCircle.graphics.beginFill(0x00BFFF, 1);
        _this.statusCircle.graphics.drawCircle(100, 80, 20);
        _this.statusNumber = new eui.Label();
        _this.statusNumber.width = 40;
        _this.statusNumber.height = 40;
        _this.statusNumber.x = 80;
        _this.statusNumber.y = 60;
        _this.statusNumber.textAlign = "center";
        _this.statusNumber.verticalAlign = "middle";
        _this.statusNumber.size = 20;
        return _this;
    }
    AvatarList.prototype.createAvatar = function (type, avatarResource, statusResource) {
        var group = new eui.Group;
        this.group.x = this.x;
        this.group.y = this.y;
        this.group.addChild(this.bgCircle);
        switch (type) {
            case 1://浇水
                this.avatarImage.source = avatarResource;
                this.statusImage.source = 'interaction_water_png';
                this.group.addChild(this.avatarImage);
                this.group.addChild(this.statusImage);
                break;
            case 2://偷取数量
                this.avatarImage.source = avatarResource;
                this.statusNumber.text = statusResource;
                this.group.addChild(this.avatarImage);
                this.group.addChild(this.statusCircle);
                this.group.addChild(this.statusNumber);
                break;
            default://更多
                var moreLabel = new eui.Label();
                moreLabel.text = '更多';
                moreLabel.size = 25;
                moreLabel.width = 100;
                moreLabel.height = 100;
                moreLabel.textAlign = "center";
                moreLabel.verticalAlign = "middle";
                moreLabel.x = 0;
                moreLabel.y = 0;
                var moreCircle = new egret.Shape();
                moreCircle.graphics.beginFill(0x000000, 0.5);
                moreCircle.graphics.drawCircle(50, 50, 50);
                var moreImage = new eui.Image();
                moreImage.x = 7;
                moreImage.y = 7;
                moreImage.width = 86;
                moreImage.height = 86;
                moreImage.source = "garden_interaction_more_png";
                this.group.addChild(moreCircle);
                this.group.addChild(moreImage);
                this.group.addChild(moreLabel);
        }
        return this.group;
    };
    return AvatarList;
}(eui.Component));
__reflect(AvatarList.prototype, "AvatarList");
