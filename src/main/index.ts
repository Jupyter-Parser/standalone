import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.ico?asset'
import vibe from '@pyke/vibe'
import {
  convert,
  deleteConversion,
  getConversion,
  initGenerator,
  listConversions
} from './converter'
import { initLogger } from './logger'
import { Conversion } from '../shared/types'
import * as fs from 'fs'

if (!is.dev) {
  initLogger(app)
}

const vibeApplicable = vibe.platform.isWin10_1809() || vibe.platform.isWin11()

if (vibeApplicable) {
  vibe.setup(app)
}

let mainWindow: BrowserWindow

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    minWidth: 870,
    height: 670,
    center: true,
    backgroundColor: '#00000000',
    show: false,
    thickFrame: false,
    autoHideMenuBar: true,
    frame: process.platform !== 'darwin',
    vibrancy: 'under-window',
    visualEffectState: 'active',
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: 15, y: 10 },
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    },
    titleBarOverlay:
      process.platform === 'win32'
        ? {
            color: '#232323',
            symbolColor: '#999'
          }
        : undefined
  })

  if (vibeApplicable) {
    vibe.forceTheme(mainWindow, 'dark')
  }

  ipcMain.on('apply', (_) => {
    mainWindow.setBackgroundColor('#EE212121')
    if (vibeApplicable) {
      vibe.applyEffect(mainWindow, 'blurbehind')
    }
  })

  mainWindow.webContents.once('dom-ready', () => {
    mainWindow.setBackgroundColor('#212121')
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
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', () => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore()
      }
      mainWindow.focus()
    }
  })

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.whenReady().then(() => {
    // Set app user model id for windows
    electronApp.setAppUserModelId('com.electron')

    initGenerator(app).then(() => {
      console.log('Generator inited')
    })

    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on('browser-window-created', (_, window) => {
      optimizer.watchWindowShortcuts(window)
    })

    // IPC test
    ipcMain.on('ping', () => console.log('pong'))

    ipcMain.handle('convert', async (_, args: Conversion) => {
      return await convert(args)
    })

    ipcMain.handle('getConversion', async (_, args: string) => {
      return await getConversion(args)
    })

    ipcMain.handle('deleteConversion', async (_, args: string) => {
      return await deleteConversion(args)
    })

    ipcMain.handle('listConversions', async () => {
      return await listConversions()
    })

    ipcMain.handle('dialog:openDirectory', async () => {
      const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory']
      })
      if (canceled) {
        return
      } else {
        return filePaths[0]
      }
    })

    ipcMain.handle('dialog:openFile', async () => {
      const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
        properties: ['openFile'],
        filters: [
          {
            name: 'Файл jupyter notebook',
            extensions: ['ipynb']
          }
        ]
      })
      if (canceled) {
        return
      } else {
        return filePaths[0]
      }
    })

    ipcMain.handle('readFile', async (_, args: string) => {
      return new Promise<string>((resolve, reject) => {
        fs.readFile(
          args,
          {
            encoding: 'utf-8'
          },
          (err, data) => {
            if (err) {
              reject(err)
            } else {
              resolve(data)
            }
          }
        )
      })
    })

    ipcMain.handle('openDocx', async (_, args: string) => {
      await shell.openPath(args)
    })

    ipcMain.handle('showMessageBox', async (_, options: Electron.MessageBoxOptions) => {
      const result = await dialog.showMessageBox(mainWindow, options)

      return result.response
    })

    ipcMain.handle('isDev', () => {
      return is.dev
    })

    createWindow()

    app.on('activate', function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
