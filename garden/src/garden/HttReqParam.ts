class HttReqParam {
	private lang:number;

	private version:string;

	private clientType:number;

	private network:number;

	private sign:string;

	private username:string;

	private timestamp:number;

	private uuid:number;

	public constructor(username:string, sign?:string, lang?:number, version?:string, clientType?:number, network?:number, timestamp?:number) {

		var $param = "clientType=" + clientType + "&lang=" + lang + "&network=" + network + "&timestamp=" + timestamp + "&username=" + username + "&version=" + version;

		var $sign = ("{$param}token={$token}uuid={$uuid}action={$action}");
	}

	public params(){

		var params = '';
		return params;

	}
}