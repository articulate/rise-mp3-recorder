#!/usr/bin/env node

// This replaces the worker string placeholder with a base64 encoded string of `lameWorker.js`

var fs = require('fs')
var workerFile = './build/lib/lameWorker.js'
var mp3Recorder = './build/mp3Recorder.js'
var workerString = fs.readFileSync(workerFile)

fs.readFile(mp3Recorder, 'utf8', function (err, data) {
  if (err) {
    return console.log(err)
  }

  var result = data.replace(/\${workerString}/g, workerString.toString('base64'))

  fs.writeFile(mp3Recorder, result, 'utf8', function (err) {
    if (err) return console.log(err)
  })
})
