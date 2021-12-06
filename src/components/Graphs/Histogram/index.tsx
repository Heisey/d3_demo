import * as d3 from 'd3'
import React, { useEffect } from 'react'

import helpers from './helpers'
import * as IGraph from '../interfaces'

interface IHistogramProps {
  id: string
  dataLeft: IGraph.GraphData[]
  dataRight: IGraph.GraphData[]
  styles: IGraph.GraphStyles
}

const Histogram: React.FC<IHistogramProps> = (props) => {

  const {
    id,
    dataLeft,
    dataRight,
    styles
  } = props

  useEffect(() => {

    const formattedId = '#' + id

    const el = d3.select(formattedId)

    el.html(null)
    
    helpers.renderGraph(el, dataLeft, dataRight, styles)
  })

  return <div id={id}></div>
}

export default Histogram