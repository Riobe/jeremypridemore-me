var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');

var app = express();

// mongodb://riobe:jpridemore-Mongo@ds059898.mongolab.com:59898/heroku_app26822700
// mongo ds059898.mongolab.com:59898/heroku_app26822700 -u riobe -p jpridemore-Mongo
var database = {};
mongodb.MongoClient.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/heroku_app26822700', function(err, db) {
    if (err) throw err;

    database.users = db.collection('users');
});

app.use(function(req, res, next) {
    req.db = database;

    next();
})

var routes = require('./routes/index');
var users = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
