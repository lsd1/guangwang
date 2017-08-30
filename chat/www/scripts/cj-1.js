var nametxt = $('.name'),
 phonetxt = $('.phone'),
 running = true,
 num,
 t,//定时器
 counts = 0;

//开始停止
function start() {
    if(running == false ){
        return false;
    }
    running = false;
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
    t = setTimeout(startNum, 0);
}
//停止跳动,打印中奖者名单
function show() {
	running = true;
    clearInterval(t);
    t = 0;
	phonetxt.html(phonenum);
    $('.list').prepend("<p>" + lottery_type + ":" + phonenum + "</p>");
	if(td  <= 0){
		setTimeout(function(){
            showTips("开奖结束");
        },1000);
	}
}
//查询抽奖概率。
function search(){
    var maiguo_num = $('#maiguo_num').val();
    if(maiguo_num == ''){showTips('请输入查询号码!');return false;}
    var allcounts = phone.length;
    if(allcounts == 0){
        showTips('抽奖还未开始！不能查询！');return false;
    }else{
        for(i in phone){
            if(phone[i] == maiguo_num){
                counts++;
            }
        }
        if(counts == 0){
            showTips('0次');
            return false;
        }
    }
    showTips(counts.toString()+'次');
    counts = 0;
}
function shut() {
}


