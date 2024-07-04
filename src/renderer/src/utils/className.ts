import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const className = (...args: ClassValue[]) => {
  return twMerge(clsx(...args))
}
