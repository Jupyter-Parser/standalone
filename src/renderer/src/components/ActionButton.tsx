import { ComponentProps } from 'react'
import { className as cn } from '@renderer/utils/className'

export type ActionButtonProps = ComponentProps<'button'>

export const ActionButton = ({ className, children, ...props }: ActionButtonProps) => {
  return (
    <button
      className={cn(
        'px-2 py-1 rounded-md border border-zinc-400/50 hover:bg-zinc-600/50 transition-colors duration-100',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
