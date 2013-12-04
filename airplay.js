var spawn = require('child_process').spawn;
var airtunes = require('airtunes');

var airPlayDevice = airtunes.add(process.env.AIRPLAY_HOST, {
  port: 5000,
  volume: 100
});

var deviceStatus;
airPlayDevice.on('status', function(status) {
  deviceStatus = status;
});

var ffmpeg;

module.exports = {
  play: function(fileStream) {
    // exit if device is not ready
    if(deviceStatus !== 'ready') return;

    if(ffmpeg) ffmpegProcess.kill('SIGHUP');

    ffmpeg = spawn('/usr/local/bin/ffmpeg', [
      '-i', '-',
      '-f', 's16le',        // PCM 16bits, little-endian
      '-ar', '44100',       // Sampling rate
      '-ac', 2,             // Stereo
      'pipe:1'              // Output on stdout
    ]);

    ffmpeg.stdout.pipe(airtunes, {end: false});
    fileStream.pipe(ffmpeg.stdin);
  }
}
