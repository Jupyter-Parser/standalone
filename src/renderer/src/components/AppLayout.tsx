import { ComponentProps, forwardRef } from 'react'
import { className as cn } from '@renderer/utils/className'

export const Sidebar = ({ className, children, ...props }: ComponentProps<'aside'>) => {
  return (
    <aside
      className={cn(
        'w-[250px] overflow-auto',
        window.platform === 'darwin' ? 'mt-10 h-[100vh + 10px]' : 'h-[100vh]',
        className
      )}
      {...props}
    >
      {children}
    </aside>
  )
}

export const Content = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={cn('flex-1 overflow-auto', className)} {...props}>
      {children}
    </div>
  )
)

export const RootLayout = ({ className, children, ...props }: ComponentProps<'main'>) => {
  return (
    <main className={cn('flex flex-row h-screen', className)} {...props}>
      {children}
    </main>
  )
}
