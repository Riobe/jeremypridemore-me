var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    req.db.users.find().toArray(function(err, docs) {
        res.render('users', {users: docs});
    });
});

router.get('/:id', function(req, res) {
    res.send('respond with a resource');
});

router.post('/', function(req, res) {
    req.db.users.insert(req.body, function(err, docs) {
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
