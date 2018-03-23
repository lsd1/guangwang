class HttpReq extends egret.HttpRequest{
	private url:string;
	private data:string;
	private success:any;
	private error:any;
	private progress:any;

	public constructor() {
		super();
	}

	public GET(params:any){
		this.url = params.url;
		this.data = params.data;
		this.success = params.success;
		this.error = params.error;
		this.progress = params.progress;

		var request = new egret.HttpRequest();
		request.responseType = egret.HttpResponseType.TEXT;
		request.open(this.url+this.data,egret.HttpMethod.GET);
		//设置响应头
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		//发送参数
		request.send();		
		request.addEventListener(egret.Event.COMPLETE,this.onGetComplete,this);
		request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onGetIOError,this);
		request.addEventListener(egret.ProgressEvent.PROGRESS,this.onGetProgress,this);
	}

	public POST(params:any){
		this.url = params.url;
		this.data = JSON.stringify(params.data);
		this.success = params.success;
		this.error = params.error;
		this.progress = params.progress;
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