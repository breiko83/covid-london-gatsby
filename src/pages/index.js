import React, { useState, useEffect } from 'react'
import { navigate } from "gatsby"
import Chart from '../components/chart'
import Stats from '../components/stats'
const _ = require('lodash')

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

export default ({pageContext}) => {

  const [rawData, setRawData] = useState()
  const [boroughs, setBoroughs] = useState(pageContext.borough ? [pageContext.borough] : londonBoroughs)

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

  return (
    <div>
      <div className="container">
        <h1>Covid-19 London</h1>
        <p>Daily updated data of Covid-19 cases in the boroughs of London</p>        
        <select name="borough" className="selector" multiple={false} onChange={(e) => navigate(`/${_.kebabCase(e.target.value)}`)} defaultValue={pageContext.borough}>
          <option value=''>All boroughs</option>
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
        {!rawData &&
        <>
          <div className="loading">Loading..</div>
        </>}
      </div>
      <footer>Data sourced from <a href="https://www.gov.uk/government/publications/covid-19-track-coronavirus-cases">gov.uk</a> | Developed by <a href="http://sharpify.co.uk/">Carlo Schiesaro</a> | For suggestions and feedback please check out my <a href="https://github.com/breiko83/covid-london-gatsby">repository on Github</a>.</footer>
    </div>
  )
}
