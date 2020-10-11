import React, { useState, useEffect } from 'react'
import SEO from '../components/seo'
import { graphql } from 'gatsby'
import ProductBox from '../components/ProductList/productBox'

const SearchPage = ({ data }) => {
  const [search, setSearch] = useState('')

  useEffect(() => {
    setSearch(
      typeof document !== undefined
        ? document.location.search.substring(7).split('=')[0]
        : ''
    )
  }, [])

  const { edges: products } = data.allShopifyProduct
  return (
    <>
      <SEO title="Search" />
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <div className="field">
              <p className="control has-icons-right">
                <input
                  className="input is-large"
                  name="value"
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search"
                />
                <span className="icon is-right">
                  <i className="fas fa-search"></i>
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="hero">
        <div className="hero-body">
          <div className="hero-body">
            <div className="container">
              <h1 className="is-size-5 has-text-medium">
                RESULTS FOR "{search.toUpperCase()}" :
              </h1>
            </div>
          </div>
          <div className="container">
            <div className="columns is-multiline is-mobile">
              {products
                .filter(
                  p =>
                    p.node.title.toUpperCase().includes(search.toUpperCase()) ||
                    p.node.productType
                      .toUpperCase()
                      .includes(search.toUpperCase()) ||
                    (p.node.title
                      .toUpperCase()
                      .includes(search.toUpperCase()) &&
                      p.node.productType
                        .toUpperCase()
                        .includes(search.toUpperCase()))
                )
                .map((p, i) =>
                  !p ? (
                    <p>Nothings with : {search} </p>
                  ) : (
                    <div
                      className="column is-full-mobile is-half-tablet is-one-third-desktop is-one-quarter-widescreen"
                      style={{ marginBottom: '20px' }}
                      key={i}
                    >
                      <ProductBox product={p} />
                    </div>
                  )
                )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default SearchPage

export const query = graphql`
  query {
    allShopifyProduct(sort: { fields: availableForSale, order: DESC }) {
      edges {
        node {
          availableForSale
          id
          title
          handle
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
          variants {
            id
            title
            price
            availableForSale
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
