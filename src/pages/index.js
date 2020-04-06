import React, { useState, useEffect } from 'react'
import Chart from '../components/chart'

const londonBoroughs = [
  'Barking and Dagenham',
  'Bexley',
  'Barnet',
  'Brent',
  'Bromley',
  'Camden',
  'Croydon',
  'Ealing',
  'Enfield',
  'Greenwich',
  'Hackney and City of London',
  'Hammersmith and Fulham',
  'Haringey',
  'Harrow',
  'Havering',
  'Hillingdon',
  'Hounslow',
  'Islington',
  'Kensington and Chelsea',
  'Kingston upon Thames',
  'Lambeth',
  'Lewisham',
  'Merton',
  'Newham',
  'Redbridge',
  'Richmond upon Thames',
  'Southwark',
  'Sutton',
  'Tower Hamlets',
  'Waltham Forest',
  'Wandsworth',
  'Westminster']

export default (props) => {

  const [rawData, setRawData] = useState()
  const [covidData, setCovidData] = useState()
  const [boroughs, setBoroughs] = useState(londonBoroughs)


  useEffect(() => {
    fetch("/.netlify/functions/covid")
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log('fetch Data');
        setRawData(data)
      })
      .catch((err) => {
        console.log('Cannot retrieve data: ', err);
      })
  }, [])

  function handleChange(e){
    setBoroughs(e.target.value)
  }

  return (
    <div>      
      <h1>Covid-19 London</h1>
      <h2>This website shows daily updated data of Covid-19 cases in the boroughs of London</h2>
      <select name="borough" onChange={(e) => handleChange(e)}>
        <option value={londonBoroughs}>All boroughs</option>
        {londonBoroughs.map((element) => (
          <option key={element} value={element}>{element}</option>
        ))}
      </select>
      {rawData &&
        <Chart data={rawData} filter={boroughs} />
      }
    </div>
  )
}
