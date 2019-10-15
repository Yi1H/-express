var express = require("express");
var http = require("http");
var app = express();

app.use(function(request, response, next) {
    console.log("In comes a " + request.method + " to " + request.url);
    next();
});
app.use(function(request, response, next) {
    var minute = (new Date()).getMinutes();
    // 如果在这个小时的第一分钟访问，那么调用next()继续
    if ((minute % 2) === 0) {
        next();
    } else {
        // 如果没有通过验证，发送一个403的状态码并进行响应
        response.statusCode = 403;
        response.end("Not authorized.");
    }
});
app.use(function(request, response) {
    response.end('Secret info: the password is "swordfish"!'); // 发送密码信息
});


http.createServer(app).listen(3000); 

console.log('http://127.0.0.1:3000');
