import React, { useEffect, useState } from 'react'

import api from '../api'
import { IModels } from '../api'
import * as components from '../components'
import { IGraph } from '../components/Graphs'
import config from './config'
import styles from './styles'

const { Bar } = components.Graphs

function App() {
  const [dishesData, dishesDataHandler] = useState<IModels.IDishes[] | undefined>(undefined)

  useEffect(() => {
    const loadData = async () => {
      const dishes = await api.dishes.all() 
      if (!dishes) return
      dishesDataHandler(dishes)
    }

    if (!dishesData) loadData()
  }, [dishesData])

  const configDataForChart = (): IGraph.IGraphData[] => {

    if (!dishesData) return [{ value: 0, category: '', fill: ''}]

    return dishesData.map(dataSet => ({
      value: dataSet.data.order,
      category: dataSet.data.name,
      fill: dataSet.data.color
    }))
  }

  return (
    <styles.App>
      <Bar.Component
        id='graph1'
        data={api.fakeData}
        styles={styles.graph}
        config={config.graph}
      />
      <Bar.Component
        id='graph2'
        data={configDataForChart()}
        styles={styles.graph}
        config={config.graph}
      />
    </styles.App>
  );
}

export default App;
