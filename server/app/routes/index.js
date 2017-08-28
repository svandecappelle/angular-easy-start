const path = require('path'),
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
    this.checkInstall().then((version)=>{

      app.use((req, res, next) => {
        if (req.session && req.session.user == null && !this.isPublic(req.url)){
          // if user is not logged-in redirect back to login page //
          res.redirect('/login');
        } else {
          next();
        }
      });

      app.all('/*', (req, res) => {
        /*if (!version){
          return res.redirect('/install');
        } else if (version !== require(path.resolve(__dirname, '../../../package').version)){
          return res.redirect('/upgrade');
        }*/
        res.render('index');
      });
    });

    app.use('/api/users', users);
    app.use('/api/groups', groups);

    app.use('/install', install);
    app.use('/upgrade', upgrade);

    app.use(authority);
  }

  isPublic (url) {
    return this.routes.indexOf(url) !== -1;
  }

  checkInstall () {
    return new Promise((resolve, reject)=>{
      console.log(nconf.get('product-name'));
      models[nconf.get('product-name')].findAll().then((properties) => {
        for (variable of properties) {
          console.log(variable);
        }
        resolve('0.0.1');
      }).catch(() => {
        console.log('not installed application');
        resolve(null);
      });
    });
  }
}

module.exports = new Routes();
