import { ComponentProps } from 'react'
import { NewConversionButton } from './NewConversionButton'
import { DeleteConversionButton } from './DeleteConversionButton'

export const ActionsButtonRow = ({ ...props }: ComponentProps<'div'>) => {
  return (
    <div {...props}>
      <NewConversionButton />
      <DeleteConversionButton />
    </div>
  )
}
