var express = require('express');
var path = require('path');
var fs = require('fs');
var url = require('url');

var app = express();
//获取请求用户的日志
app.use(function (req,res,next) {
    console.log("Request IP:"+req.ip);
    console.log("Request date:"+new Date());
    next();
});
//响应用户，打开用户url需要的文件
app.use(function (request,response,next) {
   // var pathfile = path.join(__dirname+'/statics'+request.url);
    var paths = url.parse(request.url).pathname;
    console.log(paths);
    fs.stat(__dirname+'/statics'+paths,function (err,fileInfo) {
        if (err){
            next(next());
            return;
        }
        if (fileInfo.isFile()){
            response.sendFile(__dirname+'/statics'+paths);
        }else{
            next(next());
        }
    })
});
//文件找不到时，设置404中间件
app.use(function (req,res) {
    res.status(404);
    res.send("the file not find")
});
//报错中间件
app.use(function (err,req,res,next) {
    console.log(err);
    res.status(500).send('Something broke!');
    //next(err);
});
//监听3000端口，启动服务器
app.listen(3000,function () {
    console.log("App started on port 3000");
    console.log('http://127.0.0.1:3000')
});
