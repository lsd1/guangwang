var nametxt = $('.name'),
    phonetxt = $('.phone'),
    pcount = phone.length - 1,//参加人数
    running = true,//抽奖状态
    num,
    t,//定时器
    phone = [];//抽奖列表

function action(){
    if(running){
        start();
    }else{
        stop();
    }
}

//开始停止
function start() {
    if (phone.length > 2) {
        pcount = phone.length - 1;
    }else{
        showTips("待抽奖号码太少了");
        return;
    }
    if(td<0){
        showTips("奖项已抽取完毕");
        return;
    }
    running = false;
    $('#btntxt').removeClass('start').addClass('stop');
    $('#btntxt').html('停止');
    that.socket.emit('start');
    startNum();
    $('#sound_play')[0].play();
}

//循环参加名单
function startNum() {
	num = Math.floor(Math.random() * (phone.length-1));
    var target = phone[num];
    if (target == undefined) {
        startNum();
    }
    phonetxt.html(target);
    t = setTimeout(startNum, 50);
}

//停止跳动
function stop() {
	that.socket.emit('stop',td,phonenum);
}

//打印中奖者名单
function show() {
	clearInterval(t);
    t = 0;
    phonetxt.html(phonenum);
    running = true;
    $('#btntxt').removeClass('stop').addClass('start');
    $('#btntxt').html('开始');
    $('.list').prepend("<p>" + lottery_type + ":" + phonenum + "</p>");
    that.socket.emit('getList',$('.list').html());
    var result = phone.join("\n");
    $("textarea").val("").val(result);
    if (pcount <= 0 || td < 0) {
        $("#btn_replay").show();
        setTimeout(function(){
            showTips("开奖结束");
        },1000);
        pcount = new Array();
    }
}

function shut() {
    window.location.href="about:blank";
    window.close();
}

