module.exports = function(app,fs){
    var pwd,code = Math.ceil((Math.random())*1000000);
    //获取登录密码。
    function getPwd(){
        var data = JSON.parse(fs.readFileSync('./option.js','utf-8'));
        pwd = data.pwd;
    }
    app.get('/opt.html', function(req,res,next){
        if(req.query.pwd != code){
            res.redirect('/login.html');
        }
        code = Math.ceil((Math.random())*1000000);
        next();
    });
    app.post('/opt.html', function(req,res,next){
        code = Math.ceil((Math.random())*1000000);
        getPwd();
        if(req.body.pwd == pwd) {
            res.redirect('/opt.html?pwd='+code);
        }else{
            res.redirect('/login.html?msg=pwderr');
        }
        next();
    });
    app.get('/admin.html', function(req,res,next){
        if(req.query.pwd != code){
            res.redirect('/login.html');
        }
        code = Math.ceil((Math.random())*1000000);
        next();
    });
    app.post('/admin.html', function(req,res,next){
        code = Math.ceil((Math.random())*1000000);
        getPwd();
        if(req.body.pwd == pwd) {
            res.redirect('/admin.html?pwd='+code);
        }else{
            res.redirect('/login.html?msg=pwderr');
        }
        next();
    });
}
