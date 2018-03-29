class Common {
	private static share:Common = null;
	public static Shared(){
		if(this.share == null){
			this.share = new Common();
		}
		return this.share;
	}

	//秒数转化为倒计时
	public secondToTime(second:number,type?:number){
		if(!type) type = 3;
		var t:string = '';
		if(second > -1){
			var hour:any = Math.floor(second/3600);
			var min:any = Math.floor(second/60) % 60;
			var sec:any = second % 60;
			
			if(hour < 10 ){hour = '0'+ hour.toString();}
			if(min < 10){min = "0" + min.toString();}
			if(sec < 10){sec = "0" + sec.toFixed(0).toString();}
			var timeArr = [hour,min,sec];
			for(var i = 0; i < type; i++){
				t += t == '' ?  timeArr[i] : ':' + timeArr[i];
			}	
		}
		return t;
	}

	//创建圆形遮罩图片
	public createCircleMask(width:number, height:number, source:string, x?:number, y?:number){
		var group:eui.Group = new eui.Group();
		x =  x > 0 ? x : 0;
		y =  y > 0 ? y : 0;
		var image = this.createImage(width, height, source, x, y);
		var circle:egret.Shape = new egret.Shape();
		circle.graphics.beginFill(0x000000, 1);		
		circle.graphics.drawCircle(width/2+x, width/2+y, width/2);
		image.mask = circle;
		group.addChild(circle);
		group.addChild(image);
		return group;
	}

	//创建一张图片
	public createImage(width:number, height:number, source:string, x?:number, y?:number){
		var image:eui.Image = new eui.Image();
		image.width = width;
		image.height = height;
		image.x = x > 0 ? x : 0;
		image.y = y > 0 ? y : 0;
		image.source = source;
		return image;
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

}