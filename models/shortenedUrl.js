var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var dns = require('dns');
const {URL} = require('url');

var Schema = mongoose.Schema;
var shortenedUrlSchema = new Schema({

    url: {type: String, required: true}
});

shortenedUrlSchema.statics.findOneOrCreate = function findOneOrCreate(condition, callback) {
    const self = this;
    self.findOne(condition, (err, result) => {
        return result ? callback(err, result) : self.create(condition, (err, result) => { return callback(err, result) })
    })
};

// this is an instance of the model
var shortenedUrl = mongoose.model('shortenedUrl', shortenedUrlSchema);

// Creating functions  here, and i will just call them in urlShortener.js
exports.firstOrCreate = function (url) {
// TODO: tsekarw an to findByUrl epistrefei obj, tote na epistrepsw to obj. alliws an epistrepsei null, na dimiourgisw allo.

};
exports.shortenedUrlModel = shortenedUrl;
exports.findByUrl = function (url) {
    shortenedUrl.findOne({url: url}).exec(function (err, shortenedUrl) {


    });
};

// Creating functions  here, and i will just call them in urlShortener.js
exports.create = function (url, done) {
    const newUrl = new shortenedUrl({
        url: url
    });
    newUrl.save(function (err, data) {
        if (err) {
            throw done(err);
        }
        done(null, data);
    });
};

exports.validate = function(url, done) {

    let longUrl = null;
    try {
        longUrl = new URL(url);
    } catch (err) {
        return done(err, null);
    }
    dns.lookup(longUrl.url, (err, address, family) => {
        if (err) {
            return done(err, null);
        }
        return done(null, longUrl.origin);
    });

};
