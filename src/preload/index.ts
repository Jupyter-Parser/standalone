import { contextBridge, shell } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { ipcRenderer } from 'electron'
import { Conversion } from '../shared/types'
import { Console } from 'console'

const nodeConsole = new Console(process.stdout, process.stderr)

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    ipcRenderer.send('apply')
  }, 500)
})

document.addEventListener('click', (event) => {
  const element = event.target as HTMLElement

  if (element.tagName === 'A') {
    const link = element as HTMLLinkElement

    event.preventDefault()
    shell.openExternal(link.href)
  }
})

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('platform', process.platform)
    contextBridge.exposeInMainWorld('nodeConsole', nodeConsole)
    contextBridge.exposeInMainWorld('context', {
      locale: navigator.language,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    })
    contextBridge.exposeInMainWorld('generator', {
      convert: (conversion: Conversion) => ipcRenderer.invoke('convert', conversion),
      getConversion: (uuid: string) => ipcRenderer.invoke('getConversion', uuid),
      listConversions: () => ipcRenderer.invoke('listConversions'),
      openDirectory: () => ipcRenderer.invoke('dialog:openDirectory'),
      openFile: () => ipcRenderer.invoke('dialog:openFile')
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
}
