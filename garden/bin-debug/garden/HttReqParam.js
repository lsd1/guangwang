var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var HttReqParam = (function () {
    function HttReqParam(username, sign, lang, version, clientType, network, timestamp) {
        var $param = "clientType=" + clientType + "&lang=" + lang + "&network=" + network + "&timestamp=" + timestamp + "&username=" + username + "&version=" + version;
        var $sign = ("{$param}token={$token}uuid={$uuid}action={$action}");
    }
    HttReqParam.prototype.params = function () {
        var params = '';
        return params;
    };
    return HttReqParam;
}());
__reflect(HttReqParam.prototype, "HttReqParam");
//# sourceMappingURL=HttReqParam.js.map