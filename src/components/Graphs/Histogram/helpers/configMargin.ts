
import * as IGraph from '../../interfaces'

const configMargin = (margin?: IGraph.GraphMargin) => {
  if (!margin) return [0, 0, 0, 0] as IGraph.GraphMargin
  return margin.map(dataSet => dataSet ? dataSet : 0) as IGraph.GraphMargin
}

export default configMargin