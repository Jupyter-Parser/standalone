import { spawn } from 'child_process'
import kill from 'tree-kill'
import * as net from 'net'
import { is } from '@electron-toolkit/utils'
import path from 'path'
import WebSocket from 'ws'
import * as fs from 'fs'
import { TextDecoder } from 'util'
import { readdir } from 'fs/promises'
import {
  StatusMessage,
  Status,
  Conversion,
  ConversionMessage,
  ConversionResponse,
  ConversionStatus
} from '../shared/types'

const decoder = new TextDecoder('cp1251')

const pipe_path = '\\\\.\\pipe\\jupyter_pipe'
const websocket_path = 'ws://localhost:3728/ws'
const conversions_path = path.resolve(process.env.LOCALAPPDATA!, 'JupyterConverter')

let websocket: WebSocket

export const initGenerator = async (app: Electron.App) => {
  return await new Promise<void>((resolve, _) => {
    let generator_path: string

    if (is.dev) {
      generator_path = path.resolve(__dirname, '../../', 'resources', 'extra', 'generator')
    } else {
      generator_path = path.resolve(path.dirname(app.getPath('exe')), 'resources', 'generator')
    }

    const subroc = spawn(generator_path, [], { detached: true })

    var server = net.createServer(function (stream) {
      stream.on('data', function (data) {
        const msg = JSON.parse(data.toString()) as StatusMessage

        switch (msg.status) {
          case Status.started:
            websocket = new WebSocket(websocket_path)
            websocket.once('open', () => {
              resolve()
            })
            break
          case Status.killed:
            console.log('Generator unexpectedly stoped')
            break
          case Status.error:
            console.log(msg.error)
            break
        }
      })

      stream.on('end', function () {
        server.close()
      })
    })

    server.listen(pipe_path)

    app.on('before-quit', function () {
      kill(subroc.pid!)
    })
  })
}

export const convert = async (conversion: Conversion) => {
  console.log(conversion)

  return await new Promise<ConversionResponse>((resolve, reject) => {
    const handler = (data: WebSocket.RawData) => {
      const message: ConversionMessage = JSON.parse(data.toString())

      switch (message.status) {
        case ConversionStatus.done:
          console.log(message)

          getConversion(message.conversion_id)
            .then((conv) => {
              resolve(conv)
            })
            .catch(reject)

          websocket.off('message', handler)
          break
        case ConversionStatus.error:
          console.error(message)
          reject()
          websocket.off('message', handler)
          break
        case ConversionStatus.converting:
          console.log(message)
          break
      }
    }

    websocket.send(JSON.stringify(conversion))
    websocket.on('message', handler)
  })
}

export const getConversion = async (uuid: string) => {
  const dir = path.resolve(conversions_path, uuid)
  return new Promise<ConversionResponse>((resolve, reject) => {
    if (!fs.existsSync(dir)) {
      reject('Conversion not found')
    } else {
      fs.readFile(
        path.resolve(dir, 'config.json'),
        {
          flag: 'r'
        },
        (err, data) => {
          if (err) {
            reject(err)
          } else {
            const { notebook, ...conversion }: Conversion = JSON.parse(decoder.decode(data))

            resolve({
              ...conversion,
              notebook,
              uuid,
              docx: path.resolve(dir, `${path.basename(notebook)}.docx`)
            })
          }
        }
      )
    }
  })
}

export const listConversions = async () => {
  const uuids = (await readdir(conversions_path, { withFileTypes: true }))
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

  return (await Promise.allSettled(uuids.map(getConversion)))
    .map((conversion) => {
      if (conversion.status == 'fulfilled') {
        return conversion.value
      } else {
        console.error(conversion.reason)
        return
      }
    })
    .filter((conversion) => !!conversion)
}
