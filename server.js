var restify = require('restify');
var socketIo = require('socket.io');

var app = restify.createServer();
var io = socketIo.listen(app);

app.listen(process.env.PORT || 3000);

app.use(restify.bodyParser());
app.pre(require('./allow_cross_domain'));

app.post('/messages', function(req, res) {
  var message = req.params;
  message.date = new Date();

  var sockets = io.of('/messages').sockets;
  Object.keys(sockets).forEach(function(socketId) {
    sockets[socketId].emit('message', message);
  });
  res.end();
});
