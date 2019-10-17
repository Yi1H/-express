var express = require("express");

var apiVersion1 = require("./api1.js");
var apiVersion2 = require("./api2.js");
var app = express();

app.use("/v1", apiVersion1);
app.use("/v2", apiVersion2);
app.listen(3009, function() {
    console.log("App started on port 3009");
    console.log("http://127.0.0.1:3009");
});
