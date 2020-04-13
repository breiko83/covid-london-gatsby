import React from "react"
import { Helmet } from "react-helmet"
import { graphql, useStaticQuery } from "gatsby"
import image from "../../static/assets/covid-london.png"

const SiteMetadata = ({ pathname, title }) => {
  const {
    site: {
      siteMetadata: { siteUrl, defaultTitle, description },
    },
  } = useStaticQuery(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          siteUrl
          defaultTitle
          description
        }
      }
    }
  `)

  return (
    <Helmet defer={false} defaultTitle={title ? `${title} | ${defaultTitle}` : defaultTitle}>
      <html lang="en" />
      <link rel="canonical" href={`${siteUrl}${pathname}`} />
      <meta name="docsearch:version" content="2.0" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,shrink-to-fit=no,viewport-fit=cover"      
      />

      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en" />
      <meta property="og:site_name" content={title} />>
      <meta property="og:image" content={`${siteUrl}${image}`} />

    </Helmet>
  )
}

export default SiteMetadata