import { ActionButton, ActionButtonProps } from '@renderer/components/ActionButton'
import { useConversions } from '@renderer/store/conversions'
import { FaRegTrashCan } from 'react-icons/fa6'

export const DeleteConversionButton = ({ ...props }: ActionButtonProps) => {
  const { selectConversion, selectedConversion, setNeedUpdate } = useConversions()

  const onClick = async () => {
    if (selectedConversion) {
      const result = await window.generator.showMessageBox({
        type: 'question',
        message: 'Вы уверены, что хотите удалить конвертацию?',
        title: 'Подтверждение',
        buttons: ['Нет', 'Да']
      })

      if (result == 1) {
        selectConversion()
        await window.generator.deleteConversion(selectedConversion)
        setNeedUpdate(true)
      }
    }
  }

  return (
    <ActionButton {...props} onClick={onClick}>
      <FaRegTrashCan className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
