import * as I from './'

interface IBarGraphProps<T> {
  id: string
  data: T[]
  styles: I.IGraphStyles
  config: I.IGraphConfig
}

export default IBarGraphProps