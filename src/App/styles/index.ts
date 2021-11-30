import * as constants from './constants'
import * as graphStyles from './graph'

import * as containers from './containers'
import * as base from './base'

const styles = {
  constants,
  ...graphStyles,
  ...base,
  ...containers
}

export default styles