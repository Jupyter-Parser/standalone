import { ComponentProps } from 'react'
import { NewConversionButton } from './NewConversionButton'
import { DeleteConversionButton } from './DeleteConversionButton'
import { OpenConversionButton } from './OpenConversionButton'

export const ActionsButtonRow = ({ ...props }: ComponentProps<'div'>) => {
  return (
    <div {...props}>
      <NewConversionButton />
      <OpenConversionButton />
      <DeleteConversionButton />
    </div>
  )
}
