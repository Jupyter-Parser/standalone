import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    platform: NodeJS.Platform
    context: {
      locale: string
      timeZone: string
    }
  }
}
