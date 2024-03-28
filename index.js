// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get('/api/:date?', (req, res) => {
  let dateInput = req.params.date;

  // If date parameter is empty, use current time
  if (!dateInput) {
    res.json({'unix': new Date().getTime(), 'utc': new Date().toUTCString()})
    return;
  }

  if (!isNaN(dateInput)) { // Check if it's a Unix timestamp
    const unix = parseInt(dateInput); // Convert seconds to milliseconds
    const utc = new Date(unix).toUTCString();
    res.json({ unix: unix, utc: utc });
    return;
  }

  const date = new Date(dateInput);

  // Check if the date is invalid
  if (isNaN(date.getTime())) {
    res.json({ error: "Invalid Date" });
    return;
  }

  const unix = date.getTime();
  const utc = date.toUTCString();
  res.json({ unix: unix, utc: utc });
});







app.get('/api/')


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
