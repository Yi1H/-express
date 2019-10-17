var express = require("express");
var path = require("path");
var app = express();

app.set("view engine", "ejs");

app.set("views", path.resolve(__dirname, "views"));

app.get("/", function(req, res) {
    res.render("index");
});

app.listen(3008);
console.log("http://127.0.0.1:3008");
