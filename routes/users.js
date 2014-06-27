var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient

var testCollection = {};

MongoClient.connect('mongodb://riobe:jpridemore-Mongo@ds059898.mongolab.com:59898/heroku_app26822700', {}, function(err, db) {
    if (err) throw err;

    testCollection = db.collection('test');
});

/* GET users listing. */
router.get('/', function(req, res) {
    testCollection.find().toArray(function(err, docs) {
        res.render('users', {users: docs});
    });
});

router.get('/:id', function(req, res) {
    res.send('respond with a resource');
});

router.post('/', function(req, res) {
    testCollection.insert(req.body, function(err, docs) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
            return;
        }

        res.location("/users");
        // And forward to success page
        res.redirect("/users");
    });
});

module.exports = router;
