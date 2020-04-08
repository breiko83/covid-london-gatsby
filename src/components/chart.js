import React from 'react'
import { Chart } from 'react-charts'

export default (props) => {

  const axes =
  [
    { primary: true, type: 'time', position: 'bottom' },
    { type: 'linear', position: 'left' }
  ]

  function filterData(data, boroughs) {
    
    let utlas = []

    for (let i = 0; i < data.length; i++) {
      let array = []
      let label = data[i]['Area Name']

      if (!boroughs.includes(label))
        continue;

      var keys = Object.keys(data[i]);
      for (var l = 0; l < keys.length; l++) {
        var key = keys[l];
        array.push(([Date.parse(key), data[i][key]]));
      }

      utlas.push({
        label: label,
        data: array.slice(2)
      })
    }
    return utlas
  }

  return (
    <div style={{
      width: '100%',
      height: '40vh'
    }} className='chart'>
      <Chart data={filterData(props.data,props.filter)} axes={axes} tooltip/>
    </div>
  )

}