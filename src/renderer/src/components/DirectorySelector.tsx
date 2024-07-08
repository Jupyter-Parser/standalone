import { useState } from 'react'
import { LuFolderDown } from 'react-icons/lu'
import { className as cn } from '@renderer/utils/className'

export interface DirectorySelectorProps {
  className?: string
  onChange?: (folder?: string) => void
}

export const DirectorySelector = ({ className, onChange }: DirectorySelectorProps) => {
  const [folder, setFolder] = useState<string>()

  const onClick = async (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault()
    const folder = await window.generator.openDirectory()
    setFolder(folder || '')
    onChange && onChange(folder)
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
        <label htmlFor="folder" className="flex">
          <LuFolderDown className="w-6 h-6 mr-1 my-auto text-zinc-300" />
        </label>
        <input
          disabled
          id="folder"
          type="text"
          className="rounded-none rounded-e-lg outline-none bg-transparent cursor-pointer w-full overflow-ellipsis"
          placeholder="Выберите папку"
          value={folder}
        />
      </div>
    </>
  )
}
