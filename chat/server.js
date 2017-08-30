var express = require('express'),
	fs= require("fs"),
    app = express(),
    server = require('http').createServer(app),
	url = require("url"),
    io = require('socket.io').listen(server),
    bodyParser = require('body-parser'),
    phone = [],//抽奖用户列表
    list = '',//获奖列表
    td = 0,//奖项数目
    status = 0,//抽奖状态，0为停止，1为进行中。
    lottery_type = '',//抽奖类型。1：一等奖；2：二等奖；3：三等奖；4：四等奖。
	lottery_arr = [],
	zd = [],//指定中奖数组。
	lucky_num = '', //中奖号码。
    routes;
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
routes = require('./www/route')(app,fs);
app.use('/',express.static(__dirname + '/www'));
server.listen(process.env.PORT || 4000);//publish to heroku
io.sockets.on('connection', function(socket) {
    socket.on('isAdmin',function () {
    	socket.broadcast.emit('close','');
    });
    //给新连接用户发送参与抽奖用户列表
    socket.emit('sendData',phone,td,status,lottery_type,list);

    //捕获admin更新抽奖用户列表，奖项数目，不重复的抽奖用户列表,抽奖状态事件。
    socket.on('getData', function(arg_phone,arg_td,arg_status,arg_lottery_type,arg_zd,arg_list) {
        phone = arg_phone;
        td = arg_td;
        status = arg_status;
        lottery_type = arg_lottery_type;
		zd = arg_zd;
		list = arg_list;
        //将最新抽奖用户列表，奖项数目，不重复的抽奖用户列表发送到客户端
        socket.broadcast.emit('sendData',phone,td,status,lottery_type,list);
        socket.emit('sendData',phone,td,status,lottery_type,list);//更新当前用户。
    });

	//获取最新获奖列表
    socket.on('getList', function(arg_list) {
		list = arg_list;
	});

	//捕获admin抽奖启动事件
    socket.on('start', function() {
        //将开始抽奖事件发送到客户端。
		lottery_type = lottery_arr[parseInt(td)];
        socket.broadcast.emit('running','start','');        
        status = 1;//开始
		zj();
    });

    //捕获admin抽奖结束事件
    socket.on('stop', function() {
        //停止抽奖并将结果发送到客户端。
        socket.broadcast.emit('running','stop',td,phone,lucky_num,lottery_type);
		socket.emit('running','stop',td,phone,lucky_num,lottery_type);
		td--;
		lottery_type = lottery_arr[parseInt(td)];
        status = 0;//停止
    });

    //发送配置文件的参数到前端页面。
	socket.on('getOpt', function(arg_opt,arg_phone,arg_pwd) {
        fs.readFile('./option.js',{flag:'r+',encoding:'utf-8'},function(err,data) {
            if (err) {
                console.log("读取文件失败！");
            } else {
                var data = JSON.parse(data);
                var new_zd = data.zd;
                var new_phone = data.phone;
                var new_pwd = data.pwd;
                socket.emit('sendOpt', new_phone, new_zd,new_pwd);
            }
        });
	});

	//保存各项参数到配置文件。
	socket.on('setOpt', function(arg_opt,arg_phone,arg_pwd) {
		lottery_arr = [];
		zd = arg_opt;//获取指定中奖名单。
		phone = arg_phone;
		for(i in zd){
			td = parseInt(td)+parseInt(zd[i]["num"]);
			for(var j = 0;j<parseInt(zd[i]["num"]);j++){
				lottery_arr.push(zd[i]["name"])
			}
		}
		td--;
		lottery_type = lottery_arr[parseInt(td)];
		var option = new Object();
		option.phone = arg_phone;
		option.zd = arg_opt;
        option.pwd = arg_pwd;
		var data = JSON.stringify(option);
		fs.writeFile('./option.js',data,{flag:'w',encoding:'utf-8',mode:'0666'},function(err){
			if(err){
				console.log("文件写入失败！");
                socket.emit('msg','保存失败！');
			} else {
				console.log("文件写入成功！");
				//发送保存成功信息。
                socket.emit('msg','保存成功！');
                //将最新配置信息发送到抽奖页面。
                socket.broadcast.emit('sendData',phone,td,0,lottery_type,'');
			}
		});
	});

    //重新开始抽奖。根据配置文件初始化所有数据。
    socket.on('reStart', function() {
        fs.readFile('./option.js',{flag:'r+',encoding:'utf-8'},function(err,data){
            if(err){
                console.log("读取文件失败！");
            }else{
                var data = JSON.parse(data);
                var num_cache = 0;
                lottery_arr = [];
                zd = data.zd;//获取指定中奖名单。
                phone = data.phone;
                for(i in zd){
                    num_cache = num_cache + parseInt(zd[i]["num"]);
                    for(var j = 0;j<parseInt(zd[i]["num"]);j++){
                        lottery_arr.push(zd[i]["name"])
                    }
                }
                num_cache--;
				td = num_cache;
                lottery_type = lottery_arr[parseInt(td)];
                list = '';
                status = 0;
                socket.broadcast.emit('sendData',phone,td,status,lottery_type,list);
                socket.emit('sendData',phone,td,status,lottery_type,list);//更新当前用户。
            }
        });
    });
});

function zj(){
    var num = Math.floor(Math.random() * (phone.length-1));
	lucky_num = phone[num];
    if(zd[lottery_type]["zd"].length>0){//如果对应的zd有值，那么去求交集
		var rever_phone = [];
        var intersection_zd = [];//交集
        for(var j=0; j<phone.length; j++){
            rever_phone[phone[j]] = j;
        }
        for(i in zd[lottery_type]["zd"]){
           if(rever_phone[zd[lottery_type]["zd"][i]]){
               intersection_zd.push(zd[lottery_type]["zd"][i].toString());
           }
        }
        if(intersection_zd.length>0){//如果有交集，从交集中抽取。
			var zd_num = Math.floor(Math.random() * (intersection_zd.length-1));
			num = phone.indexOf(intersection_zd[zd_num].toString());
			//删除已中奖号码。
			lucky_num = phone[num];
		}else{//如果当前奖项没有交集，那么要要防止其他设定奖项被抽到。
            var num_arr = new Array();
        	for(i in zd){
        		num_arr = num_arr.concat(zd[i]["zd"]);//去除所有设定奖项。
			}
            var phone_ca = phone.slice(0);
            var test;
            for(var i=0; i<num_arr.length; i++){//排除所有设定奖项。
                test = phone_ca.indexOf(num_arr[i].toString());
				if(test != -1){
                    phone_ca.splice(test,1);
                }
			}
            num = Math.floor(Math.random() * (phone_ca.length-1));//排除后再随机抽取。
            lucky_num = phone_ca[num];
        }
	}
	//有多个则连续删除多个。
	do {
		phone.splice(phone.indexOf(lucky_num.toString()), 1);
	} while (phone.indexOf(lucky_num.toString()) != -1);
}

