const express = require("express");
const app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended : true}));






app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html")
})


app.post("/",function(req,res){
  const https = require("https");
  const query = req.body.cityname;
  const url = "https://api.openweathermap.org/data/2.5/find?q=" + query  + "&appid=eff6b18392e01c98d8cd4c358a18974d";
  https.get(url,function(response){
    response.on("data",function(data){
      const object = JSON.parse(data);
      const weather = object.list[0].weather[0].main;
      
      res.write("<h1>The weather for" + query + " is " + weather + "</h1>");
      res.send()
    })
  })


})






app.listen(3000);
