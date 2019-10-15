var express = require('express');
var path = require('path');
var fs = require('fs');
var url = require('url');
var logger = require('morgan');

var app = express();
//获取请求用户的日志
app.use(logger("short"));
//响应用户，设置静态文件中间件
var staticpath = path.join(__dirname + "/statics");
app.use(express.static(staticpath));
//文件找不到时，设置404中间件
app.use(function (req,res) {
    res.status(404);
    res.end("the file not find")
});
//监听3001端口，启动服务器
app.listen(3001,function (req,res) {
    console.log("App started on port 3000");
    console.log("http://127.0.0.1:3001")
});
