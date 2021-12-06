import * as IDonutGraph from '../../components/Graphs/Donut/interfaces'
import * as IGraph from "../../components/Graphs/interfaces"

import * as constants from './constants'

export const barGraphStyles: IGraph.GraphStyles = {
  size: [800, 500],
  margin: [
    constants.GRAPH_MARGIN_LEFT,
    constants.GRAPH_MARGIN_TOP,
    constants.GRAPH_MARGIN_RIGHT,
    constants.GRAPH_MARGIN_BOTTOM
  ]
}


export const donutGraphSTyles: IDonutGraph.DonutStyles = {
  size: [500, 500],
  margin: [
    constants.GRAPH_MARGIN_LEFT,
    constants.GRAPH_MARGIN_TOP,
    constants.GRAPH_MARGIN_RIGHT,
    constants.GRAPH_MARGIN_BOTTOM
  ],
  radius: 150
}

export const histgramGraphStyles: IGraph.GraphStyles = {
  size: [600, 600],
  margin: [
    constants.GRAPH_MARGIN_LEFT,
    constants.GRAPH_MARGIN_TOP,
    constants.GRAPH_MARGIN_RIGHT,
    constants.GRAPH_MARGIN_BOTTOM
  ],
}