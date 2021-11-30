

import * as IGraph from '../../interfaces'

const generateGraphGroup = (node: IGraph.D3Node, size: IGraph.GraphSize, margin: IGraph.GraphMargin) => {
  return node.append('g')
    .attr('height', size[0])
    .attr('width', size[1])
    .attr('transform', `translate(${margin[0]}, ${margin[1]})`)
}

export default generateGraphGroup