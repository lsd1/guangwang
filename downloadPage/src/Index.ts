class Index extends eui.Component{
	private static shared:Index;
	public static Shared(){
		if(this.shared == null){
			this.shared = new Index();
		}
		return this.shared;
	}
	public bg_img:eui.Image;
	public download_btn:eui.Image;
	private android_url:string;
	private ios_url:string;
	private download_dom:any;
	public constructor() {
		super();
		this.skinName = "resource/my_skins/Index.exml";
		this.right = 0;
        this.left = 0;
        this.top = 0;
        this.bottom = 0;
		var xhr = new XMLHttpRequest();
		xhr.open('GET', './resource/config/config.json?v=' + Math.random(), true);
		xhr.addEventListener("load",  () => {
			var config = JSON.parse(xhr.response);
			this.ios_url = config.ios_url;
			this.android_url = config.android_url;
			var isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);//判断是否ios终端
			this.download_dom = document.createElement('a');
			this.download_dom.download = isiOS ? this.ios_url : this.android_url;
			this.download_dom.href = 'isiOS ? this.ios_url : this.android_url';
			this.download_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{ console.log(this.download_dom.download);this.download_dom.click();}, this);
		});

		xhr.send(null);
	}
}