
import * as I from '../interfaces'

const generateSvgContainer = (node: I.D3Node, size: [number, number]) => {
  const container = node.append('svg')
  
  return container
    .attr('height', size[0])
    .attr('width', size[1])
    .style('background-color', 'pink')
}

export default generateSvgContainer