import React, { useEffect } from 'react'
import * as d3 from 'd3'

import helpers from './helpers'
import * as I from './interfaces'

type IBarGraph<T> = React.FC<I.IBarGraphProps<T>>

export const Component: IBarGraph<I.IGraphData> = (props) => {

  const { id, data, styles, config } = props

  useEffect(() => {
    const formattedId = '#' + id
    
    const container = d3.select(formattedId)
    
    // clear out stale elements
    container.html(null)
    // generate new elements
    helpers.renderGraph(container, data, config, styles)
  })

  return <div id={id}></div>
}


export * as IGraph from './interfaces'