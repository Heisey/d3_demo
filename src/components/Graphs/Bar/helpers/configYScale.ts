import * as d3 from 'd3'

interface IConfigYScale {
  dataMinMax: [number, number]
  scaleSize: [number, number]
}

const configYScale = (config: IConfigYScale) => {
  
  return d3
    .scaleLinear()
    .domain(config.dataMinMax)
    .range(config.scaleSize)
}

export default configYScale