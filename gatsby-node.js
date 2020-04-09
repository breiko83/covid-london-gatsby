const path = require(`path`)
const _ = require('lodash')
require('isomorphic-fetch')

exports.createPages = async ({ actions }) => {
  const { createPage } = actions

  const londonBoroughs = [
    'All boroughs',
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

  const result = await fetch('https://covid-london.netlify.com/.netlify/functions/covid')
  const resultData = await result.json()

  // default template
  let template = path.resolve(`src/components/index.js`)


  londonBoroughs.forEach((node) => {

    let slug = _.kebabCase(node)

    if(node === "All boroughs"){
      createPage({
        path: `/`,
        component: template,
        context: { borough: [node], slug: slug, data: resultData }, // additional data can be passed via context
      })
    }else{
      createPage({
        path: `/${slug}`,
        component: template,
        context: { borough: [node], slug: slug, data: resultData }, // additional data can be passed via context
      })
    }

  })

  //create index page
  createPage({
    path: `/`,
    component: template,
    context: { borough: londonBoroughs, slug: '/', data: resultData }, // additional data can be passed via context
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  // do nothing here
}