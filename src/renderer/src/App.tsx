import { Content, RootLayout, Sidebar } from './components/AppLayout'
import { DraggableTopBar } from './components/DraggableTopBar'
import { ActionsButtonRow } from './UI/ActionsButtonRow'
import { ConversionsPreviewList } from './UI/ConversionsPreviewList'

const App = () => {
  return (
    <>
      <DraggableTopBar />
      <RootLayout>
        <Sidebar className="p-2">
          <ActionsButtonRow className="flex justify-between mt-1" />
          <ConversionsPreviewList className="mt-3 space-y-1" />
        </Sidebar>
        <Content className="border-l bg-zinc-900/50 border-l-white/20"></Content>
      </RootLayout>
    </>
  )
}

export default App
