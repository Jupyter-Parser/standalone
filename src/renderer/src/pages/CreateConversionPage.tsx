import { Content, RootLayout, Sidebar } from '@renderer/components/AppLayout'
import { Checkbox } from '@renderer/components/Checkbox'
import { DirectorySelector } from '@renderer/components/DirectorySelector'
import { NotebookSelector } from '@renderer/components/NotebookSelector'
import { JupyterPreview } from '@renderer/UI/JupyterPreview'
import { useState } from 'react'

const CreateConversionPage = () => {
  const [notebook, setNotebook] = useState<string>()

  return (
    <>
      <RootLayout>
        <Sidebar className="p-2 flex flex-col gap-2">
          <div>Настройки:</div>
          <DirectorySelector />
          <NotebookSelector onChange={setNotebook} />
          <Checkbox placeholder="Оглавление" />
        </Sidebar>
        <Content className="border-l bg-zinc-900/50 border-l-white/20">
          <JupyterPreview path={notebook} />
        </Content>
      </RootLayout>
    </>
  )
}

export default CreateConversionPage
