var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');

var app = express();

// mongodb://<username>:<password>@ds059898.mongolab.com:59898/heroku_app26822700
// mongo ds059898.mongolab.com:59898/heroku_app26822700 -u <username> -p <password>
var database = {};
mongodb.MongoClient.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/heroku_app26822700', function(err, db) {
    if (err) throw err;

    database.users = db.collection('users');
});

// End of setup

// Permanent redirect.
app.use(function(req, res, next) {
    if (req.get('host') === 'jpridemore-test-node.herokuapp.com') {
        res.redirect(301, 'http://www.tiltedpeak.com');
    } else {
        next();
    }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger(function(tokens, req, res){
    var color = 32; // green
    var status = res.statusCode;

    if (status >= 500) color = 31; // red
    else if (status >= 400) color = 33; // yellow
    else if (status >= 300) color = 36; // cyan

    var compile = function(fmt) {
        fmt = fmt.replace(/"/g, '\\"');
        var js = ' return "' + fmt.replace(/:([-\w]{2,})(?:\[([^\]]+)\])?/g, function(_, name, arg){
            return '"\n + (tokens["' + name + '"](req, res, "' + arg + '") || "-") + "';
        }) + '";'
        return new Function('tokens, req, res', js);
    };

    // I'm a stubborn bastard and went and looked at how the dev target was logging with colors so I could make my logger log with colors even when not at a dev setting.
    // I'm also writing the comment a couple months after I did this and might have messed up my terminology just a smidgen.
    var fn = compile(':remote-addr - [:date] "\x1b[90m:method :url HTTP/:http-version \x1b[' + color + 'm:status \x1b[90m:response-time ms - :res[content-length]\x1b[0m :res[content-length] ":referrer" ":user-agent"');

    return fn(tokens, req, res);
}));

// Parser setup.
app.use(bodyParser.json({limit: '2mb'}));
app.use(bodyParser.urlencoded({limit: '2mb'}));
app.use(cookieParser('spoaifnsdopfinasoin Secret COOKIE Phrase!!! 2890347nasS*DFJ)(*YWSHDF'));

// Path to static files.
app.use(express.static(path.join(__dirname, 'public')));


// Make the db available to the routes.
app.use(function(req, res, next) {
    req.db = database;

    next();
})

// Make cookie values avaiable to the routes.
app.use(function(req, res, next) {
    if (!req.signedCookies.name) {
        res.cookie('name', 'win', {signed: true});
    } else {
        req.cookieName = req.signedCookies.name;
    }

    next();
});

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

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
