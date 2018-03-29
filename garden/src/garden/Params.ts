class Params {
	private common:Common = Common.Shared();

	private clientType:number;

	private lang:number;

	private network:number;
	
	private timestamp:number;

	private username:string;

	private version:string;

	private sign:string;

	private token:string;

	private uuid:string;

	private action:string;

	private params:string;

	public constructor(username:string, action?:string, lang?:number, clientType?:number, network?:number, version?:string) {
		this.lang = lang ? lang : 0;
		this.username = username ? username : this.common.getCookie("username");
		this.action = action ? action : '';
		this.clientType = clientType ? clientType : 0;
		this.network = network ? network : 0;		
		this.version = version ? version : '';	
		this.token = this.common.getCookie('token') ? this.common.getCookie('token') : '';
		this.timestamp = new Date().getTime();
		this.uuid =this.timestamp.toString() + this.common.getRndNum(5).toString();
		this.params = "clientType=" + this.clientType + "&lang=" + this.lang + "&network=" + this.network + "&timestamp=" + this.timestamp + "&username=" + this.username + "&version=" + this.version;
		this.sign = hex_md5(this.params + "token=" + this.token + "uuid=" + this.uuid + "action=" + this.action);	
	}

	public getParamsByJson(){
		return {
			"clientType":this.clientType,
			"lang":this.lang,
			"network":this.network,
			"timestamp":this.timestamp,
			"username":this.username,
			"version":this.version,
			"sign":this.sign,
			"token":this.token,
			"uuid":this.uuid,
			"action":this.action
		};
	}
}