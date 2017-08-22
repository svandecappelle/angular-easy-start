var users = require('./users'),
  authority = require('./authority');

class Routes {

  constructor () {
  }

  serve (app) {
    app.use('/api/users', users);
    app.use(authority);
  }

}

module.exports = new Routes();
