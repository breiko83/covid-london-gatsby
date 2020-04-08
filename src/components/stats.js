import React from 'react'

export default (props) => {


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


  function getDelta(filteredData, i) {

    let delta = 0

    filteredData.map(element => {
      const serie = element.data
      const today = serie[serie.length - i][1]
      const yesterday = serie[serie.length - i - 1][1]
      delta = delta + (today - yesterday)
    })

    return delta
  }

  function averageDelta(filterData) {

    let avgDeltas = 0

    filteredData.map(element => {
      const serie = element.data
      const yesterday = serie[serie.length - 2][1]
      avgDeltas = avgDeltas + yesterday / serie.length
    })

    return avgDeltas;
  }

  function getTotalCases(filteredData) {
    let total = 0

    filteredData.map(element => {
      const serie = element.data
      const today = serie[serie.length - 1][1]
      total = total + today
    })

    return total;
  }

  function getLastUpdated(filteredData) {
    const element = filteredData[0].data
    const lastUpdated = element[element.length - 1][0]
    return new Date(lastUpdated).toLocaleDateString("en-GB");
  }

  const filteredData = filterData(props.data, props.filter)
  const today = getDelta(filteredData, 1)
  const avgDelta = averageDelta(filteredData)
  const dailyDelta = ((today - avgDelta) / ((avgDelta + today) / 2) * 100).toFixed(1)
  const totalCases = getTotalCases(filteredData)
  const lastUpdated = getLastUpdated(filteredData)

  return (
    <div className='stats'>
      <ul>
        <li className="info">Last update: {lastUpdated}</li>
        <li>Daily cases: {today} (<span className={dailyDelta <= 0 ? "green" : "red"}>{dailyDelta <= 0 ? "" : "+"}{dailyDelta}%</span>)</li>
        <li className="info">Total cases: {totalCases}</li>
        <li className="info">Average daily increase: {avgDelta <= 0 ? "" : "+"}{avgDelta.toFixed(1)}</li>
      </ul>
    </div>
  )

}