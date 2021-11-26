
import { getFirestore } from '@firebase/firestore'

import core from '../core'

const fireDB = getFirestore(core.connections.firebase)

const db = {
  fireDB
}

export default db