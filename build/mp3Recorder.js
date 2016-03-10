'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var workerString = "J3VzZSBzdHJpY3QnOwoKaW1wb3J0U2NyaXB0cygnaHR0cHM6Ly9zMy5hbWF6b25hd3MuY29tL3Jpc2UtcnVudGltZS9lbmNvZGVycy9sYW1lLm1pbi5qcycpOwoKdmFyIG1wM0VuY29kZXIgPSB2b2lkIDAsCiAgICBzYW1wbGVzTW9ubyA9IHZvaWQgMCwKICAgIGxhbWUgPSB2b2lkIDAsCiAgICBjb25maWcgPSB2b2lkIDAsCiAgICBkYXRhQnVmZmVyID0gdm9pZCAwOwoKdmFyIG1heFNhbXBsZXMgPSAxMTUyOwoKdmFyIGRlZmF1bHRDb25maWcgPSB7CiAgZGVidWc6IHRydWUKfTsKCmZ1bmN0aW9uIGluaXRpYWxpemUocHJlZkNvbmZpZykgewogIGNvbnNvbGUubG9nKCdMYW1lIFdvcmtlciBpbml0aWFsaXplZCcpOwogIGNvbmZpZyA9IHByZWZDb25maWcgfHwgZGVmYXVsdENvbmZpZzsKICBsYW1lID0gbmV3IGxhbWVqcygpOwogIG1wM0VuY29kZXIgPSBuZXcgbGFtZS5NcDNFbmNvZGVyKDEsIGNvbmZpZy5zYW1wbGVSYXRlIHx8IDQ0MTAwLCBjb25maWcuYml0UmF0ZSB8fCAxMjgpOwogIGNsZWFyQnVmZmVyKCk7Cn0KCmZ1bmN0aW9uIGNsZWFyQnVmZmVyKCkgewogIGRhdGFCdWZmZXIgPSBbXTsKfQoKZnVuY3Rpb24gYXBwZW5kVG9CdWZmZXIobXAzQnVmKSB7CiAgZGF0YUJ1ZmZlci5wdXNoKG5ldyBJbnQ4QXJyYXkobXAzQnVmKSk7Cn0KCmZ1bmN0aW9uIGNvbnZlcnRCdWZmZXIoYXJyYXlCdWZmZXIpIHsKICB2YXIgZGF0YSA9IG5ldyBGbG9hdDMyQXJyYXkoYXJyYXlCdWZmZXIpOwogIHZhciBvdXQgPSBuZXcgSW50MTZBcnJheShhcnJheUJ1ZmZlci5sZW5ndGgpOwogIGZsb2F0VG8xNkJpdFBDTShkYXRhLCBvdXQpOwoKICByZXR1cm4gb3V0Owp9CgpmdW5jdGlvbiBmbG9hdFRvMTZCaXRQQ00oaW5wdXQsIG91dHB1dCkgewogIGZvciAodmFyIGkgPSAwOyBpIDwgaW5wdXQubGVuZ3RoOyBpKyspIHsKICAgIHZhciBzID0gTWF0aC5tYXgoLTEsIE1hdGgubWluKDEsIGlucHV0W2ldKSk7CiAgICBvdXRwdXRbaV0gPSBzIDwgMCA/IHMgKiAweDgwMDAgOiBzICogMHg3RkZGOwogIH0KfQoKZnVuY3Rpb24gZW5jb2RlKGFycmF5QnVmZmVyKSB7CiAgc2FtcGxlc01vbm8gPSBjb252ZXJ0QnVmZmVyKGFycmF5QnVmZmVyKTsKICB2YXIgcmVtYWluaW5nID0gc2FtcGxlc01vbm8ubGVuZ3RoOwoKICBmb3IgKHZhciBpID0gMDsgcmVtYWluaW5nID49IDA7IGkgKz0gbWF4U2FtcGxlcykgewogICAgdmFyIGxlZnQgPSBzYW1wbGVzTW9uby5zdWJhcnJheShpLCBpICsgbWF4U2FtcGxlcyk7CiAgICB2YXIgbXAzYnVmID0gbXAzRW5jb2Rlci5lbmNvZGVCdWZmZXIobGVmdCk7CiAgICBhcHBlbmRUb0J1ZmZlcihtcDNidWYpOwogICAgcmVtYWluaW5nIC09IG1heFNhbXBsZXM7CiAgfQp9CgpmdW5jdGlvbiBmaW5pc2goKSB7CiAgYXBwZW5kVG9CdWZmZXIobXAzRW5jb2Rlci5mbHVzaCgpKTsKCiAgcG9zdE1lc3NhZ2UoewogICAgY21kOiAnZW5kJywKICAgIGJ1ZjogZGF0YUJ1ZmZlcgogIH0pOwoKICBpZiAoY29uZmlnLmRlYnVnKSB7CiAgICBjb25zb2xlLmxvZygnU2VuZGluZyBmaW5pc2ggY29tbWFuZCcpOwogIH0KICBjbGVhckJ1ZmZlcigpOyAvL2ZyZWUgdXAgbWVtb3J5Cn0KCi8vIFJlc3BvbmRzIHRvIHBvc3RNZXNzYWdlIGZyb20gTVAzIEVuY29kZXIKb25tZXNzYWdlID0gZnVuY3Rpb24gb25tZXNzYWdlKGUpIHsKICBzd2l0Y2ggKGUuZGF0YS5jbWQpIHsKICAgIGNhc2UgJ2luaXQnOgogICAgICBpbml0aWFsaXplKGUuZGF0YS5jb25maWcpOwogICAgICBicmVhazsKCiAgICBjYXNlICdlbmNvZGUnOgogICAgICBlbmNvZGUoZS5kYXRhLmJ1Zik7CiAgICAgIGJyZWFrOwoKICAgIGNhc2UgJ2ZpbmlzaCc6CiAgICAgIGZpbmlzaCgpOwogICAgICBicmVhazsKICB9Cn07";

