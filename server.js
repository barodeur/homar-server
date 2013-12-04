var restify = require('restify');
var socketIo = require('socket.io');
var fs = require('fs');
var uuid = require('node-uuid');
var airplay = require('./airplay');
var Q = require('q');
var Message = require('./message');

var app = restify.createServer();
var io = socketIo.listen(app);

app.listen(process.env.PORT || porcess.env.SERVER_PORT || 3005);

app.use(restify.bodyParser());
app.pre(require('./allow_cross_domain'));

app.post('/messages', function(req, res) {
  var message = new Message(req);

  message.process().then(function() {
    message.broadcast(io.of('/messages'));
    res.json(message.toJSON());
  });
});

app.get('/uploads/.*', restify.serveStatic({directory: './public'}));
