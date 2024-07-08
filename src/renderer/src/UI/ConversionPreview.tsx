import { ComponentProps } from 'react'
import { className as cn } from '@renderer/utils/className'
import { ConversionResponse } from 'src/shared/types'
import { getFilename } from '@renderer/utils/pathUtils'
import { useConversions } from '@renderer/store/conversions'

export type NotePreviewProps = ConversionResponse &
  ComponentProps<'div'> & {
    isSelected?: boolean
  }

export const ConversionPreview = ({
  notebook,
  isSelected = false,
  className,
  uuid,
  ...props
}: NotePreviewProps) => {
  const filename = getFilename(notebook)

  const { selectConversion } = useConversions()

  return (
    <div
      className={cn(
        'cursor-pointer px-2.5 py-3 rounded-md transition-colors duration-75',
        {
          'bg-zinc-400/75': isSelected,
          'hover:bg-zinc-500/75': !isSelected
        },
        className
      )}
      onClick={() => {
        selectConversion(uuid)
      }}
      {...props}
    >
      <span className="inline-block w-full mb-2 text-xs font-light text-left">{filename}</span>
    </div>
  )
}
