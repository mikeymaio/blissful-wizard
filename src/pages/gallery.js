import React from 'react'
import SEO from '../components/seo'
import { graphql } from 'gatsby'
import GalleryList from '../components/galleryList'

const GalleryPage = ({ data }) => {
  return (
    <>
      <SEO title="Products" />
      <GalleryList data={data} />
    </>
  )
}

export default GalleryPage

export const query = graphql`
  query {
    shopifyCollection(title: { eq: "Gallery" }) {
      title
      products {
        availableForSale
        images {
          id
          originalSrc
          localFile {
            childImageSharp {
              fluid(maxWidth: 910) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
              fixed(width: 400) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
        id
        title
        tags
        vendor
        priceRange {
          maxVariantPrice {
            amount
          }
        }
        handle
        createdAt(fromNow: true)
        publishedAt
        productType
        options {
          id
          name
          values
        }
        variants {
          id
          availableForSale
          shopifyId
          title
          price
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
`
