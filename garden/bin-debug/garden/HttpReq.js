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
    function HttpReq() {
        return _super.call(this) || this;
    }
    HttpReq.prototype.GET = function (params) {
        this.url = params.url;
        this.data = params.data;
        this.success = params.success;
        this.error = params.error;
        this.progress = params.progress;
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(this.url + this.data, egret.HttpMethod.GET);
        //设置响应头
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        //发送参数
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
    };
    HttpReq.prototype.POST = function (params) {
        this.url = params.url;
        this.data = JSON.stringify(params.data);
        this.success = params.success;
        this.error = params.error;
        this.progress = params.progress;
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(this.url, egret.HttpMethod.POST);
        //设置响应头
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
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