import { ComponentProps, useCallback, useEffect, useState } from 'react'
import { className as cn } from '@renderer/utils/className'
import { ConversionResponse } from 'src/shared/types'
import { ConversionPreview } from './ConversionPreview'
import { useConversions } from '@renderer/store/conversions'

export const ConversionsPreviewList = ({ className, ...props }: ComponentProps<'ul'>) => {
  const [conversions, setConversions] = useState<ConversionResponse[]>([])

  const { selectedConversion, needUpdate, setNeedUpdate } = useConversions()

  const getConversions = useCallback(async () => {
    setConversions(await window.generator.listConversions())
  }, [])

  useEffect(() => {
    getConversions()
    setNeedUpdate(false)
  }, [needUpdate])

  if (!conversions.length) {
    return (
      <ul className={cn('text-center pt-4', className)} {...props}>
        <li>
          <span>Нет конвертаций!</span>
        </li>
      </ul>
    )
  }

  return (
    <ul {...props} className={className}>
      {conversions.map((conversion, index) => (
        <li key={index}>
          <ConversionPreview {...conversion} isSelected={conversion.uuid == selectedConversion} />
        </li>
      ))}
    </ul>
  )
}
