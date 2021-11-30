import React, { useEffect } from 'react'
import * as d3 from 'd3'

import * as IGraph from '../interfaces'

import helpers from './helpers'
import * as I from './interfaces'

interface IDonutGraphProps<T> {
  id: string
  data: T[]
  styles: I.DonutStyles
}

type IDonutGraph<T> = React.FC<IDonutGraphProps<T>>

const Donut: IDonutGraph<IGraph.GraphData> = (props) => {

  const {
    data,
    id,
    styles
  } = props

  useEffect(() => {
    const formattedId = '#' + id

    const el = d3.select(formattedId)

    el.html(null)

    helpers.renderGraph(el, data, styles)
  })

  return <div id={id}></div>
}

export default Donut