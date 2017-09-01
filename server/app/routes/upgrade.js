const models = require('../models');
const express = require('express');
const async = require('async');
const path = require('path');
const version = require(path.resolve(__dirname, '../utils/version'));

const yaml_config = require('node-yaml-config');

var router = express.Router();

router.get('/', function (req, res, next) {
  version.check().then(version => {
    res.render('upgrade', {
      title: 'Upgrader',
      version: version.launched,
      bddVersion: version.installed,
      database: yaml_config.load(path.resolve(__dirname, '../../../config/config.yml')).database
    });
  });
});


router.get('/lower-upgrade', function (req, res, next) {
  version.check().then(version => {

    res.render('lower-upgrade', {
      title: 'Upgrader',
      version: version.launched,
      bddVersion: version.installed
    });

  });
});


module.exports = router;
