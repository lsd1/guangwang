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
var HttpReq = (function (_super) {
    __extends(HttpReq, _super);
    function HttpReq(username, action, lang, clientType, network, version) {
        var _this = _super.call(this) || this;
        _this.common = Common.Shared();
        _this.api_domain = "http://api.test.com/";
        var lang = lang ? lang : 0;
        var username = username ? username : _this.common.getCookie('username');
        var action = action ? action : '';
        var clientType = clientType ? clientType : 0;
        var network = network ? network : 0;
        var version = version ? version : '';
        return _this;
    }
    HttpReq.prototype.GET = function (actionParams) {
        var _this = this;
        this.action = actionParams.url;
        this.username = actionParams.username;
        this.params = new Params(this.username, this.action, this.lang, this.clientType, this.network, this.version);
        this.url = this.api_domain + actionParams.url;
        console.log(actionParams);
        //合并参数
        this.data = this.common.mergeObj(this.params.getParamsByJson(), actionParams.data);
        this.success = actionParams.success;
        this.error = actionParams.error;
        this.progress = actionParams.progress;
        //拼接参数到url
        this.url += '?' + Object.keys(this.data).map(function (key) {
            return encodeURIComponent(key) + "=" + encodeURIComponent(_this.data[key]);
        }).join("&");
        console.log(this.url);
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(this.url, egret.HttpMethod.GET);
        //设置响应头
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        //发送参数
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
    };
    HttpReq.prototype.POST = function (actionParams) {
        this.url = this.api_domain + actionParams.url;
        this.username = actionParams.data.username;
        this.action = actionParams.url;
        this.params = new Params(this.username, this.action, this.lang, this.clientType, this.network, this.version);
        //合并参数并将JSON对象转化为字符串。
        console.log(actionParams.data);
        this.data = JSON.stringify(this.common.mergeObj(this.params.getParamsByJson(), actionParams.data));
        console.log(this.data);
        this.success = actionParams.success;
        this.error = actionParams.error;
        this.progress = actionParams.progress;
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(this.url, egret.HttpMethod.POST);
        //设置响应头
        request.setRequestHeader("Content-Type", "application/json");
        //request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        //发送参数
        request.send(this.data);
        request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
    };
    HttpReq.prototype.onGetComplete = function (event) {
        var request = event.currentTarget;
        if (this.success) {
            this.success(request.response);
        }
    };
    HttpReq.prototype.onGetIOError = function (event) {
        if (this.error) {
            this.error();
        }
    };
    HttpReq.prototype.onGetProgress = function (event) {
        if (this.progress) {
            this.progress();
        }
    };
    return HttpReq;
}(egret.HttpRequest));
__reflect(HttpReq.prototype, "HttpReq");
//# sourceMappingURL=HttpReq.js.map