var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Params = (function () {
    function Params(username, action, lang, clientType, network, version) {
        this.common = Common.Shared();
        this.lang = lang ? lang : 0;
        this.username = username ? username : this.common.getCookie("username");
        this.action = action ? action : '';
        this.clientType = clientType ? clientType : 0;
        this.network = network ? network : 0;
        this.version = version ? version : '';
        this.token = this.common.getCookie('token') ? this.common.getCookie('token') : '';
        this.timestamp = new Date().getTime();
        this.uuid = this.timestamp.toString() + this.common.getRndNum(5).toString();
        this.params = "clientType=" + this.clientType + "&lang=" + this.lang + "&network=" + this.network + "&timestamp=" + this.timestamp + "&username=" + this.username + "&version=" + this.version;
        this.sign = hex_md5(this.params + "token=" + this.token + "uuid=" + this.uuid + "action=" + this.action);
    }
    Params.prototype.getParamsByJson = function () {
        return {
            "clientType": this.clientType,
            "lang": this.lang,
            "network": this.network,
            "timestamp": this.timestamp,
            "username": this.username,
            "version": this.version,
            "sign": this.sign,
            "token": this.token,
            "uuid": this.uuid,
            "action": this.action
        };
    };
    return Params;
}());
__reflect(Params.prototype, "Params");
//# sourceMappingURL=Params.js.map