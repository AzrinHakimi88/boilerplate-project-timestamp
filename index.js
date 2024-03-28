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
  const { date } = req.params;

  if(!date){
    res.json({'unix': new Date().getTime(), 'utc' : new Date().toGMTString()})
  }

  
  
  if (date.includes('-')) { // Check if it's a date string
    const validDate = new Date(date);
    if(isNaN(validDate)){
      res.json({'error' : 'Invalid date'})
    }
    const unix = new Date(date).getTime(); // Get Unix timestamp in milliseconds
    const utc = new Date(unix).toUTCString(); // Convert Unix timestamp to UTC string
    res.json({ 'unix': unix, 'utc': utc });
  } else {
    const unix = parseInt(date); // Parse Unix timestamp from string to integer
    const utcDate = new Date(unix); // Convert Unix timestamp to milliseconds

    const utc = utcDate.toUTCString(); // Convert date to UTC string
    res.json({ 'unix': unix, 'utc': utc });
    
  }
});




app.get('/api/')


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
