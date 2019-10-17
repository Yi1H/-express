//在示例中需要使用的 Node 类库有：Express、ForecastIO （用于获取天气数据）、Zippity-do-dah （ 将ZIP编码转为纬度/经度 ）、EJS 模版引擎。
//例程序用到 jQuery 和名为 Pure 的 CSS 框架。最后，你需要去 Forecast.io 官网 注册开发账号获取 API 接口密钥。

var path = require('path');
var express = require('express');
var zipdb = require("zippity-do-dah");
var ForecastIo = require("forecastio");

var app = express();
var weather = new ForecastIo("你的FORECAST.IO的API密钥");

app.use(express.static(path.resolve(__dirname,'public')));
app.set("views",path.resolve(__dirname,'views'));
app.set("view engine","ejs");

app.use('/',function (req,res) {
    res.render("index")
});

app.get(/^\/(\d{5})$/, function(req, res, next) {
    var zipcode = req.params[0];
    var location = zipdb.zipcode(zipcode);
    if (!location.zipcode) {
        next();
        return;
    }
    var latitude = location.latitude;
    var longitude = location.longitude;
    weather.forecast(latitude, longitude, function(err, data) {
        if (err) {
            next();
            return;
        }
        res.json({
            zipcode: zipcode,
            temperature: data.currently.temperature
        });
    });
});


app.use(function (req,res) {
    res.status(404).render("404")
});

app.listen(3005,function (req,res) {
    console.log("app started on port 3005");
    console.log("http://127.0.0.1:3005")
});
