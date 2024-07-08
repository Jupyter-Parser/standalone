import { HashRouter } from 'react-router-dom'
import AppRouter from './router/Pages'
import { initLogger } from './utils/logger'

initLogger()

const App = () => {
  return (
    <HashRouter>
      <AppRouter />
    </HashRouter>
  )
}

export default App
