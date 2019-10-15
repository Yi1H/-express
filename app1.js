var express = require("express");
var logger = require("morgan");
var http = require("http");
var app = express();
app.use(logger());
app.use(function(request, response){
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello, world!");
});
http.createServer(app).listen(3000);
console.log('http://127.0.0.1:3000');
