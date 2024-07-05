import { spawn } from 'child_process'
import kill from 'tree-kill'
import * as net from 'net'
import { is } from '@electron-toolkit/utils'
import path from 'path'
import WebSocket from 'ws'

enum Status {
  started = 'started',
  killed = 'killed',
  error = 'error'
}

export interface StatusMessage {
  status: Status
  error?: string
}

const pipe_path = '\\\\.\\pipe\\jupyter_pipe'
const websocket_path = 'ws://localhost:3728/ws'
export let websocket: WebSocket

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

        console.log(msg)

        switch (msg.status) {
          case Status.started:
            resolve()
            websocket = new WebSocket(websocket_path)
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
