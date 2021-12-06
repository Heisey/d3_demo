import * as IGraph from '../../interfaces'

const configGraphSize = (size: IGraph.GraphSize, margin: IGraph.GraphMargin) => {

  let result = []

  result[0] = size[0] - margin[1] - margin[3]

  result[1] = size[1] - margin[0] - margin[2]

  return result as IGraph.GraphSize
}

export default configGraphSize