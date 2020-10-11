require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Blissful Wizard`,
    description: `Buy handmade tie-dyes and more at The Blissful Wizard! Shop pre-made and customizable shirts, shorts, pants, and hoodies, all from your favorite wizard in the East Village, NYC!`,
    keywords: `tiedye,tie-dye,tie,dye,the blissful wizard,blissful wizard,t-shirt,hoodie,sweatsuit,pants,shorts,set,sets,clothing,apparel,grateful,dead,phish,hippie,hippy,psychedelic,trippy,east village,nyc,new york,mushroom,strain,weed,thc`,
    author: `@mikeymaio`,
    siteUrl: `https://www.theblissfulwizard.com`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-layout`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-apollo-shopify`,
      options: {
        shopName: process.env.SHOP_NAME,
        accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
      },
    },
    {
      resolve: 'gatsby-plugin-purgecss',
      options: {
        develop: true,
        purgeOnly: ['/all.sass'],
      },
    },
    {
      resolve: 'gatsby-source-shopify',
      options: {
        shopName: process.env.SHOP_NAME,
        accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
        apiVersion: '2020-01',
        paginationSize: 250,
        includeCollections: ['shop', 'content'],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-180259782-1',
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Blissful Wizard`,
        short_name: `Blissful Wizard`,
        start_url: `/`,
        background_color: `#FFF`,
        theme_color: `#FFF`,
        display: `minimal-ui`,
        icon: `src/images/bw-logo.jpg`,
      },
    },
  ],
}
