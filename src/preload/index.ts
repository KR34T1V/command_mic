import { contextBridge, IpcRenderer, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
// Custom APIs for renderer
const api = {
  enableMic: (bool): void => {
    ipcRenderer.send('enable-mic', bool)
  },
  voicelineUpdate: (callback): IpcRenderer => ipcRenderer.on('voiceline-update', callback),
  updateVoiceLog: (callback): IpcRenderer => ipcRenderer.on('voice-log-update', callback)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
