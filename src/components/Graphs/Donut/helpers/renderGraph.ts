import * as d3 from 'd3'

import * as IGraph from '../../interfaces'
import lib from '../../lib'

import helpers from '../helpers'
import * as I from '../interfaces'

type RenderDonutGraph<T> = (node: IGraph.D3Node, data: T[], graphStyles: I.DonutStyles) => void

const renderGraph: RenderDonutGraph<IGraph.GraphData> = (node, data, graphStyles) => {
  const size = graphStyles.size
  const center: [number, number] = [size[1] / 2 + 5, size[0] / 2 + 5]

  const container = lib.generateSvgContainer(node, size)
  const graphGroup = helpers.generateGraphGroup(container, size, center)

  const pie = d3.pie<IGraph.GraphData>()
  
  pie
    .sort(null)
    .value(d => d.value)

  const arcPath = d3.arc<d3.PieArcDatum<IGraph.GraphData>>()
      .outerRadius(graphStyles.radius)
      .innerRadius(graphStyles.radius / 2)

  const paths = graphGroup
    .selectAll('path')
    .data(pie(data))

  paths
    .enter()
    .append('path')
    .attr('class', 'arc')
    .attr('d', arcPath)
    .attr('fill', d => d.data.fill)
}

export default renderGraph

