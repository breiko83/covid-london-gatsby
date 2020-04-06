import React, { useState, useEffect } from 'react'
import Chart from './chart'

export default () => {

  const [covidData, setCovidData] = useState()


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

  useEffect(() => {

    fetch("/.netlify/functions/covid")
      .then((response) => {
        return response.json()
      })
      .then((data) => {       

        let utlas = []

        let boroughs = [];
                
        for (let i = 0; i < data.length; i++) {
          let array = [] 
          let label = data[i]['Area Name']

          if(!londonBoroughs.includes(label))
            continue;

          boroughs.push(label);
                    

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
        setCovidData(utlas) 
        console.log(londonBoroughs.length, boroughs.length);
        

      })
      .catch((err) => {
        console.log('Cannot retrieve data: ', err);
      })
  }, [])


  return (
    <div>
      <h1>Covid-19 London cases</h1>
      <h2>This website shows daily updated data of Covid-19 cases in England UTLA (Upper Tear Local Authorities)</h2>
      {covidData &&
        <Chart data={covidData} />
      }
    </div>
  )
}
