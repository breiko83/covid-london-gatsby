const fs = require('fs');
require('isomorphic-fetch');
const XLSX = require('xlsx');
const encoding = require('encoding');

const ENDPOINT = 'https://fingertips.phe.org.uk/documents/Historic%20COVID-19%20Dashboard%20Data.xlsx';

const cache = {
  lastFetch: 0,
  data: []
}

async function getData() {

  const timeSinceLastFetch = Date.now() - cache.lastFetch;
  // update data every 3 hours
  if (timeSinceLastFetch <= 10800000) {
    console.log('return cached data');
    
    return cache.data;
  }

  const data = await fetch(ENDPOINT).
    then(res => {

      const parsedData = new Promise((resolve, reject) => {
        const dest = fs.createWriteStream('/tmp/covid-data.xlsx');
        res.body.pipe(dest);

        dest.on('finish', function () {
          var workbook = XLSX.readFile('/tmp/covid-data.xlsx');
          const sheet = workbook.Sheets['UTLAs'];
          const json = XLSX.utils.sheet_to_json(sheet, { range: 7 })
          resolve(json);
        })
      })
      return parsedData;
    });
  cache.lastFetch = Date.now();
  cache.data = data;
  console.log('return fresh data');
  return data;
}



exports.handler = async function (event, context, callback) {
  console.log("queryStringParameters", event.queryStringParameters)

  const covidData = await getData();
  //console.log(covidData);

  const response = {
    statusCode: 200,
    header: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(covidData),
  }

  return response;
}