import React, { useState, useEffect } from 'react'
import Chart from '../components/chart'
import Stats from '../components/stats'

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
      <div className="container">
        <h1>Covid-19 London</h1>
        <p>Daily updated data of Covid-19 cases in the boroughs of London</p>        
        <select name="borough" className="selector" onChange={(e) => handleChange(e)}>
          <option value={londonBoroughs}>All boroughs</option>
          {londonBoroughs.map((element) => (
            <option key={element} value={element}>{element}</option>
          ))}
        </select>
        {rawData &&
          <>
            <Chart data={rawData} filter={boroughs} />     
            <Stats data={rawData} filter={boroughs} />    
            <p>Please help flatten the curve <a href="https://www.gov.uk/coronavirus">#StayHome</a> 🏚</p> 
          </>
        }        
      </div>
      <footer>Data sourced from <a href="https://www.gov.uk/government/publications/covid-19-track-coronavirus-cases">gov.uk</a> | Developed by <a href="http://sharpify.co.uk/">Carlo Schiesaro</a></footer>
    </div>
  )
}
