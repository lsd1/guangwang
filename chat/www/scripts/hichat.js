/*
 *抽奖
 */
var status = false,
 that,
 phone = [],
 td,
 phonenum,
 list,
 lottery_type = '';//抽奖类型。1：一等奖；2：二等奖；3：三等奖；4：四等奖。
window.onload = function() {
    var hichat = new HiChat();
    hichat.init();
    (function () {
        if(document.documentElement.clientWidth<500){
            document.documentElement.style.fontSize = '16px';
        }else{
            document.documentElement.style.fontSize = '25px';
        }
    })();
};
var HiChat = function() {
    this.socket = null;
};
HiChat.prototype = {
    init: function() {
        that = this;
        this.socket = io.connect();
        //获取抽奖名单
        this.socket.on('sendData', function(arg_phone,arg_td,arg_status,arg_lottery_type,arg_list) {
			console.log('链接成功！');
            lottery_type = arg_lottery_type;
            phone = arg_phone;
			td = arg_td;
			status = arg_status;
			lottery_type = arg_lottery_type;
			list = arg_list;
            console.log(arg_phone);
            console.log(arg_td);
            console.log(arg_status);
            console.log(arg_lottery_type);            
			console.log(arg_list);
			if(td<1){
			    $(" #btn_replay").show();
            }else{
                $(" #btn_replay").hide();
            }
            if(arg_status){//连上服务器之后如果抽奖状态为1，则说明抽奖进行中，立即启动抽奖。
                start();
            }
			//刚联接上就更新获奖列表
			if(arg_list){
                //获取最新中奖号码显示出来。
                last_phone = arg_list.split("</p>")[0].split(':')[1];
            }else{
                //如果还没有中奖结果则显示为000...
                last_phone = '000000';
            }
            document.getElementById('last_phone').innerHTML = last_phone;
            document.getElementById('luck_list').innerHTML = arg_list;
        });
        var patt = /admin/;
        var res = patt.test(window.location.pathname);
        if(res){
            that.socket.emit('isAdmin','');
        }
        //单点登录
        this.socket.on('close',function(){
            shut();
        });
       
        //捕获服务器抽奖事件。
		this.socket.on('running', function(arg_type,arg_td,arg_phone,arg_phonenum,arg_lottery_type) {
			console.log(arg_type);
			console.log(arg_td);
			console.log(arg_phone);
			console.log(arg_phonenum);			
			console.log(arg_lottery_type);
			lottery_type = arg_lottery_type;
            if(arg_type == 'start'){
                start();
            }else if(arg_type == 'stop'){
				td = arg_td;
				phone = arg_phone;
                phonenum = arg_phonenum;
                show();
            } 
        });
		//清空抽奖列表，重新开始。
		document.getElementById('btn_replay').addEventListener('click',function(){
		    //清空抽奖列表，抽奖人数，抽奖状态。
            that.socket.emit('reStart','');
        });
        //上传抽奖列表，重新开始。
        /*document.getElementById('btn_check').addEventListener('click',function(){
            var td = document.getElementById('count').value;
            var text = document.getElementById('userlist').value;
            if (text == "") return;
            var temp_text = text.split("\n");
            var target = new Array();
            var rever_target = new Array();
            for (var i = 0; i < temp_text.length; i++) {
                if (temp_text[i] != "") {
                    target.push(temp_text[i]);
                }
            }
            lottery_type = document.getElementById('lottery_type').value;
            that.socket.emit('getData',target,td,false,lottery_type,zd,'');
        });*/
	}
};
function showTips(tip){
    $(".con").html(tip);
    $(".showTips").show();
    setTimeout(function(){
        $(".showTips").hide();
    },1500);
}
