import { Content, RootLayout, Sidebar } from './components/AppLayout'
import { DraggableTopBar } from './components/DraggableTopBar'

const App = () => {
  return (
    <>
      <DraggableTopBar />
      <RootLayout>
        <Sidebar className="p-2"></Sidebar>
        <Content className="border-l bg-zinc-900/50 border-l-white/20"></Content>
      </RootLayout>
    </>
  )
}

export default App
