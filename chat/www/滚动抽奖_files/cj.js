var xinm = new Array();

var phone = [1,2,3,4,5,6,7,8,9,0];

var nametxt = $('.name');
var phonetxt = $('.phone');
var pcount = phone.length - 1;//参加人数
var runing = true;
var td = 10;//内定中奖,从最小奖开始，共10个名额
var num = 0;
var t;

//开始停止
function start() {


    if (phone.length > 2) {

        pcount = phone.length - 1;
    }else{
        alert("待抽奖号码太少了");
        return;
    }

    if(td<=0){
        alert("奖项已抽取完毕");
        return;
    }

    if (runing) {
        runing = false;
        $('#btntxt').removeClass('start').addClass('stop');
        $('#btntxt').html('停止');
        startNum();

        $('#sound_play')[0].play();
    } else {
        runing = true;
        $('#btntxt').removeClass('stop').addClass('start');
        $('#btntxt').html('开始');
        stop();
        zd();//内定中奖

        $('#sound_play')[0].pause();
    }
}
//循环参加名单
function startNum() {
    num = Math.floor(Math.random() * pcount);
    //nametxt.html(xinm[num]);
    var target = phone[num];
    if (target == undefined) {
        startNum()
    }
    phonetxt.html(target);
    t = setTimeout(startNum, 0);
}
//停止跳动
function stop() {
    //pcount = xinm.length - 1;
    pcount = phone.length - 1;
    clearInterval(t);
    t = 0;
}
//从一等奖开始指定前3名
function zd() {
    /*
     if (td <= 3) {
     if (td == 1) {
     nametxt.html('周一一');
     phonetxt.html('15112345678');
     $('.list').prepend("<p>" + td + ' ' + "周一一 -- 15112345678</p>");
     }
     if (td == 2) {
     nametxt.html('李二二');
     phonetxt.html('151000000000');
     $('.list').prepend("<p>" + td + ' ' + "李二二 -- 151000000000</p>");
     }
     if (td == 3) {
     nametxt.html('张三三');
     phonetxt.html('1511111111');
     $('.list').prepend("<p>" + td + ' ' + "张三三 -- 1511111111</p>");
     }
     } else if (td > 3) {


     }
     */

    //打印中奖者名单
    //$('.list').prepend("<p>" + td + ' ' + xinm[num] + " -- " + phone[num] + "</p>");

    $('.list').prepend("<p>" + td + ' ' + " -- " + phone[num] + "</p>");

    td = td - 1;



    //将已中奖者从数组中"删除",防止二次中奖
    //xinm.splice($.inArray(xinm[num], xinm), 1);
    phone.splice($.inArray(phone[num], phone), 1);

    var result = phone.join("\n");

    $("textarea").val("").val(result);

    if (pcount <= 0 || td <= 0) {
        setTimeout(function(){

            alert("开奖结束");
        },1000);
        //$("textarea").val("");
        pcount = new Array();

        //return ;
    }
}
