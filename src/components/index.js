import React from 'react'
import { navigate } from "gatsby"
import Chart from '../components/chart'
import Stats from '../components/stats'

const londonBoroughs = [
  ['All boroughs',''],
  ['Barking and Dagenham','barking-and-dagenham'],
  ['Bexley','bexley'],
  ['Barnet','barnet'],
  ['Brent','brent'],
  ['Bromley','bromley'],
  ['Camden','camden'],
  ['Croydon','croydon'],
  ['Ealing','ealing'],
  ['Enfield','enfield'],
  ['Greenwich','greenwich'],
  ['Hackney and City of London','hackney-and-city-of-london'],
  ['Hammersmith and Fulham','hammersmith-and-fulham'],
  ['Haringey','haringey'],
  ['Harrow','harrow'],
  ['Havering','havering'],
  ['Hillingdon','hillingdon'],
  ['Hounslow','hounslow'],
  ['Islington','islington'],
  ['Kensington and Chelsea','kensington-and-chelsea'],
  ['Kingston upon Thames','kingston-upon-thames'],
  ['Lambeth','lambeth'],
  ['Lewisham','lewisham'],
  ['Merton','merton'],
  ['Newham','newham'],
  ['Redbridge','redbridge'],
  ['Richmond upon Thames','richmond-upon-thames'],
  ['Southwark','southwark'],
  ['Sutton','sutton'],
  ['Tower Hamlets','tower-hamlets'],
  ['Waltham Forest','waltham-forest'],
  ['Wandsworth','wandsworth'],
  ['Westminster','westminster']]

export default ({pageContext}) => {

  const rawData = pageContext.data
  const boroughs = pageContext.borough

  return (
    <div>
      <div className="container">
        <h1>Covid-19 London</h1>
        <p>Daily updated data of Covid-19 cases in the boroughs of London</p>        
        <select name="borough" className="selector" multiple={false} onChange={(e) => navigate(`/${e.target.value}`)} defaultValue={pageContext.slug}>          
          {londonBoroughs.map((element) => (            
            <option key={element[1]} value={element[1]}>{element[0]}</option>                      
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
