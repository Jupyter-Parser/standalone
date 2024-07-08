export const initLogger = () => {
  window.isDev().then((dev) => {
    if (!dev) {
      console = window.nodeConsole
    }
  })
}
