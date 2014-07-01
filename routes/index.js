var express = require('express');
var router = express.Router();
var environment = express().get('env');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express', env: environment});
});

module.exports = router;
