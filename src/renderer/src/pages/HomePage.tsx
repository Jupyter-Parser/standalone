import { Content, RootLayout, Sidebar } from '../components/AppLayout'
import { ActionsButtonRow } from '../UI/ActionsButtonRow'
import { ConversionsPreviewList } from '../UI/ConversionsPreviewList'
import { JupyterPreview } from '../UI/JupyterPreview'

const HomePage = () => {
  return (
    <>
      <RootLayout>
        <Sidebar className="p-2">
          <ActionsButtonRow className="flex justify-between mt-1" />
          <ConversionsPreviewList className="mt-3 space-y-1" />
        </Sidebar>
        <Content className="border-l bg-zinc-900/50 border-l-white/20">
          <JupyterPreview />
        </Content>
      </RootLayout>
    </>
  )
}

export default HomePage
