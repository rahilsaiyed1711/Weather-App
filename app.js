const { log } = require("console");
const express= require("express");
const https=require("https");
const { stringify } = require("querystring");
const bodyParser =require("body-parser")
const app = express();

app.use(bodyParser.urlencoded({extended:true}));




app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
    
})
app.post("/",function(req,res){
    console.log(req.body.cityName);
const query=req.body.cityName
const appid="3c5d9f49e982c55604ba880b9ec2dcca"
const unit="metric"
const url="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+appid+"&units="+unit+""
//const url="https://api.openweathermap.org/data/2.5/weather?q=ahmedabad&appid=3c5d9f49e982c55604ba880b9ec2dcca&units=metric"
https.get(url,function(response){
    console.log(response.statusCode)
    response.on("data",function(data){
        const weatherData= JSON.parse(data)
        console.log(weatherData)
        const temp=weatherData.main.temp
        const description=weatherData.weather[0].description
        const icon=weatherData.weather[0].icon
        const imgURL="https://openweathermap.org/img/wn/"+icon+"@2x.png"
        res.write("<h1>the current weather in "+query+" is :"+temp+" degree celcius</h1>");
        res.write("<h1>the description shows that the weather is about to experiance :"+description+"</h1>")
        res.write("<img src="+imgURL+">")
        res.send()
        
        
      //  console.log(JSON.stringify(data));
    })
})


    
})






app.listen(3000,function(){
    console.log("the server is running on port 3000");
})