import * as IGraph from '../../interfaces'

import * as I from './'

interface IBarGraphProps<T> {
  id: string
  data: T[]
  styles: IGraph.GraphStyles
  config: I.IGraphConfig
}

export default IBarGraphProps