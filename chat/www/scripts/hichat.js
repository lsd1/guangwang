/*
 *hichat v0.4.2
 *Wayou Mar 28,2014
 *MIT license
 *view on GitHub:https://github.com/wayou/HiChat
 *see it in action:http://hichat.herokuapp.com/
 */
window.onload = function() {
    var hichat = new HiChat();
    hichat.init();
};
var HiChat = function() {
    this.socket = null;
};
HiChat.prototype = {
    init: function() {
        var that = this;
        this.socket = io.connect();
        this.socket.on('connect', function() {
            console.log('connect!');
        });
        this.socket.on('nickExisted', function() {
            console.log('nickExisted!');
        });
        this.socket.on('loginSuccess', function() {
            console.log('loginSuccess!');
        });
        this.socket.on('error', function(err) {
			console.log('error!');

        });
        this.socket.on('system', function(nickName, userCount, type) {
  			console.log('system!');
        });
        this.socket.on('newMsg', function(user, msg, color) {
            console.log('newMsg!');
        });
		 this.socket.on('begin', function(user, msg, color) {
			console.log('newMsg!');
            start();
        });
        this.socket.on('newImg', function(user, img, color) {
            console.log('newImg!');
        });
		//¿ªÊ¼³é½±
		document.getElementById('btntxt').addEventListener('click', function() {
				that.socket.emit('begin', 1);
		}, false);
	}
};
