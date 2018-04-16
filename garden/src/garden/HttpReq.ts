class HttpReq extends egret.HttpRequest{
	private common:Common = Common.Shared();
	private api_domain:string = "http://123.207.58.186/";
	private url:string;
	private data:any;
	private success:any;
	private error:any;
	private progress:any;

	private lang:number;
	private username:string;
	private action:string;
	private clientType:number;
	private network:number;
	private version:string;
	private params:Params;

	public constructor(username?:string, action?:string, lang?:number, clientType?:number, network?:number, version?:string) {
		super();
		var lang = lang ? lang : 0;
		var username = username ? username : this.common.getCookie('username');
		var action = action ? action : '';
		var clientType = clientType ? clientType : 0;
		var network = network ? network : 0;		
		var version = version ? version : '';	
	}

	public GET(actionParams:any){
		//MyGarden.Shared().wait.show();
		this.action = actionParams.url;
		this.username =  actionParams.username;
		this.params = new Params(this.username, this.action, this.lang, this.clientType, this.network, this.version);
		this.url = this.api_domain + actionParams.url;
		//合并参数
		this.data = this.common.mergeObj(this.params.getParamsByJson(), actionParams.data);
		this.success = actionParams.success;
		this.error = actionParams.error;
		this.progress = actionParams.progress;

		//拼接参数到url
		this.url += '?'+ Object.keys(this.data).map((key)=>{
			return encodeURIComponent(key) + "=" + encodeURIComponent(this.data[key]);
		}).join("&");
		var request = new egret.HttpRequest();
		request.withCredentials = true;
		request.responseType = egret.HttpResponseType.TEXT;
		request.open(this.url, egret.HttpMethod.GET);
		//设置响应头
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		//发送参数
		request.send();
		request.addEventListener(egret.Event.COMPLETE,this.onGetComplete,this);
		request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onGetIOError,this);
		request.addEventListener(egret.ProgressEvent.PROGRESS,this.onGetProgress,this);
	}

	public POST(actionParams:any){
		//MyGarden.Shared().wait.show();
		this.url = this.api_domain + actionParams.url;	
		this.username = actionParams.data.username;
		this.action = actionParams.url;		
		this.params = new Params(this.username, this.action, this.lang, this.clientType, this.network, this.version);		
		//合并参数并将JSON对象转化为字符串。
		this.data = JSON.stringify(this.common.mergeObj(this.params.getParamsByJson(), actionParams.data));
		this.success = actionParams.success;
		this.error = actionParams.error;
		this.progress = actionParams.progress;
		var request = new egret.HttpRequest();
		request.withCredentials = true;		
		request.responseType = egret.HttpResponseType.TEXT;
		request.open(this.url,egret.HttpMethod.POST);
		//设置响应头
		request.setRequestHeader("Content-Type", "application/json");
		//request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		//发送参数
		request.send(this.data);
		request.addEventListener(egret.Event.COMPLETE,this.onGetComplete,this);
		request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onGetIOError,this);
		request.addEventListener(egret.ProgressEvent.PROGRESS,this.onGetProgress,this);
	}

	public onGetComplete(event:egret.Event):void{
		//MyGarden.Shared().wait.hide();
		var request = <egret.HttpRequest>event.currentTarget;
		if(this.success){
			this.success(request.response);
		}
	}

	public onGetIOError(event:egret.IOErrorEvent):void{
		//MyGarden.Shared().wait.hide();
		if(this.error){
			this.error();
		}
	}

	public onGetProgress(event:egret.ProgressEvent):void {
		//MyGarden.Shared().wait.hide();
		if(this.progress){
			this.progress();
		}
	}

}