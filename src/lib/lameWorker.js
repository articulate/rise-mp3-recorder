importScripts('https://s3.amazonaws.com/rise-runtime/encoders/lame.min.js')

let mp3Encoder, samplesMono, lame, config, dataBuffer

const maxSamples = 1152

const defaultConfig = {
  debug: true
}

function initialize(prefConfig) {
  console.log('Lame Worker initialized')
  config = prefConfig || defaultConfig
  lame = new lamejs()
  mp3Encoder = new lame.Mp3Encoder(1, config.sampleRate || 44100, config.bitRate || 128)
  clearBuffer()
}

function clearBuffer() {
  dataBuffer = []
}

function appendToBuffer(mp3Buf) {
  dataBuffer.push(new Int8Array(mp3Buf))
}

function convertBuffer(arrayBuffer) {
  var data = new Float32Array(arrayBuffer)
  var out = new Int16Array(arrayBuffer.length)
  floatTo16BitPCM(data, out)

  return out
}

function floatTo16BitPCM(input, output) {
  for (let i = 0; i < input.length; i++) {
    let s = Math.max(-1, Math.min(1, input[i]))
    output[i] = (s < 0 ? s * 0x8000 : s * 0x7FFF)
  }
}

function encode(arrayBuffer) {
  samplesMono = convertBuffer(arrayBuffer)
  let remaining = samplesMono.length

  for (let i = 0; remaining >= 0; i += maxSamples) {
    let left = samplesMono.subarray(i, i + maxSamples)
    let mp3buf = mp3Encoder.encodeBuffer(left)
    appendToBuffer(mp3buf)
    remaining -= maxSamples
  }
}

function finish() {
  appendToBuffer(mp3Encoder.flush())

  postMessage({
    cmd: 'end',
    buf: dataBuffer
  })

  if (config.debug) {
    console.log('Sending finish command');
  }
  clearBuffer() //free up memory
}

// Responds to postMessage from MP3 Encoder
onmessage = (e) => {
  switch (e.data.cmd) {
    case 'init':
      initialize(e.data.config)
      break

    case 'encode':
      encode(e.data.buf)
      break

    case 'finish':
      finish()
      break
  }
}
