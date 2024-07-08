import { IpynbRenderer } from 'react-ipynb-renderer-katex'

import 'katex/dist/katex.min.css'

import 'react-ipynb-renderer-katex/dist/styles/monokai.css'
import { useCallback, useEffect, useState } from 'react'
import { useConversions } from '@renderer/store/conversions'

export const JupyterPreview = () => {
  const [ipynb, setIpynb] = useState<any>('')

  const { selectedConversion } = useConversions()

  useEffect(() => {
    getIpynb()
  }, [selectedConversion])

  const getIpynb = useCallback(async () => {
    if (selectedConversion) {
      const conversion = await window.generator.getConversion(selectedConversion)
      const path = conversion.notebook

      const data = await window.generator.readFile(path)
      setIpynb(JSON.parse(data))
    } else {
      setIpynb({})
    }
  }, [selectedConversion])

  return <IpynbRenderer ipynb={ipynb} />
}
