import React, { useEffect } from 'react'
import * as d3 from 'd3'

import * as IGraph from '../interfaces'

import helpers from './helpers'
import * as I from './interfaces'

type IBarGraph<T> = React.FC<I.IBarGraphProps<T>>

export const Component: IBarGraph<IGraph.GraphData> = (props) => {

  const { id, data, styles, config } = props

  useEffect(() => {
    const formattedId = '#' + id
    
    const el = d3.select(formattedId)
    
    // clear out stale elements
    el.html(null)
    // generate new elements
    helpers.renderGraph(el, data, config, styles)
  })

  return <div id={id}></div>
}


export * as IGraph from './interfaces'