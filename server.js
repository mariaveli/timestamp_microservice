// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const requestIp = require('request-ip');


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
var clientIp;
// http://expressjs.com/en/starter/basic-routing.html
app.get("/api/whoami",function(req,res,next){
    // inside middleware handle
         clientIp = requestIp.getClientIp(req);
        next();

}, function (req, res) {

    // res.json(req.headers);
   res.json({'ipaddress': clientIp,'language': req.headers['accept-language'], 'software':req.headers['user-agent'] });

});


// your first API endpoint... 
app.get("/api/timestamp/:date_string?", function (req, res) {
    var date;
    if(req.params.date_string === undefined){
         date = new Date();
    }else{
        if(isNaN(req.params.date_string)){
             date = new Date(req.params.date_string);

        }else{
             date = new Date(parseInt(req.params.date_string));
        }
    }
    res.json({'utc': date.toUTCString(), 'unix': date.getTime()});

});



// listen for requests :)
var listener = app.listen(3000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});