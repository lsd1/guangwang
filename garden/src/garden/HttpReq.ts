class HttpReq extends egret.HttpRequest{
	private common:Common = Common.Shared();
	private url:string;
	private data;
	private success:any;
	private error:any;
	private progress:any;
	private params:Params;

	public constructor(username?:string, action?:string, lang?:number, clientType?:number, network?:number, version?:string) {
		super();
		var lang = lang ? lang : 0;
		var username = username ? username : this.common.getCookie('username');
		var action = action ? action : '';
		var clientType = clientType ? clientType : 0;
		var network = network ? network : 0;		
		var version = version ? version : '';	
		this.params = new Params(username, action, lang, clientType, network, version);
	}

	public GET(actionParams:ActionParams){
		this.url = actionParams.url;

		//合并参数
		this.data = this.common.mergeObj(actionParams.data, this.params.getParamsByJson());
		this.success = actionParams.success;
		this.error = actionParams.error;
		this.progress = actionParams.progress;

		//拼接参数到url
		this.url += Object.keys(this.data).map((key)=>{
			return encodeURIComponent(key) + "=" + encodeURIComponent(this.data[key]);
		}).join("&");
		var request = new egret.HttpRequest();
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

	public POST(actionParams:ActionParams){
		this.url = actionParams.url;
		//合并参数并将JSON对象转化为字符串。
		this.data = JSON.stringify(this.common.mergeObj(actionParams.data, this.params.getParamsByJson()));
		this.success = actionParams.success;
		this.error = actionParams.error;
		this.progress = actionParams.progress;
		var request = new egret.HttpRequest();
		request.responseType = egret.HttpResponseType.TEXT;
		request.open(this.url,egret.HttpMethod.POST);
		//设置响应头
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		//发送参数
		request.send(this.data);
		request.addEventListener(egret.Event.COMPLETE,this.onGetComplete,this);
		request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onGetIOError,this);
		request.addEventListener(egret.ProgressEvent.PROGRESS,this.onGetProgress,this);
	}

	public onGetComplete(event:egret.Event):void{
		var request = <egret.HttpRequest>event.currentTarget;
		if(this.success){
			this.success(request.response);
		}
	}

	public onGetIOError(event:egret.IOErrorEvent):void{
		if(this.error){
			this.error();
		}
	}

	public onGetProgress(event:egret.ProgressEvent):void {
		if(this.progress){
			this.progress();
		}
	}

}