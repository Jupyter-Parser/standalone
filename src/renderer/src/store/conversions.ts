import { create } from 'zustand'

interface Storage {
  selectedConversion?: string
  selectConversion: (uuid?: string) => void
  needUpdate: boolean
  setNeedUpdate: (vakue: boolean) => void
}

export const useConversions = create<Storage>((set) => ({
  selectedConversion: undefined,
  needUpdate: true,
  selectConversion: (uuid?: string) => {
    set((context) => {
      return {
        ...context,
        selectedConversion: uuid
      }
    })
  },
  setNeedUpdate: (value: boolean) => {
    set((context) => {
      return {
        ...context,
        needUpdate: value
      }
    })
  }
}))
