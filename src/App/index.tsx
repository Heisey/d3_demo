import React, { useEffect, useState } from 'react'

import api from '../api'
import { IModels } from '../api'
import * as components from '../components'
import * as IGraph from '../components/Graphs/interfaces'
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

  const configCategory = (group: string) => {
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

  const configDishData = (): IGraph.GraphData[] => {

    if (!dishesData) return [{ value: 0, category: '', fill: ''}]

    return dishesData.map(dataSet => ({
      value: dataSet.data.order,
      category: dataSet.data.name,
      fill: dataSet.data.color
    }))
  }

  const configBpData = (): IGraph.GraphData[] => {
    if (!bpData) return [{ value: 0, category: '', fill: ''}]

    return bpData.map(dataSet => ({
      value: dataSet.data.value,
      fill: configColor(dataSet.data.label),
      category: configCategory(dataSet.data.label)
    }))
  }

  return (
    <styles.App>
      <styles.graphRow>
        <Bar.Component
          id='graph1'
          data={api.fakeData}
          styles={styles.barGraphStyles}
          config={config.graph.color}
        />
        <Bar.Component
          id='bpGraph'
          data={configBpData()}
          styles={styles.barGraphStyles}
          config={config.graph.bpGraph}
        />
        <Bar.Component
          id='graph2'
          data={configDishData()}
          styles={styles.barGraphStyles}
          config={config.graph.food}
        />
      </styles.graphRow>

      <styles.graphRow>
        <components.Graphs.Donut
          id='donut1'
          data={api.fakeData}
          styles={styles.donutGraphSTyles}
        />
        <components.Graphs.Donut
          id='donut2'
          data={configBpData()}
          styles={styles.donutGraphSTyles}
        />
        <components.Graphs.Donut
          id='donut3'
          data={configDishData()}
          styles={styles.donutGraphSTyles}
        />
      </styles.graphRow>

      <styles.graphRow>
        <components.Graphs.Histogram
          id='histo1'
          dataRight={api.fakeDataLarge}
          dataLeft={api.fakeData}
          styles={styles.histgramGraphStyles}
        />
      </styles.graphRow>
    </styles.App>
  );
}

export default App;
