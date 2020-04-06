import React, { useState, useEffect } from 'react'
import { Chart } from 'react-charts'

export default (props) => {

  console.log('reload');
  
  const data =
    React.useMemo(
      () => props.data,
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