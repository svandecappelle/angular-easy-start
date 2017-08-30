const express = require('express'),
  path = require('path'),
  nconf = require('nconf'),
  nconfYaml = require('nconf-yaml'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  errorhandler = require('errorhandler'),
  csrf = require('csurf'),
  morgan = require('morgan'),
  favicon = require('serve-favicon'),
  session = require('express-session'),
  yaml_config = require('node-yaml-config'),
  config    = yaml_config.load(path.resolve(__dirname, '../config/config.yml')),

  routes = require('./app/routes'),
  app = express();

class Server {

  constructor () {
    this.running = false;
    nconf.file({
      file: path.resolve(__dirname, '../config/pricing.yml'),
      format: nconfYaml
    });
    this.initViewEngine();
    this.initExpressMiddleWare();
    this.initRoutes();
    this.start();
  }

  status () {
    console.log(`STATUS started: ${this.running ? 'on' : 'off'}`);
  }

  start () {
    app.listen(config.port, (err) => {
      this.running = !err;
      if (err) {
        console.error('Error loading server: ', err);
      } else {
        console.log('[%s] Listening on http://localhost:%d', process.env.NODE_ENV, config.port);
      }
    });
  }

  initViewEngine () {
    app.set('view engine', 'pug');
    app.set('views', path.resolve(__dirname, './app/views'));
  }

  initExpressMiddleWare () {
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(errorhandler());
    app.use(cookieParser());
    if (app.get('env') === 'production') {
      app.set('trust proxy', 1) // trust first proxy
      sess.cookie.secure = true // serve secure cookies
    }

    // TODO change secret value  and maybe use passport
    app.use(session({
      secret: 'keyboard cat',
      cookie: {}
    }))

    /*
    app.use(csrf({ cookie: true }));
    /*
    app.use((req, res, next) => {
      var csrfToken = req.csrfToken();
      res.locals._csrf = csrfToken;
      res.cookie('XSRF-TOKEN', csrfToken);
      next();
    });
    */

    process.on('uncaughtException', (err) => {
      if (err) console.log(err, err.stack);
    });
  }

  initRoutes () {
    // redirect all others to the index (HTML5 history)
    routes.serve(app);
  }

}

var server = new Server();