var Mp3Recorder = function () {
  function Mp3Recorder(config) {
    _classCallCheck(this, Mp3Recorder);

    var blob = new Blob([atob(workerString)], { type: 'application/javascript' });
    var url = URL.createObjectURL(blob);

    this.config = config || {};
    this.context = new AudioContext();
    this.worker = new Worker(url);
    this.config.sampleRate = this.context.sampleRate;
    this.workerSuccess;

    this.worker.postMessage({
      cmd: 'init',
      config: this.config
    });

    this.worker.onmessage = this.onmessage.bind(this);
  }

  _createClass(Mp3Recorder, [{
    key: 'onAudioProcess',
    value: function onAudioProcess(event) {
      // Send microphone data to LAME for MP3 encoding while recording.
      var buffer = event.inputBuffer.getChannelData(0);

      this.worker.postMessage({
        cmd: 'encode',
        buf: buffer
      });
    }
  }, {
    key: 'beginRecording',
    value: function beginRecording(stream) {
      // Set up Web Audio API to process data from the media stream (microphone).
      this.microphone = this.context.createMediaStreamSource(stream);
      this.processor = this.context.createScriptProcessor(16384, 1, 1);

      // Set up callback function as raw audio is returned
      this.processor.onaudioprocess = this.onAudioProcess.bind(this);

      // Begin retrieving microphone data.
      this.microphone.connect(this.processor);
      this.processor.connect(this.context.destination);
    }
  }, {
    key: 'setUserMedia',
    value: function setUserMedia() {
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    }

    // Function for kicking off recording once the button is pressed.

  }, {
    key: 'start',
    value: function start(onSuccess, onError) {
      var _this = this;

      this.setUserMedia();

      navigator.getUserMedia({ audio: true }, function (stream) {
        _this.beginRecording(stream);

        if (onSuccess && typeof onSuccess === 'function') {
          onSuccess();
        }
      }, function (error) {
        if (onError && typeof onError === 'function') {
          onError(error);
        }
      });
    }
  }, {
    key: 'stop',
    value: function stop(onSuccess) {
      if (this.processor && this.microphone) {
        // Clean up the Web Audio API resources.
        this.microphone.disconnect();
        this.processor.disconnect();
        this.processor.onaudioprocess = null;

        if (onSuccess && typeof onSuccess === 'function') {
          onSuccess();
        }
      }
    }
  }, {
    key: 'getMp3Blob',
    value: function getMp3Blob(onSuccess) {
      this.workerSuccess = onSuccess;
      this.worker.postMessage({
        cmd: 'finish'
      });
    }
  }, {
    key: 'blobToDataURL',
    value: function blobToDataURL(blob, callback) {
      var a = new FileReader();
      a.onload = function (e) {
        callback(e.target.result);
      };
      a.readAsDataURL(blob);
    }
  }, {
    key: 'getMp3Url',
    value: function getMp3Url(onSuccess) {
      this.workerSuccess = onSuccess;
      this.worker.postMessage({
        cmd: 'finish'
      });
    }
  }, {
    key: 'onmessage',
    value: function onmessage(e) {
      var _this2 = this;

      switch (e.data.cmd) {
        case 'end':
          if (this.workerSuccess) {
            var blob = new Blob(e.data.buf, { type: 'audio/mp3' });

            this.blobToDataURL(blob, function (url) {
              return _this2.workerSuccess(url);
            });
          }
          break;
        case 'error':
          console.log('error');
          break;
        default:
          console.log('I just received a message I know not how to handle.', e.data);
      }
    }
  }]);

  return Mp3Recorder;
}();

exports.default = Mp3Recorder;