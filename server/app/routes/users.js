var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/list', function (req, res, next) {
  models.User.findAll().then(function (users) {
    res.json(users);
  })
});

router.get('/create-group/:name', function (req, res, next) {
  models.Group.create({ name: req.params.name }).then( (users) => {
    res.json({message: `group ${req.params.name} created`});
  });
});

router.get('/assign-group/:username/:groupname', function (req, res, next) {
  models.Group.findOne({ where: {id: req.params.groupname}}).then( (group) => {
    models.User.findOne({ where: {id: req.params.username}}).then( (user) => {
      user.addGroup(group);
      res.json({message: "associated"});
    });
  });
});

router.get('/get-groups/:username', function (req, res, next) {

  // raw query example:
  models.sequelize.query("SELECT * FROM users", { type: models.sequelize.QueryTypes.SELECT})
  .then(users => {
    // We don't need spread here, since only the results will be returned for select queries
    console.log(users);
  });

  models.User.findOne({ where: {id: req.params.username}}).then( (user) => {
    user.getGroup().then( (groups) => {
      res.json(groups);
    });
  });
});


module.exports = router;
