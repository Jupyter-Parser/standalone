import { is } from '@electron-toolkit/utils'
import * as fs from 'fs'
import path from 'path'

export const initLogger = (app: Electron.App) => {
  let logs_path: string

  if (is.dev) {
    logs_path = path.resolve(__dirname, '../../', 'logs')
  } else {
    logs_path = app.getPath('logs')
  }

  if (!fs.existsSync(logs_path)) {
    fs.mkdirSync(logs_path)
  }

  const access = fs.createWriteStream(path.resolve(logs_path, 'node.access.log'), { flags: 'a' })
  const error = fs.createWriteStream(path.resolve(logs_path, 'node.error.log'), { flags: 'a' })

  process.stdout.write = access.write.bind(access) as any
  process.stderr.write = error.write.bind(error) as any
}
