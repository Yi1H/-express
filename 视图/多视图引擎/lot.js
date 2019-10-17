var express = require("express");
var ejs = require("ejs");
var path = require("path");

var app = express();

app.locals.appName = "Sorry,Yi";
app.set("view engine","jade");
app.set("views",path.resolve(__dirname,"views"));
app.engine("html",ejs.renderFile);

app.use(function (req,res,next) {
    res.locals.userAgent = req.headers["user-agent"];
    next()
});

app.get("/about",function (req,res) {
    res.render("about",{
        country: "CN"
    })
});

app.get("/contact",function (req,res) {
    res.render("contact.ejs",{contact:"please contact"})
});

app.use(function (req,res) {
    res.status(404).render("404.html",{
        urlAttempted: req.url
    })
});

app.listen(3007);
console.log("http://127.0.0.1:3007");
