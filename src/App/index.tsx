import React, { useEffect, useState } from 'react'

import api from '../api'
import { IModels } from '../api'
import * as components from '../components'
import { IGraph } from '../components/Graphs'
import config from './config'
import styles from './styles'

const { Bar } = components.Graphs

function App() {
  const [bpData, bpDataHandler] = useState<IModels.IBp[] | undefined>(undefined)
  const [dishesData, dishesDataHandler] = useState<IModels.IDishes[] | undefined>(undefined)

  useEffect(() => {
    const loadData = async () => {
      const dishes = await api.dishes.all() 
      if (!dishes) return
      dishesDataHandler(dishes)
    }

    if (!dishesData) loadData()
  }, [dishesData])

  useEffect(() => {
    const loadData = async () => {
      const bp = await api.bp.all()
      if (!bp) return
      bpDataHandler(bp)
    }

    if (!bpData) loadData()
  }, [bpData])

  const configColor = (color: string) => {
    switch(color) {
      case 'groupOne':
        return 'powderblue'
      case 'groupTwo':
        return 'black'
      case 'groupThree':
        return 'seagreen'
      default:
        return 'black'
    }
  }

  const configCateg = (group: string) => {
    switch(group) {
      case 'groupOne':
        return '< 130/80'
      case 'groupTwo':
        return '130/80 to 140/90'
      case 'groupThree':
        return '> 140/90'
      default:
        return ''
    }
  }

  const configDishData = (): IGraph.IGraphData[] => {

    if (!dishesData) return [{ value: 0, category: '', fill: ''}]

    return dishesData.map(dataSet => ({
      value: dataSet.data.order,
      category: dataSet.data.name,
      fill: dataSet.data.color
    }))
  }

  const configBpData = (): IGraph.IGraphData[] => {
    if (!bpData) return [{ value: 0, category: '', fill: ''}]

    return bpData.map(dataSet => ({
      value: dataSet.data.value,
      fill: configColor(dataSet.data.label),
      category: configCateg(dataSet.data.label)
    }))
  }

  return (
    <styles.App>
      <Bar.Component
        id='graph1'
        data={api.fakeData}
        styles={styles.graph}
        config={config.graph.color}
      />
      <Bar.Component
        id='bpGraph'
        data={configBpData()}
        styles={styles.graph}
        config={config.graph.bpGraph}
      />
      <Bar.Component
        id='graph2'
        data={configDishData()}
        styles={styles.graph}
        config={config.graph.food}
      />
    </styles.App>
  );
}

export default App;
