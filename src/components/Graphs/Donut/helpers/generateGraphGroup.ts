

import * as IGraph from '../../interfaces'

const generateGraphGroup = (node: IGraph.D3Node, size: IGraph.GraphSize, center: [number, number]) => {
  return node.append('g')
    .attr('height', size[0])
    .attr('width', size[1])
    .attr('transform', `translate(${center[0]}, ${center[1]})`)
}

export default generateGraphGroup