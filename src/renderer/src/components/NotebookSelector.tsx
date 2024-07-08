import { useState } from 'react'
import { LuFileDown } from 'react-icons/lu'
import { className as cn } from '@renderer/utils/className'

export interface NotebookSelectorProps {
  className?: string
  onChange?: (file?: string) => void
}

export const NotebookSelector = ({ className, onChange }: NotebookSelectorProps) => {
  const [file, setFile] = useState<string>()

  const onClick = async (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault()
    const file = await window.generator.openFile()
    setFile(file || '')
    onChange && onChange(file)
  }

  return (
    <>
      <div
        className={cn(
          'flex px-2 py-1 max-w-sm mx-auto cursor-pointer rounded-md border border-zinc-400/50 hover:bg-zinc-600/50 transition-colors duration-100',
          className
        )}
        onClick={onClick}
      >
        <label htmlFor="file" className="flex">
          <LuFileDown className="w-6 h-6 mr-1 my-auto text-zinc-300" />
        </label>
        <input
          disabled
          id="file"
          type="text"
          className="rounded-none rounded-e-lg outline-none bg-transparent cursor-pointer w-full overflow-ellipsis"
          placeholder="Выберите файл jupyter notebook"
          value={file}
        />
      </div>
    </>
  )
}
