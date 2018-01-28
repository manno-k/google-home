googlehome = require('./google-home-notifier');
var language = 'ja'; // if not set 'us' language will be used
var http = require('http');
var location = "Takasago,JP";
var units = 'metric';
var APIKEY = "455523b5aeec732d8a111bb4002a54ca";
var URL = 'http://api.openweathermap.org/data/2.5/weather?q='+ location +'&units='+ units +'&appid='+ APIKEY;

googlehome.device('Google-Home', language);
googlehome.ip('192.168.179.4');

http.get(URL, function(res) {
  var body = '';
  res.setEncoding('utf8');
  res.on('data', function(chunk) {
  body += chunk;
 });

 res.on('end', function(chunk) {
 res = JSON.parse(body);
 temp = res.main.temp;
 weather = res.weather[0].main;

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
    //今日の日付データを変数hidukeに格納
    var date = new Date(); 

    //年・月・日・曜日を取得する
    var month = date.getMonth()+1;
    var week = date.getDay();
    var day = date.getDate();
    var yobi= new Array("日","月","火","水","木","金","土");

    days =  month + "月" + day + "日 " + yobi[week] + "曜日";


   talk = "おはようございます。今日は" + days +  "。天気は" + weather_result + "です。気温は" + temp + "度です。";

 try {
  googlehome.notify(talk, function(notifyRes) {
  console.log(notifyRes);
  console.log(talk);
 });
 } catch(err) {
   console.log(err);
 }
});
}).on('error', function(e) {
 console.log(e.message);
});

