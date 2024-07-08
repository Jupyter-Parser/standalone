export const getFilename = (fullPath: string) => {
  return fullPath.replace(/^.*[\\/]/, '')
}
