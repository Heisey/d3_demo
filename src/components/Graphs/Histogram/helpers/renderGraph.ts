
import * as d3 from 'd3'

import * as IGraph from '../../interfaces'
import lib from '../../lib'

import helpers from './'

const renderGraph = (node: IGraph.D3Node, dataLeft: IGraph.GraphData[], dataRight: IGraph.GraphData[], styles: IGraph.GraphStyles) => {

  const maxValueLeft = d3.max(dataLeft, d => d.value) || 0
  const maxValueRight = d3.max(dataRight, d => d.value) || 0

  // generated dimensions for graph
  const graphMargin = helpers.configMargin(styles.margin) 
  const graphSize = helpers.configGraphSize(styles.size, graphMargin)
  const barPadding = 30  

  // generate X scales for left and right
  const xScaleLeft = d3.scaleLinear()
    .domain([0, maxValueLeft])
    .range([0, graphSize[1]])

  const xScaleRight = d3.scaleLinear()
    .domain([0, maxValueRight])
    .range([0, graphSize[1]])
    .nice()

  const xAxisScaleLeft = d3.scaleLinear()
    .domain([maxValueLeft, 0])
    .range([0, (graphSize[1] / 2)])
    .nice()

  const xAxisScaleRight = d3.scaleLinear()
    .domain([0, maxValueRight])
    .range([0, (graphSize[1] / 2) - (barPadding / 4)])
    .nice()

  const yAxisScaleLeft = d3.scaleLinear()
    

  

  // generate container and graph groups and axis groups
  const container = lib.generateSvgContainer(node, styles.size)
  const graphGroupRight = container.append('g')
    .attr('y', (styles.size[1] - graphSize[1]) / 2)
    .attr('transform', `translate(${(graphSize[1] / 2) + (graphMargin[0] / 2)}, 0)`)
  const graphGroupLeft = container.append('g')
    .attr('y', (styles.size[1] - graphSize[1]) / 2)
    .attr('transform', `translate(${graphMargin[0] / 2}, 0)`)

  const xAxisLeftContainer = container.append('g')
  .attr('width', graphSize[1] / 2)
  .attr('transform', `translate(${graphMargin[0] / 2}, ${graphSize[0]})`)
  
  const xAxisRightContainer = container.append('g')
  .attr('width', graphSize[1] / 2)
  .attr('transform', `translate(${(graphSize[1] / 2) + (graphMargin[0] / 2)}, ${graphSize[0]})`)
  
  // generate bins 
  const binsLeft = d3.bin<IGraph.GraphData, number>()
    .domain(xScaleLeft.domain() as [number, number])
    .value((d) => d.value)

  const binsRight = d3.bin<IGraph.GraphData, number>()
    .domain( xScaleRight.domain() as [number, number])
    .value((d) => d.value)

  const binsDataLeft = binsLeft(dataLeft)
  const binsDataRight = binsRight(dataRight)

  
  // generate Y scales for left and right
  const yScaleLeft = d3.scaleLinear()
    .domain([0, d3.max(binsDataLeft, d => d.length) || 0])
    .range([(graphSize[0] / 2), 0])
    .nice()
  const yScaleRight = d3.scaleLinear()
    .domain([0, d3.max(binsDataRight, d => d.length) || 0])
    .range([(graphSize[0] / 2), 0])
    .nice()

  // pin graphs to container
  graphGroupRight.selectAll('rect')
    .data(binsDataRight)
    .join('rect')
    .attr('height', d =>( (d3.max([0, xScaleRight(d.x1 || 0) - xScaleRight(d.x0 || 0)])) || 0) - barPadding)
    .attr('width', d => (graphSize[1] / 2) - yScaleRight(d.length))
    .attr('y', d => xScaleRight(d.x0 || 0))
    .attr('x', d => {
      // return yScale(d.length)
      return 0
    })
    .attr('fill', (d, i, n) => 'blue')

  graphGroupLeft.selectAll('rect')
    .data(binsDataLeft)
    .join('rect')
    .attr('height', d =>( (d3.max([0, xScaleLeft(d.x1 || 0) - xScaleLeft(d.x0 || 0)])) || 0) - barPadding)
    .attr('width', d => (graphSize[1] / 2) - yScaleLeft(d.length))
    .attr('y', d => xScaleRight(d.x0 || 0))
    .attr('x', d => {
      return yScaleLeft(d.length)
      // return 40
    })
    .attr('fill', 'red')

    const xAxisRight = d3.axisBottom(xAxisScaleRight)
    const xAxisLeft = d3.axisBottom(xAxisScaleLeft)
    xAxisRightContainer.call(xAxisRight)
    xAxisLeftContainer.call(xAxisLeft)
}


export default renderGraph