'use strict';

const express = require('express'),
      router = express.Router(),
      passport = require('passport'),
      log = require('debug')('jeremypridemore-me:api:login');

log('Defining login routes.');
router.get('/', (req, res) => {
  log(`Getting logged in user: ${req.user && req.user.userName}`);
  res.json({
    status: 'sucess',
    user: req.user && req.user.userName
  });
});

router.post('/', passport.authenticate('local'), (req, res) => {
  const message =  `Logged in as ${req.user.userName}!`;
  log(message);
  res.json({
    status: 'success',
    message
  });
});

module.exports = router;
