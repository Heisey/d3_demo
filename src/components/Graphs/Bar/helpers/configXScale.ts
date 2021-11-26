import * as d3 from 'd3'

interface IConfigXScale<T> {
  scaleSize: [number, number]
  dataField: keyof T
  data: T[]
}

function configXScale<T>(config: IConfigXScale<T>) {
  const { data, dataField, scaleSize } = config
  const fields = data.map(d => d[dataField]) as unknown
  return d3
    .scaleBand()
    .domain(fields as string[])
    .range(scaleSize)
    .paddingInner(0.2)
}

export default configXScale