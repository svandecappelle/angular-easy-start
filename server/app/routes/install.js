const models = require('../models');
const express = require('express');
const path = require('path');
const async = require('async');

var router = express.Router();


router.get('/', function (req, res, next) {
  res.render('install', {
    version: require(path.resolve(__dirname, '../../../package')).version
  });
});

module.exports = router;
