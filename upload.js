var Q = require('q');

var Upload = function Upload(tmpFile) {
  this.tmpFile = tmpFile;
};

Upload.prototype.saveToDisk = function() {
  var deferred = Q.defer();
  var fileDir = __dirname + '/public/uploads/' + uuid.v1();
  fs.mkdir(fileDir, function() {
    var filePath = fileDir + '/' + this.tmpFile.name;
    var storeStream = fs.createWriteStream(newPath);
    fs.createReadStream(this.tmpFile).pipe(storeStream);
    storeStream.on('close', function() {
      deferred.resolve();
    });
  });
};

module.exports = Upload;
