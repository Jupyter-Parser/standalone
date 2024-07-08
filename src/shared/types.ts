export enum Status {
  started = 'started',
  killed = 'killed',
  error = 'error'
}

export enum ConversionStatus {
  converting = 'converting',
  done = 'done',
  error = 'error'
}

export interface StatusMessage {
  status: Status
  error?: string
}

export interface Margin {
  top?: number
  right?: number
  bottom?: number
  left?: number
}

export interface SectionSize {
  width?: number
  height?: number
  margin?: Margin
}

export interface Options {
  size?: SectionSize
  toc?: boolean
}

export interface Conversion {
  options?: Options
  cwd?: string
  notebook: string
}

export interface ConversionResponse extends Conversion {
  uuid: string
  docx: string
}

export interface ConversionMessage {
  conversion_id: string
  status: ConversionStatus
}
