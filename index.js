// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

console.log(new Date())

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:date", function(req, res) {
  let dateObject;
  if (/^\d{5,}$/.test(req.params.date)) {
    dateObject = new Date(parseInt(req.params.date));
  } else {
    dateObject = new Date(req.params.date);
  }
  if (dateObject.toString() != "Invalid Date") {
    let dateJSON = {
      "unix": dateObject.valueOf(),
      "utc": dateObject.toUTCString()
    };
    console.log(req.params.date, dateObject, dateJSON);
    res.json(dateJSON);
  } else {
    res.json({ "error": "Invalid Date" });
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
