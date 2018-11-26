// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');



app.use(bodyParser.urlencoded({extended: 'false'}));
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/myapp');


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.use(require('./controllers/whoami'));
app.use(require('./controllers/timestamp'));
app.use(require('./controllers/urlShortener'));



// listen for requests :)
var listener = app.listen(3000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});