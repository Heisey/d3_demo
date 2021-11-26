// import axios from 'axios'
import { collection, getDocs } from 'firebase/firestore'

import db from '../db'

import * as IModels from './models'

export const all = async () => {
  const dataCollection = collection(db.fireDB, 'dishes')
  try {
    const response = await getDocs(dataCollection)

    if (!response) return console.error('no data from firestore dishes')
    
    return response.docs.map(record => ({ data: record.data(), id: record.id })) as IModels.IDishes[]
  } catch (err) {
    console.error(err)
  }

}