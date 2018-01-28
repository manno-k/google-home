const googlehome = require('./google-home-notifier');
const request = require('request');
var http = require('http');
var location = "Takasago,JP";
var units = 'metric';
var APIKEY = "455523b5aeec732d8a111bb4002a54ca";
var URL = 'http://api.openweathermap.org/data/2.5/weather?q='+ location +'&units='+ units +'&appid='+ APIKEY;
var ip = '192.168.179.4'; 

googlehome.device(ip, 'ja');
http.get(URL, function(res) {
var body = '';
res.setEncoding('utf8');
res.on('data', function(chunk) {
  body += chunk;
 });
res.on('end', function(chunk) {
  res = JSON.parse(body);
  temp = res.main.temp;
  weather = res.weather[0].main; // 天気を表示したい場合
  if (weather == "Clear") {
     weather_result = "晴れ";
    }else if (weather == "Clouds") {
     weather_result = "曇り";
    }else if (weather == "rain") {
     weather_result = "雨";
    }else if(weather == "snow"){
     weather_result = "雪";
    }else{
     weather_result = "エラー";
    }
    console.log("今日の天気は" + weather_result + "です。気温は"+temp + "度です。");

 googlehome.notify("今日の天気は" + weather_result + "です。気温は"+temp + "度です。", function(res) {
  console.log(res);
});
});
  }).on('error', function(e) {
        console.log(e.message);
     });

