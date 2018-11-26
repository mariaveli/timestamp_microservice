
var express = require('express')
    , router = express.Router();
var shortenedUrl = require(process.cwd() + '/models/shortenedUrl.js');


router.get('/api/shorturl/:id', function (req, res) {
    shortenedUrl.shortenedUrlModel.findById(req.params.id, function(err, done){
        if(err){
            res.json({"error": "ShortUrl Not Found"}, 422);
        }else{
            res.redirect(done.url);

        }
    });
});
router.post('/api/shorturl/new', function (req, res) {
    //TODO: valid url
    shortenedUrl.validate(req.body.url, function (err, data) {
        if (err) {
            res.json({"error": err.message}, 422);
        }
        shortenedUrl.shortenedUrlModel.findOneOrCreate({url: req.body.url}, function (err, data) {
            if (err) {
                throw err;
            }
            res.json({'original_url': data.url, 'short_url': data.id});
        });
    });
});


//TODO: ;


router.get('/shorturl', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

module.exports = router;