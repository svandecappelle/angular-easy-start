const models = require('../models');
const express = require('express');
const async = require('async');
const path = require('path');
const version = require(path.resolve(__dirname, '../utils/version'));

const yaml_config = require('node-yaml-config');

const upgrader = require(path.resolve(__dirname, '../../db/postgres/upgrade'));

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
/*
upgrader.upgrade( { from: "1.0.0", to: "2.0.1" } ).then((status) => {
  console.log("upgraded");
}).catch((error) => {
  console.error(error);
});
*/
router.post('/', (req, res) => {
  version.check().then(version => {
    upgrader.upgrade( { from: version.installed, to: version.launched } ).then((status) => {
      console.log("upgraded");
      res.send({
        message: 'Application upgraded to 1.0.1'
      })
    });
  })
})


module.exports = router;
