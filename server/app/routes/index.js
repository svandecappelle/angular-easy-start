var users = require('./users'),
  groups = require('./groups'),
  install = require('./install'),
  authority = require('./authority');

class Routes {


  constructor () {
    this.routes = ['/login', '/install'];
  }

  serve (app) {
    app.use('/api/users', users);
    app.use('/api/groups', groups);

    app.use('/install', install);

    app.use(authority);
  }

  isPublic (url) {
    return this.routes.indexOf(url) !== -1;
  }

}

module.exports = new Routes();
