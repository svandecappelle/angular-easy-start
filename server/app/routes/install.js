const models = require('../models');
const express = require('express');
const path = require('path');
const async = require('async');
const yaml_config = require('node-yaml-config');

var router = express.Router();


router.get('/', function (req, res, next) {
  res.render('install', {
    version: require(path.resolve(__dirname, '../../../package')).version,
    database: yaml_config.load(path.resolve(__dirname, '../../../config/config.yml')).database
  });
});

router.post('/', (req, res) => {
  var installer = require(path.resolve(__dirname, '../../db/postgres/install'));
  installer.install().then((installed, errors) => {
    res.json({install: 'ok'});
  });
})

module.exports = router;
