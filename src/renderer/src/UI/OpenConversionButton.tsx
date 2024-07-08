import { ActionButton, ActionButtonProps } from '@renderer/components/ActionButton'
import { useConversions } from '@renderer/store/conversions'
import { LuFileEdit } from 'react-icons/lu'

export const OpenConversionButton = ({ ...props }: ActionButtonProps) => {
  const { selectedConversion } = useConversions()

  const onClick = async () => {
    if (selectedConversion) {
      const conversion = await window.generator.getConversion(selectedConversion)

      await window.generator.openDocx(conversion.docx)
    }
  }

  return (
    <ActionButton {...props} onClick={onClick}>
      <LuFileEdit className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
