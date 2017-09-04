const path = require('path');
const express = require('express');
const nconf = require('nconf');
const semver = require('semver');
const models = require('../models');
const users = require('./users');
const groups = require('./groups');
const install = require('./install');
const upgrade = require('./upgrade');
const authority = require('./authority');
const version = require(path.resolve(__dirname, '../utils/version'));

class Routes {

  constructor () {
    this.routes = ['/login', '/install'];
  }

  serve (app) {
    app.all('/install', (req, res, next) => {
      version.check().then( (version) => {
        if (version.installed){
          console.log('redirect');
          res.redirect('/');
        } else {
          next();
        }
      });
    });

    console.log('checking install');
    version.check().then( (version) => {
      console.log(`installed version is ${version.installed}`);
    }).catch((err) => {
      console.log('Error on checking installation', err);
    });

    app.use('/install', install);
    app.use('/upgrade', upgrade);

    app.use('/api/users', users);
    app.use('/api/groups', groups);

    app.use(authority);

    app.use(express.static(path.resolve(__dirname, '../../../public')));

    if (process.env.NODE_ENV !== 'production'){
      console.log(path.resolve(__dirname, '../../../client'));
      app.use(express.static(path.resolve(__dirname, '../../../client')));
    }

    app.use((req, res, next) => {
      if (this.isPublic(req.url)){
        next();
      } else if (!req.session || req.session.user == null) {
        // if user is not logged-in redirect back to login page //
        res.redirect('/login');
      } else {
        next();
      }
    });

    app.all('/*', (req, res, next) => {
      version.check().then( (version) => {

        if (!version.installed && req.url !== '/install') {
          return res.redirect('/install');
        } else if (version.needUpgrade) {
          // version bdd is lower than server build launched
          return res.redirect('/upgrade');
        } else if (version.versionIsLower){
          // version server build launched is lower than bdd
          return res.redirect('/upgrade/lower-upgrade');
        } else {
          if (process.env.NODE_ENV === 'production'){
            res.render('index');
          } else {
            res.render('index-dev');
          }
        }

      });
    });
  }

  isPublic (url) {
    return this.routes.indexOf(url) !== -1;
  }

}

module.exports = new Routes();
