import { ElectronAPI } from '@electron-toolkit/preload'
import { ConversionResponse } from 'src/shared/types'

declare global {
  interface Window {
    electron: ElectronAPI
    platform: NodeJS.Platform
    nodeConsole: Console
    context: {
      locale: string
      timeZone: string
    }
    generator: {
      convert: (conversion: Conversion) => Promise<ConversionResponse>
      getConversion: (uuid: string) => Promise<ConversionResponse>
      deleteConversion: (uuid: string) => Promise<void>
      listConversions: () => Promise<ConversionResponse[]>
      openDirectory: () => Promise<string>
      openFile: () => Promise<string>
      readFile: (path: string) => Promise<string>
      openDocx: (path: string) => Promise<void>
    }
  }
}
