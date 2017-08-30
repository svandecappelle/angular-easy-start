const path = require('path'),
  express = require('express'),
  nconf = require('nconf'),
  models = require('../models'),
  users = require('./users'),
  groups = require('./groups'),
  install = require('./install'),
  upgrade = require('./upgrade'),
  authority = require('./authority');

class Routes {

  constructor () {
    this.routes = ['/login', '/install'];
  }

  serve (app) {
    this.checkInstall().then( (version) => {

      app.use((req, res, next) => {
        if (this.isPublic(req.url)){
          next();
        } else if (req.session && req.session.user == null) {
          // if user is not logged-in redirect back to login page //
          res.redirect('/login');
        } else {
          next();
        }
      });



      if (version) {
        app.all('/*', (req, res, next) => {
          if (!version && req.url !== '/install') {
            return res.redirect('/install');
          } else if (version !== require(path.resolve(__dirname, '../../../package')).version) {
            return res.redirect('/upgrade');
          } else {
            res.render('index');
          }
        });

        console.log(`installed version: ${version}`);
        app.all('/install', (req, res) => {
          console.log('redirect');
          res.redirect('/');
        });
        app.use('/api/users', users);
        app.use('/api/groups', groups);

        app.use('/upgrade', upgrade);
      } else {
        app.use('/install', install);
        app.all('/*', (req, res, next) => {
          if (!version) {
            return res.redirect('/install');
          } else if (version !== require(path.resolve(__dirname, '../../../package')).version) {
            return res.redirect('/upgrade');
          } else {
            res.render('index');
          }
        });
      }

    });

    app.use(authority);

    app.use(express.static(path.resolve(__dirname, '../../../public')));
    app.use(express.static(path.resolve(__dirname, '../../../client')));
  }

  isPublic (url) {
    return this.routes.indexOf(url) !== -1;
  }

  checkInstall () {
    return new Promise((resolve, reject)=>{
      console.log(nconf.get('product-name'));
      models[nconf.get('product-name')].findAll().then(properties => {
        var pricing = {};
        for (var variable of properties) {
          console.log('var: ', variable.get('property'), variable.get('value'));
          pricing[variable.get('property')] = variable.get('value');
        }
        resolve(pricing.version);
      }).catch((error) => {
        // console.error(error);
        console.log('not installed application');
        resolve(null);
      });
    });
  }
}

module.exports = new Routes();
