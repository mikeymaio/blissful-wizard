import React from 'react'
import SEO from '../components/seo'
import { graphql } from 'gatsby'
import ProductList from '../components/productList'

const IndexPage = ({ data }) => {
  console.log('data: ', data);
  return (
    <>
      <SEO title="Home" />
      <ProductList data={data} />
    </>
  )
}

export default IndexPage

export const query = graphql`
  query {
    allShopifyProduct(sort: {fields: availableForSale, order: DESC}) {
      edges {
        node {
          availableForSale
          id
          title
          handle
          shopifyId
          createdAt(fromNow: true)
          publishedAt
          productType
          vendor
          priceRange {
            maxVariantPrice {
              amount
            }
          }
          images {
            originalSrc
            id
            localFile {
              childImageSharp {
                fluid(maxWidth: 910) {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
          }
          options {
            id
            name
            values
          }
          variants {
            id
            title
            price
            availableForSale
            shopifyId
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`
