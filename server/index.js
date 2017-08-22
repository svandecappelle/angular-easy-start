const express = require('express'),
  path = require('path'),
  exphbs = require('express-handlebars'),
  hbsHelpers = require('handlebars-helpers'),
  hbsLayouts = require('handlebars-layouts'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  errorhandler = require('errorhandler'),
  csrf = require('csurf'),
  morgan = require('morgan'),
  favicon = require('serve-favicon'),

  routes = require('./app/routes'),

  //router = require('./src/routes/router'),
  //database = require('./src/lib/database'),
  //seeder = require('./src/lib/dbSeeder'),
  app = express(),
  port = 3000;

class Server {

  constructor () {
    this.running = false;
    this.initViewEngine();
    this.initExpressMiddleWare();
    this.initCustomMiddleware();
    // this.initDbSeeder();
    this.initRoutes();
    this.start();
  }

  status () {
    console.log(`STATUS started: ${this.running ? 'on' : 'off'}`);
  }

  start () {
    app.listen(port, (err) => {
      this.running = !err;
      if (err) {
        console.error('Error loading server: ', err);
      } else {
        console.log('[%s] Listening on http://localhost:%d', process.env.NODE_ENV, port);
      }
    });
  }

  initViewEngine () {
    const hbs = exphbs.create({
      extname: '.hbs',
      defaultLayout: 'master'
    });
    app.engine('hbs', hbs.engine);
    app.set('view engine', 'hbs');
    hbsLayouts.register(hbs.handlebars, {});
  }

  initExpressMiddleWare () {
    //app.use(favicon(path.resolve(__dirname, 'public/images/favicon.ico')));
    app.use(express.static(path.resolve(__dirname, '../public')));
    app.use(express.static(path.resolve(__dirname, '../client')));

    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(errorhandler());
    app.use(cookieParser());
    app.use(csrf({ cookie: true }));

    app.use((req, res, next) => {
      var csrfToken = req.csrfToken();
      res.locals._csrf = csrfToken;
      res.cookie('XSRF-TOKEN', csrfToken);
      next();
    });

    process.on('uncaughtException', (err) => {
      if (err) console.log(err, err.stack);
    });
  }

  initCustomMiddleware () {/*
    if (process.platform === 'win32') {
      require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
      }).on('SIGINT', () => {
        console.log('SIGINT: Closing MongoDB connection');
        // database.close();
      });
    }

    process.on('SIGINT', () => {
      console.log('SIGINT: Closing MongoDB connection');
      // database.close();
    });*/
  }

  initDbSeeder () {
    /*database.open(() => {
      // Set NODE_ENV to 'development' and uncomment the following if to only run
      // the seeder when in dev mode
      // if (process.env.NODE_ENV === 'development') {
      //  seeder.init()
      // }
      seeder.init();
    });*/
  }

  initRoutes () {
    //router.load(app, 'api');
    // redirect all others to the index (HTML5 history)
    
    routes.serve(app);
    app.all('/*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../client/index.html'));
    });
  }

}

var server = new Server();
