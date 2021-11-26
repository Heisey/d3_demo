
import * as I from '../interfaces'

const configMargin = (margin?: I.GraphMargin) => {
  if (!margin) return [0, 0, 0, 0] as I.GraphMargin
  return margin.map(dataSet => dataSet ? dataSet : 0) as I.GraphMargin
}

export default configMargin