class Common {
	private static share:Common = null;
	public static Shared(){
		if(this.share == null){
			this.share = new Common();
		}
		return this.share;
	}

	//秒数转化为倒计时
	public secondToTime(second:number){
		if(second > -1){
			var hour:any = Math.floor(second/3600);
			var min:any = Math.floor(second/60) % 60;
			var sec:any = second % 60;
			var t = '';
			if(hour < 10 ){hour = '0'+ hour.toString();}
			if(min < 10){min = "0" + min.toString();}
			if(sec < 10){sec = "0" + sec.toFixed(0).toString();}
			if(second>3600){
				var timeArr = [hour,min,sec];
			}else{
				var timeArr = [min,sec];
			}
			for(var i = 0; i < timeArr.length; i++){
				t += t == '' ?  timeArr[i] : ':' + timeArr[i];
			}	
		}
		return t;
	}

	//创建圆形遮罩图片
	public createCircleMask(width:number, height:number, image:any, x?:number, y?:number){
		var group:eui.Group = new eui.Group();
		x =  x > 0 ? x : 0;
		y =  y > 0 ? y : 0;
		var img = this.createImage(width, height, image, x, y);
		var circle:egret.Shape = new egret.Shape();
		circle.graphics.beginFill(0x000000, 1);		
		circle.graphics.drawCircle(width/2+x, width/2+y, width/2);
		img.mask = circle;
		group.addChild(circle);
		group.addChild(img);
		return group;
	}

	//创建一张图片
	public createImage(width:number, height:number, image:any, x?:number, y?:number){
		if(typeof(image) == 'string'){
			var img = new eui.Image();
			img.source = image;
		}else{
			img = image;
		}
		img.cacheAsBitmap = true;
		img.width = width;
		img.height = height;
		img.x = x > 0 ? x : 0;
		img.y = y > 0 ? y : 0;
		return img;
	}

	//设置cookie
	public setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + encodeURI(cvalue) + "; " + expires;
	}

	//读取cookie
	public getCookie(name) {
		var arr,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg))
			return decodeURI(arr[2]);
		else
			return null;
	}

	//清空cookie
	public delCookie(name) {
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var val = this.getCookie(name);
		if(val != null ) {
			document.cookie = name + "="+ val + ";expires=" + exp.toISOString();
		}
	}

	//获取N位随机数
	public getRndNum(n?:number){
		let rnd = "";
		n = n ? n : 1;
		for(let i = 0; i < n; i++ ){
			rnd += Math.floor(Math.random() * 10);
		}
		return rnd;
	}

	//把objB对象属性合并到objA，相同属性以objB为准。
	public mergeObj(objA:{},objB:{}){
		for(var key in objB){
			objA[key] = objB[key];
		}
		return objA;
	}

	//加载动画资源
	public mc(mv_name:string, x, y, main?:any){
		var data = RES.getRes(mv_name + "_mc_json");
		var txtr = RES.getRes(mv_name + "_tex_png");
		var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
		var mc = new egret.MovieClip( mcFactory.generateMovieClipData( mv_name + "_mc_1" ) );
		mc.x = x; mc.y = y;
		if(main){
			mc.addEventListener(egret.Event.COMPLETE, (e:egret.Event)=>{
				main.removeChild( mc );
			}, main);
		}
		return mc;
	}

	public getChar(_str: string,_len: number): string {
			return _str.substring(0, _len+1) + '...';
	}

	//获取get参数
	public getQueryString(name:string) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return decodeURI(r[2]); return null;
	}
}

