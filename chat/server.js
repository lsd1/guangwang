var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    users = [];

app.use('/', express.static(__dirname + '/www'));

server.listen(3000);//publish to heroku

io.sockets.on('connection', function(socket) {
	console.log('ok');
    //new user login
    socket.on('login', function(nickname) {
        if (users.indexOf(nickname) > -1) {
            socket.emit('nickExisted');
        } else {
            //socket.userIndex = users.length;
            socket.nickname = nickname;
            users.push(nickname);
            socket.emit('loginSuccess');
            io.sockets.emit('system', nickname, users.length, 'login');
        };
    });
    //user leaves
    socket.on('disconnect', function() {
        if (socket.nickname != null) {
            //users.splice(socket.userIndex, 1);
            users.splice(users.indexOf(socket.nickname), 1);
            socket.broadcast.emit('system', socket.nickname, users.length, 'logout');
        }
    });
    //new message get
    socket.on('postMsg', function(msg, color) {
        socket.broadcast.emit('newMsg', socket.nickname, msg, color);
    });
	//¿ªÊ¼³é½±
    socket.on('begin', function(msg, color) {
        socket.broadcast.emit('begin', socket.nickname, msg, color);
    });
	//½áÊø³é½±
    socket.on('stop', function(msg, color) {
        socket.broadcast.emit('stop', socket.nickname, msg, color);
    });
});

