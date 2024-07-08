import { ActionButton, ActionButtonProps } from '@renderer/components/ActionButton'
import { LuMoveLeft } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'

export const BackButton = ({ ...props }: ActionButtonProps) => {
  const navigate = useNavigate()

  return (
    <ActionButton
      {...props}
      onClick={() => {
        navigate(-1)
      }}
      className="flex flex-row"
    >
      <LuMoveLeft className="w-4 h-4 my-auto mr-1 text-zinc-300" />
      Назад
    </ActionButton>
  )
}
