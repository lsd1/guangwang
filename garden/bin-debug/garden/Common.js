var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Common = (function () {
    function Common() {
    }
    Common.Shared = function () {
        if (this.share == null) {
            this.share = new Common();
        }
        return this.share;
    };
    //秒数转化为倒计时
    Common.prototype.secondToTime = function (second, type) {
        if (!type)
            type = 3;
        var t = '';
        if (second > -1) {
            var hour = Math.floor(second / 3600);
            var min = Math.floor(second / 60) % 60;
            var sec = second % 60;
            if (hour < 10) {
                hour = '0' + hour.toString();
            }
            if (min < 10) {
                min = "0" + min.toString();
            }
            if (sec < 10) {
                sec = "0" + sec.toFixed(0).toString();
            }
            var timeArr = [hour, min, sec];
            for (var i = 0; i < type; i++) {
                t += t == '' ? timeArr[i] : ':' + timeArr[i];
            }
        }
        return t;
    };
    //创建圆形遮罩图片
    Common.prototype.createCircleMask = function (width, height, source, x, y) {
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
    Common.prototype.createImage = function (width, height, source, x, y) {
        var image = new eui.Image();
        image.width = width;
        image.height = height;
        image.x = x > 0 ? x : 0;
        image.y = y > 0 ? y : 0;
        image.source = source;
        return image;
    };
    Common.share = null;
    return Common;
}());
__reflect(Common.prototype, "Common");
//# sourceMappingURL=Common.js.map