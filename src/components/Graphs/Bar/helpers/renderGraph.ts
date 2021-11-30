
import * as d3 from 'd3'

import * as IGraph from '../../interfaces'
import lib from '../../lib'

import helpers from './'
import * as I from '../interfaces'

type RenderGraph<T> = (node: IGraph.D3Node, data: T[], config: I.IGraphConfig,  graphStyles: IGraph.GraphStyles) => void

const renderGraph: RenderGraph<IGraph.GraphData> = (node, data, config, styles) => {
  // generated size for graph
  const graphMargin = helpers.configMargin(styles.margin) 
  const graphSize = helpers.configGraphSize(styles.size, graphMargin)

  // config scales from graph
  const yScale = helpers.configYScale({
    dataMinMax: [0, d3.max(data, (d) => d.value) as number],
    scaleSize: [graphSize[0], 0]
  })
  const xScale = helpers.configXScale({
    scaleSize: [0, graphSize[1]],
    data,
    dataField: 'category'
  })

  // generate container element for everything and container for bars
  const container = lib.generateSvgContainer(node, styles.size)
  const graphGroup = helpers.generateGraphGroup(container, styles.size, graphMargin)


  // generate bars and append to group
  const bars = graphGroup
    .selectAll('rect')
    .data(data)

  bars
    .enter()
    .append('rect')

    // General attributes
    .attr('width', xScale.bandwidth)
    .attr('fill', (d) => d.fill)
    .attr('x', (d) => xScale(d.category) as number)

    // Starting conditions for transitions
    .attr('height', 0)
    .attr('y', graphSize[0])

    .transition().duration(1500)

    // Ending conditions for transitions
    .attr('height', (d) => (graphSize[0] - yScale(d.value)))
    .attr('y', d => yScale(d.value))

  //  generate containers elements for scales
  const xAxisContainer = graphGroup.append('g').attr('transform', `translate(0, ${graphSize[0]})`)
  const yAxisContainer = graphGroup.append('g')

  // set scales in containers
  const xAxis = d3.axisBottom(xScale).tickFormat(d => `${d} ${d !== '0' ? config.units.x : ''}`)
  const yAxis = d3.axisLeft(yScale).ticks(2).tickFormat(d => `${d} ${d !== 0 ? config.units.y : ''}`)
  xAxisContainer.call(xAxis)
  yAxisContainer.call(yAxis)
  
}

export default renderGraph