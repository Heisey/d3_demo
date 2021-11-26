
import * as I from '../interfaces'

const generateGraphGroup = (node: I.D3Node, size: [number, number], margin: I.GraphMargin) => {
  return node.append('g')
    .attr('height', size[0])
    .attr('width', size[1])
    .attr('transform', `translate(${margin[0]}, ${margin[1]})`)
}

export default generateGraphGroup