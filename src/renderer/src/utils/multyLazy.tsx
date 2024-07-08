import { ComponentType, lazy } from 'react'

export const multiLazy = (
  moduleLoaderArray: Array<() => Promise<{ default: ComponentType<unknown> }>>
) => {
  const promises = Promise.all(moduleLoaderArray.map((loader) => loader()))

  return moduleLoaderArray.map((_, index) => lazy(() => promises.then((results) => results[index])))
}
