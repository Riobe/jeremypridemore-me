var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

var app = express();
var mongoDbConnectionString = app.get('mongodb-connection-string')

var server = new mongodb.Server(mongoDbConnectionString, 27017, {auto_reconnect: true});
var testCollection = {};
db = new mongodb.Db('test', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'test' database");
        testCollection = db.collection('users');
    }
});

/* GET users listing. */
router.get('/', function(req, res) {
    testCollection.find({}, {}, function(err, docs) {
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

        res.location("/");
        // And forward to success page
        res.redirect("/");
    });
});

module.exports = router;
