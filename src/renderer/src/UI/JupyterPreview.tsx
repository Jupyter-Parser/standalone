import { IpynbRenderer } from 'react-ipynb-renderer-katex'

import 'katex/dist/katex.min.css'

import 'react-ipynb-renderer-katex/dist/styles/monokai.css'
import { FC, useCallback, useEffect, useState } from 'react'

export interface JupyterPreviewProps {
  path: string
}

export const JupyterPreview: FC<JupyterPreviewProps> = ({ path }) => {
  const [ipynb, setIpynb] = useState<any>('')

  const getIpynb = useCallback(async () => {
    const data = await window.generator.readFile(path)
    setIpynb(JSON.parse(data))
  }, [path])

  useEffect(() => {
    getIpynb()
  }, [path])

  return <IpynbRenderer ipynb={ipynb} />
}
