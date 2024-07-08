import { IpynbRenderer } from 'react-ipynb-renderer-katex'

import 'katex/dist/katex.min.css'

import 'react-ipynb-renderer-katex/dist/styles/monokai.css'
import { FC, useCallback, useEffect, useState } from 'react'
import { useConversions } from '@renderer/store/conversions'

export interface JupyterPreviewProps {
  path?: string
}

export const JupyterPreview: FC<JupyterPreviewProps> = ({ path }) => {
  const [ipynb, setIpynb] = useState<any>('')

  useEffect(() => {
    getIpynb()
  }, [path])

  const getIpynb = useCallback(async () => {
    if (path) {
      const data = await window.generator.readFile(path)
      setIpynb(JSON.parse(data))
    }
  }, [path])

  return <IpynbRenderer ipynb={ipynb} />
}

export const CurrentJupyterPreview = () => {
  const { selectedConversion } = useConversions()

  const [path, setPath] = useState<string>()

  const getPath = useCallback(async () => {
    if (selectedConversion) {
      const conversion = await window.generator.getConversion(selectedConversion)

      setPath(conversion.notebook)
    } else {
      setPath(undefined)
    }
  }, [selectedConversion])

  useEffect(() => {
    getPath()
  }, [selectedConversion])

  return <JupyterPreview path={path} />
}
