import vosk from 'vosk'
import fs from 'fs'
import mic from 'mic'
import { ipcMain } from 'electron'

const MODEL_PATH =
  '/home/kr34t1v/Desktop/work/command_mic/voice-models/vosk-model-en-us-0.22-lgraph'
const SAMPLE_RATE = 16000

export function loadModel(modelPath): null | vosk.model {
  try {
    if (modelPathExists(modelPath)) {
      return new vosk.Model(MODEL_PATH)
    }
    return null
  } catch (err) {
    return null
  }
}

export function modelPathExists(modelPath): boolean {
  if (!fs.existsSync(modelPath)) {
    console.log(
      'Please download the model from https://alphacephei.com/vosk/models and unpack as ' +
        MODEL_PATH +
        ' in the current folder.'
    )
    return false
  }
  return true
}

export function getMicInputDevice(): mic {
  return mic({
    rate: String(SAMPLE_RATE),
    channels: '1',
    debug: false,
    device: 'default'
  })
}

vosk.setLogLevel(0)

// Setup Voice Recognition
const model = loadModel(MODEL_PATH)
if (!model) throw 'No Voice Model Found'
const rec = new vosk.Recognizer({ model: model, sampleRate: SAMPLE_RATE })

// Setup Mic Input
const micInstance = getMicInputDevice()
const micInputStream = micInstance.getAudioStream()

// EVENTS
// micInputStream.on('startComplete', () => {})
// micInputStream.on('pauseComplete', () => {})
// micInputStream.on('resumeComplete', () => {})

micInputStream.on('data', (data) => {
  if (rec.acceptWaveform(data)) {
    ipcMain.emit('voiceline-updated')
    console.log(rec.result().text)
  }
  // else console.log(rec.partialResult().text)
})
micInputStream.on('audioProcessExitComplete', function () {
  console.log('Cleaning up')
  console.log(rec.finalResult())
  rec.free()
  model.free()
})

process.on('SIGINT', function () {
  console.log('\nStopping')
  micInstance.stop()
})

export default micInstance
