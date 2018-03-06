const express = require('express');
const request = require('request');
const fs = require('fs');
const weather_file = require('./weather.js');

var place = 'Folwark Leszczynowka';

var app = express();
var weather = ''; //variable to hold the weather info

app.use(express.static(__dirname + '/public'));

// here add routeswindow.location.href = "http://localhost:8080/about.html";
app.get('/',(request, response) =>{
	fs.readFile(__dirname+ '/public/mainPage.html', 'utf8', (err, text)=>{
		response.send(text);
	});
});

app.get('/weather', (request,response) =>{
	response.send(weather);
});

app.listen(8080, () => {
    console.log('Server is up on the port 8080');
    // here add the logic to return the weather based on the statically provided location and save it inside the weather variable
    weather_file.geocode(place).then((result) => {
		return weather_file.weather(result.lat, result.lng);
	}).then((result)=>{
		weather = result;
	}).catch((error)=>{
		console.log(error)
	})
});