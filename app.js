const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }))
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
})
app.post("/", function(req, res) {
    const query = req.body.cityName;
    const apiKey = "b2f318d42d6e5227f104e9f40963abc2";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&APPID=" + apiKey + "&units=" + unit;
    https.get(url, function(response) {
        console.log(response);
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            console.log(weatherData);
            console.log(temp);
            console.log(weatherDescription);
            res.write("<h1>The temperature in " + query + " is: " + temp + " degrees Celcius.</h1>");
            res.write("<p>The Weather is currently: " + weatherDescription + "</p>");
            res.write("<img src=" + imageURL + ">");
            res.send()
        })
    })
})








app.listen(3000, function() {
    console.log("server is running in port 3000");
})