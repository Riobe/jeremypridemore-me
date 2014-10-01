var express = require('express');
var router = express.Router();
var environment = express().get('env');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
      env: environment,
      domain: req.get('host'),
      cookieName: req.cookieName
  });
});

module.exports = router;
