import React, { useState, useEffect } from 'react'
import { Chart } from 'react-charts'

export default (props) => {

  console.log('reload');
  
  const data =
    React.useMemo(
      () => props.data || [{
        label: 'Series 1',
        data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
      },
      {
        label: 'Series 2',
        data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
      }],
      []
    )

  const axes =
    React.useMemo(
      () => [
        { primary: true, type: 'time', position: 'bottom' },
        { type: 'linear', position: 'left' }
      ],
      []
    )

  return (
    <div style={{
      width: '100%',
      height: '50vh'
    }}>
      <Chart data={data} axes={axes} tooltip/>
    </div>
  )

}