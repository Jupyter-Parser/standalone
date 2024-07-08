import { FC } from 'react'
import { className, className as cn } from '@renderer/utils/className'

export interface CheckboxProps {
  placeholder: string
  onChange?: (value: boolean) => void
  className?: string
}

export const Checkbox: FC<CheckboxProps> = ({ placeholder, onChange }) => {
  return (
    <div className="flex items-center px-2 py-1 max-w-sm mx-auto w-full cursor-pointer">
      <input
        id="checkbox"
        type="checkbox"
        value=""
        onChange={(e) => {
          onChange && onChange(e.target.checked)
        }}
        className={cn(
          'w-4 h-4 mr-1 text-blue-600 cursor-pointer rounded-md border border-zinc-400/50 hover:bg-zinc-600/50 transition-colors duration-100',
          className
        )}
      />
      <label htmlFor="checkbox" className="text-zinc-300">
        {placeholder}
      </label>
    </div>
  )
}
