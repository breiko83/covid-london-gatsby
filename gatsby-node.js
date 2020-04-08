const path = require(`path`)
const _ = require('lodash')

exports.createPages = async ({ actions }) => {
  const { createPage } = actions  
  
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


    londonBoroughs.forEach((node) => {

    // default template
    let template = path.resolve(`src/pages/index.js`)
    let slug = _.kebabCase(node)

    createPage({
      path: `/${slug}`,
      component: template,
      context: {borough: node, slug: slug}, // additional data can be passed via context
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  // do nothing here
}