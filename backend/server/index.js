/* eslint-disable new-cap */
/* eslint-disable  camelcase */
// APP
require('dotenv').config();
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import {join} from 'path';
import favicon from 'serve-favicon';
import http from 'http';
//import helmet from 'helmet';
import exphbs from 'express-handlebars';

require('../app/model');
require('./modules/globals');

// Initializations
const PORT = process.env.APP_PORT || 3000;
const app = express();
const Server = http.Server(app);
const RedisStore = require('connect-redis')(session);
const screenLog = require('morgan');


// View enginge
app.set('views', join(__dirname, '../views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: join(app.get('views'), 'layouts'),
  partialsDir: join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: {
    shortenLocale: function(locale){
      return locale.substring(0,2);
    },
    stringifyState: function(initialState){
      return JSON.stringify(initialState);
    }
  }
}));
app.set('view engine', '.hbs');

// Static files
app.get('/manifest.json', function(req, res) {
  res.sendStatus(400);
});
app.use(express.static(join(__dirname, '../public')));
app.use(favicon(join(__dirname, '../public/static/img/favicon.ico')));

// Middlewares
/* app.use(helmet({
  hsts: false
})); */
app.disable('x-powered-by');
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(screenLog('dev'));
app.use(bodyParser.json());
app.use(cookieParser()); //required before session

// SESSION STORE
const sessionMiddleware = session({
  store: new RedisStore({client: redis}),
  secret: 'super secret word',
  name: 'goji-labs-interview',
  proxy: false,
  httpOnly: true,
  secure: false, //Uncomment when using SSL
  resave: true,
  saveUninitialized: false
});
app.use(sessionMiddleware);

app.use(function(req,res,next){
  req.connection.setNoDelay(true);
  next();
});


// SETTING requestIp
app.use(function(req, res, next){
  // setting requestIp
  const {localAddress, remoteAddress} = req.connection;
  const ipv4 = remoteAddress.replace(/^.*:/, '');
  const requestAddress = localAddress === remoteAddress ? systemIp : ipv4;
  req.requestIp = req.headers['x-forwarded-for'] || requestAddress;
  next();
});


//SETTING TOKEN
app.use(function(req, res, next){
  req.token = req.headers['x-auth-token'];
  next();
});

// Routes
require('../app/routes')(app);

Server.listen(PORT, '0.0.0.0', async () => {
  try {
    console.log(`${process.env.MODULE_NAME} is running on port ${PORT}`);

    // Sending process Ready for PM2 auto deploy
    if (process.send){
      setTimeout(() => {
        process.send('ready');
      }, process.env.APP_START_DELAY ? process.env.APP_START_DELAY : 5000);
    }
  } catch (err){
    console.log(err.message);
  }
});

// Waiting message from PM2 gracefulReload
// process all active connections and exit
process.on('SIGINT', function () {
  Server.close(function(err) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    process.exit(0);
  });

  setTimeout(() => {
    process.exit(0);
  }, process.env.APP_FORCE_EXIT_DELAY ? process.env.APP_FORCE_EXIT_DELAY : 3000);
});
