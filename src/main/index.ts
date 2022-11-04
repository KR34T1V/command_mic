import { app, shell, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'
import fs from 'fs'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import vosk from 'vosk'
import { getMicInputDevice, loadModel } from './voice'
const ENABLE_VOICE_LOGGING = true
const SAMPLE_RATE = 16000
const MODEL_PATH =
  '/home/kr34t1v/Desktop/work/command_mic/voice-models/vosk-model-en-us-0.22-lgraph'

// LOGGER
const logDir = path.join(__dirname, '../../logs')
// const baseDir = path.join(__dirname, '../../')
const logfile = path.join(logDir, `${new Date().getTime()}.log`)

if (ENABLE_VOICE_LOGGING && !fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true })
}
// if (!fs.existsSync(baseDir)) {
//   fs.appendFileSync(baseDir)
// }
const model = loadModel(MODEL_PATH)
if (!model) throw 'No Voice Model Found'
const rec = new vosk.Recognizer({ model: model, sampleRate: SAMPLE_RATE })
const mic = getMicInputDevice(SAMPLE_RATE)
mic.start()
mic.pause()
const micInputStream = mic.getAudioStream()

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux'
      ? {
          icon: path.join(__dirname, '../../build/icon.png')
        }
      : {}),
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegrationInWorker: true
    }
  })

  //SETUP STUFF HERE

  // VOICE AND RECOGNITION SETUP

  micInputStream.on('data', (data) => {
    if (rec.acceptWaveform(data)) {
      const res = rec.result().text
      if (res.length) {
        // console.log(`Accepted: ${res}`)
        if (ENABLE_VOICE_LOGGING) {
          fs.appendFile(logfile, `Voice Accepted: ${res}\n`, { encoding: 'utf8' }, (err) => {
            if (err) return
            fs.readFile(logfile, { encoding: 'utf8' }, (err, data) => {
              if (err) return
              const log = data.split('\n').reverse()
              mainWindow.webContents.send('voice-log-update', log.slice(0, 5).reverse())
            })
          })
        }
      }
    } else {
      const partial = rec.partialResult().partial
      if (partial.length) {
        console.log(partial)
        mainWindow.webContents.send('voiceline-update', partial)
      }
    }
  })

  micInputStream.on('audioProcessExitComplete', function () {
    console.log('Cleaning up')
    console.log(rec.finalResult())
    rec.free()
    model.free()
  })

  ipcMain.on('enable-mic', (event, data) => {
    console.log('Microphone', data ? 'Enabled' : 'Disabled')
    if (data) {
      mic.resume()
    } else {
      mic.pause()
    }
  })
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')
  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  mic.stop()
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
