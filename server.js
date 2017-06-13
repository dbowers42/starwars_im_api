var express = require('express');
var app = express();
require('express-ws')(app);

app.use(function (req, res, next) {
    console.log('middleware');
    req.testing = 'testing';
    return next();
});

app.get('/', function(req, res, next){
    console.log('get route', req.testing);
    res.end();
});

app.ws('/', function(ws, req) {
    ws.on('message', function(msg) {
        ws.send(`echo ${msg}`)
    });
    console.log('socket', req.testing);
});

app.listen(8080, () => console.log('server running on port 8080'))