import vosk from 'vosk'
import fs from 'fs'
import mic from 'mic'

export function loadModel(modelPath): null | vosk.model {
  try {
    if (modelPathExists(modelPath)) {
      return new vosk.Model(modelPath)
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
        modelPath +
        ' in the current folder.'
    )
    return false
  }
  return true
}

export function getMicInputDevice(sampleRate): mic {
  return mic({
    rate: String(sampleRate),
    channels: '1',
    debug: false,
    device: 'default'
  })
}

vosk.setLogLevel(0)
