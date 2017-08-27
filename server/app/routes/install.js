var models = require('../models');
var express = require('express');
var async = require('async');

var router = express.Router();


router.get('/', function (req, res, next) {
  res.send('installer');
});

module.exports = router;
