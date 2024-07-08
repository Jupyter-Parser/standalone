import { ActionButton, ActionButtonProps } from '@renderer/components/ActionButton'
import RoutePaths from '@renderer/router/Routes'
import { LuFilePlus } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'

export const NewConversionButton = ({ ...props }: ActionButtonProps) => {
  const navigate = useNavigate()

  const onClick = () => {
    navigate(RoutePaths.CREATE)
  }

  return (
    <ActionButton {...props} onClick={onClick}>
      <LuFilePlus className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
