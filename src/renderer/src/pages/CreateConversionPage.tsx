import { ActionButton } from '@renderer/components/ActionButton'
import { Content, RootLayout, Sidebar } from '@renderer/components/AppLayout'
import { Checkbox } from '@renderer/components/Checkbox'
import { DirectorySelector } from '@renderer/components/DirectorySelector'
import { Loader } from '@renderer/components/Loader'
import { NotebookSelector } from '@renderer/components/NotebookSelector'
import RoutePaths from '@renderer/router/Routes'
import { useConversions } from '@renderer/store/conversions'
import { JupyterPreview } from '@renderer/UI/JupyterPreview'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { className as cn } from '@renderer/utils/className'

const CreateConversionPage = () => {
  const navigate = useNavigate()

  const [notebook, setNotebook] = useState<string>()
  const [cwd, setCwd] = useState<string>()
  const [toc, setToc] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const { selectConversion } = useConversions()

  const onClick = async () => {
    if (notebook) {
      setLoading(true)

      const response = await window.generator.convert({
        notebook,
        cwd,
        options: {
          toc
        }
      })

      selectConversion(response.uuid)

      setLoading(false)

      navigate(RoutePaths.HOME)
    }
  }

  return (
    <>
      <RootLayout
        className={cn({
          'pointer-events-none': loading,
          'pointer-events-auto': !loading
        })}
      >
        <Sidebar className="p-2 flex flex-col gap-2 ">
          <div>Настройки:</div>
          <DirectorySelector onChange={setCwd} />
          <NotebookSelector onChange={setNotebook} />
          <Checkbox placeholder="Оглавление" onChange={setToc} />
          <ActionButton onClick={onClick}>Конвертировать</ActionButton>
          {loading && <Loader />}
        </Sidebar>
        <Content className="border-l bg-zinc-900/50 border-l-white/20">
          <JupyterPreview path={notebook} />
        </Content>
      </RootLayout>
    </>
  )
}

export default CreateConversionPage
