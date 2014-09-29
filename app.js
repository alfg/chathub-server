var express = require('express');
var oauthshim = require('oauth-shim')
var path = require('path');
var logger = require('morgan');

var config = require('./config');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(logger('dev'));

// OAuth Shim
oauthshim.init({
	// OAuth 2
	'client_id' : config.GITHUB_ID,
    'client_secret' : config.GITHUB_SECRET

});
app.all('/proxy', oauthshim.request);

oauthshim.getCredentials = function(id,callback){
    callback(config.GITHUB_SECRET);
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    oauthshim.debug = true;
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
