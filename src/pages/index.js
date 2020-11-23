import React from 'react'
import SEO from '../components/seo'
import { graphql } from 'gatsby'
// import ProductList from '../components/productList'
import Home from '../components/home'

const IndexPage = ({ data }) => {
  return (
    <>
      <SEO title="Home" />
      <Home data={data} />
    </>
  )
}

export default IndexPage

export const query = graphql`
  query {
    allShopifyCollection {
      edges {
        node {
          id
          title
          products {
            images {
              id
              originalSrc
            }
          }
          image {
            id
            src
            localFile {
              id
              childImageSharp {
                fluid(maxWidth: 910) {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
          }
        }
      }
    }
  }
`

// export const query = graphql`
//   query {
//     shopifyCollection(title: { eq: "All Products" }) {
//       title
//       products {
//         availableForSale
//         images {
//           id
//           originalSrc
//           localFile {
//             childImageSharp {
//               fluid(maxWidth: 910) {
//                 ...GatsbyImageSharpFluid_withWebp_noBase64
//               }
//             }
//           }
//         }
//         id
//         title
//         tags
//         vendor
//         priceRange {
//           maxVariantPrice {
//             amount
//           }
//         }
//         handle
//         createdAt(fromNow: true)
//         publishedAt
//         productType
//         options {
//           id
//           name
//           values
//         }
//         variants {
//           id
//           availableForSale
//           shopifyId
//           title
//           price
//           selectedOptions {
//             name
//             value
//           }
//         }
//       }
//     }
//   }
// `
