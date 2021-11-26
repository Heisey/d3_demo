import * as I from '../interfaces'

const configGraphSize = (size: [number, number], margin: I.GraphMargin) => {

  let result = []

  result[0] = size[0] - margin[1] - margin[3]

  result[1] = size[1] - margin[0] - margin[2]

  return result as [number, number]
}

export default configGraphSize