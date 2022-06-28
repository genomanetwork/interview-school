'use strict';
require('dotenv').config();
import sessionRequired from '../../middlewares/sessionRequired';
const LANDING = require('./landing');
const API = require('./api');
const DASHBOARD = require('./dashboard');

module.exports = (app) => {
  app.use(`${process.env.DASHBOARD_ENTRY_POINT}/`, sessionRequired, DASHBOARD);
  app.use(`${process.env.API_ENTRY_POINT}/`, API);
  app.use('/', LANDING);


  /// catch 404 and forwarding to error handler
  app.use(function(req, res) {
    res.status(404).send('Not found');
  });

  /// error handlers

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res) {
      res.status(err.status || 500);
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
};
