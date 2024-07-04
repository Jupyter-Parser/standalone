import { contextBridge, shell } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { ipcRenderer } from 'electron'

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
    contextBridge.exposeInMainWorld('context', {
      locale: navigator.language,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
}
