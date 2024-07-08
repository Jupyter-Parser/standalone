import { ActionButton, ActionButtonProps } from '@renderer/components/ActionButton'
import { LuFilePlus } from 'react-icons/lu'

export const NewConversionButton = ({ ...props }: ActionButtonProps) => {
  return (
    <ActionButton {...props}>
      <LuFilePlus className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
