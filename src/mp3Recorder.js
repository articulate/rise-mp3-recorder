const workerString = "${workerString}"

class Mp3Recorder {

  constructor(config) {
    const blob = new Blob([atob(workerString)], { type: 'application/javascript' })
    const url = URL.createObjectURL(blob)

    const ctx = window.AudioContext || window.webkitAudioContext

    this.config = config || {}
    this.context = new ctx()
    this.worker = new Worker(url)
    this.config.sampleRate = this.context.sampleRate
    this.workerSuccess
    this.duration = 0

    this.worker.postMessage({
      cmd: 'init',
      config: this.config
    })

    this.worker.onmessage = this.onmessage.bind(this);
  }

  onAudioProcess(event) {
    // Send microphone data to LAME for MP3 encoding while recording.
    const buffer = event.inputBuffer.getChannelData(0)
    this.duration += event.inputBuffer.duration;

    this.worker.postMessage({
      cmd: 'encode',
      buf: buffer
    })
  }

  beginRecording(stream) {
    // Set up Web Audio API to process data from the media stream (microphone).
    this.microphone = this.context.createMediaStreamSource(stream)
    this.processor = this.context.createScriptProcessor(16384, 1, 1)

    // Set up callback function as raw audio is returned
    this.processor.onaudioprocess = this.onAudioProcess.bind(this)

    // Begin retrieving microphone data.
    this.microphone.connect(this.processor);
    this.processor.connect(this.context.destination);
  }

  // Function for kicking off recording once the button is pressed.
  start(onSuccess, onError) {
    const getUserMedia = (window.navigator.getUserMedia || window.navigator.webkitGetUserMedia || window.navigator.mozGetUserMedia).bind(window.navigator);

    getUserMedia({ audio: true }, (stream) => {
      this.beginRecording(stream)

      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess()
      }
    }, (error) => {
      if (onError && typeof onError === 'function') {
        onError(error)
      }
    })
  }

  stop(onSuccess) {
    if (this.processor && this.microphone) {
      // Clean up the Web Audio API resources.
      this.microphone.disconnect()
      this.processor.disconnect()
      this.processor.onaudioprocess = null

      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess()
      }
    }
  }

  getMp3Blob(onSuccess) {
    this.workerSuccess = onSuccess
    this.worker.postMessage({
      cmd: 'finish'
    })
  }

  blobToDataURL(blob, callback) {
    const a = new FileReader();
    a.onload = function (e) {
      callback(e.target.result);
    }
    a.readAsDataURL(blob);
  }

  getMp3Url(onSuccess) {
    this.workerSuccess = onSuccess
    this.worker.postMessage({
      cmd: 'finish'
    })
  }

  onmessage(e) {
    switch (e.data.cmd) {
      case 'end':
        if (this.workerSuccess) {
          const blob = new Blob(e.data.buf, { type: 'audio/mp3' })

          this.blobToDataURL(blob, (url) => {
            const duration = this.duration
            this.duration = 0

            return this.workerSuccess({ url, duration })
          })
        }
        break;
      case 'error':
        console.log('error');
        break;
      default:
        console.log('I just received a message I know not how to handle.', e.data);
    }
  }
}

export default Mp3Recorder
