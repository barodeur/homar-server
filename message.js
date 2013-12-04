var Q = require('q');

var Message = function Message(req) {
  this.parse(req);
};

Message.prototype.process = function() {
  var deferred = Q.defer();
  deferred.resolve();
  return deferred.promise;
};

Message.prototype.parse = function(req) {
  this.body = req.params.body;
  this.author = { email: req.params.email };
  this.date = new Date();
  if(req.files) this.upload = req.files.upload;
};

Message.prototype.attributesNames = ['body', 'author', 'date'];

Message.prototype.broadcast = function(io) {
  var sockets = io.sockets;
  Object.keys(sockets).forEach(function(socketId) {
    sockets[socketId].emit('message', this.toJSON());
  }, this);
};

Message.prototype.saveUpload = function() {
  var readStream = fs.createReadStream(upload.path);

  var fileUuid = uuid.v1();
  var fileDir = __dirname + '/public/uploads/' + fileUuid;
  fs.mkdir(fileDir, function() {
    var newPath = fileDir + '/' + upload.name;
    var storeStream = fs.createWriteStream(newPath);

    fs.createReadStream(upload.path).pipe(storeStream);

    storeStream.on('close', function() {
      res.end();
    });
  });
};

Message.prototype.toJSON = function() {
  var json = {};
  this.attributesNames.forEach(function(attr) {
    json[attr] = this[attr];
  }, this);
  return json;
};

module.exports = Message;
