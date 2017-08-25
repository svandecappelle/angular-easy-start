var users = require('./users'),
  groups = require('./groups'),
  authority = require('./authority');

class Routes {

  constructor () {
  }

  serve (app) {
    app.use('/api/users', users);
    app.use('/api/groups', groups);

    app.use(authority);
  }

}

module.exports = new Routes();
