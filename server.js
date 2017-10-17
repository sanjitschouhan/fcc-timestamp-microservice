// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();


var months = ['January', 'February', 'March','April','May','June',
              'July','August','September','October','November','December']

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/*", function (request, response) {
  
  var input = unescape(request.path.substr(1));
  if (!isNaN(input))
    input = Number(input)*1000
  var date = new Date(input)
  
  var dateString = months[date.getMonth()]+' '+date.getDate()+', '+date.getFullYear();
  if(!date.getTime())
    dateString=null;
  
  var output = {
    unix: date.getTime()/1000,
    natural: dateString
  };
  response.end(JSON.stringify(output))
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
