var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var NewsList = (function () {
    function NewsList() {
        this.common = Common.Shared();
        this.count = 0;
    }
    //生成动态列表
    NewsList.prototype.createList = function (userAvatar, username, time, x, y) {
        var group = new eui.Group();
        group.x = x > 0 ? x : 0;
        group.y = y > 0 ? y : 0;
        var rect = new egret.Shape();
        rect.graphics.beginFill(0xFFEFBD, 1);
        rect.graphics.drawRoundRect(10, 10, 700, 120, 30);
        //用户名称
        var labelName = new eui.Label();
        labelName.width = 400;
        labelName.height = 140;
        labelName.textAlign = "center";
        labelName.verticalAlign = "middle";
        labelName.size = 30;
        labelName.text = username;
        labelName.textColor = 0x673C13;
        labelName.bold = true;
        //果园消息
        var labelNews = new eui.Label();
        labelNews.x = 250;
        labelNews.width = 250;
        labelNews.height = 140;
        labelNews.textAlign = "center";
        labelNews.verticalAlign = "middle";
        labelNews.size = 30;
        labelNews.text = '偷了20个果子';
        labelNews.textColor = 0x673C13;
        //时间
        var labelTime = new eui.Label();
        labelTime.width = 100;
        labelTime.height = 140;
        labelTime.x = 560;
        labelTime.textAlign = "right";
        labelTime.verticalAlign = "middle";
        labelTime.size = 30;
        labelTime.text = time.toString();
        labelTime.textColor = 0xDDA024;
        group.addChild(rect);
        group.addChild(this.common.createCircleMask(100, 100, userAvatar, 20, 20));
        group.addChild(labelName);
        group.addChild(labelNews);
        group.addChild(labelTime);
        return group;
    };
    return NewsList;
}());
__reflect(NewsList.prototype, "NewsList");
