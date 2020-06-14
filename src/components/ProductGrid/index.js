import React, { useContext, useState } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'

import find from 'lodash/find'

import StoreContext from '~/context/StoreContext'
import { Grid, Product, Title, PriceTag } from './styles'
import { Img } from '~/utils/styles'

const ProductGrid = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext)
  const { allShopifyProduct } = useStaticQuery(
    graphql`
      query {
        allShopifyProduct(sort: { fields: [createdAt], order: DESC }) {
          edges {
            node {
              id
              title
              handle
              createdAt
              tags
              productType
              images {
                id
                originalSrc
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 910) {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                    }
                  }
                }
              }
              variants {
                price
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
  )

  const [productTypeFilter, setProductTypeFilter] = useState('');
  const [productSizeFilter, setProductSizeFilter] = useState('');

  const renderProducts = productList => {
    let productListToRender = productList;
    if (!productList || !productList.length) {
      return <p>No Products found!</p>
    } else if (productTypeFilter || productSizeFilter) {
      if (productTypeFilter) {
        productListToRender = productListToRender.filter(item => item.node.productType.toLowerCase() === productTypeFilter.toLowerCase())
      }
      if (productSizeFilter) {
        productListToRender = productListToRender.filter(
          item => !!find(item.node.variants,
            variant => find(variant.selectedOptions,
              opt => opt.value.toLowerCase() === productSizeFilter.toLowerCase()
            )
          )
        )
      }
      if (productListToRender.length === 0) return <p>No Products found!</p>
    } else {
      productListToRender = productList;
    }
    return (
      productListToRender.map(
            ({
              node: {
                id,
                handle,
                title,
                images: [firstImage],
                variants,
              },
            }) => {
              return (
              <Product key={id}>
                <Link to={`/product/${handle}/`}>
                  {firstImage && firstImage.localFile && (
                    <Img
                      fluid={firstImage.localFile.childImageSharp.fluid}
                      alt={handle}
                    />
                  )}
                </Link>
                <Title>{title}</Title>
                <PriceTag>{getPrice(variants[0].price)}</PriceTag>
              </Product>
            )}
          )
    )
  }

  const getPrice = price =>
    Intl.NumberFormat(undefined, {
      currency: checkout.currencyCode ? checkout.currencyCode : 'USD',
      minimumFractionDigits: 2,
      style: 'currency',
    }).format(parseFloat(price ? price : 0))

  return (
    <>
      <div
        style={{
          width: '100%',
          padding: 10,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <label for="type">Type</label>
        <select id="type" style={{ margin: 10 }} onChange={e => setProductTypeFilter(e.target.value)}>
          <option value="">All</option>
          <option value="shirt">Shirts</option>
          <option value="hoodie">Hoodies</option>
          <option value="dress">Dresses</option>
          <option value="pants">Pants</option>
        </select>
        <label for="type">Size</label>
        <select id="size" style={{ margin: 10 }} onChange={e => setProductSizeFilter(e.target.value)}>
          <option value="">All</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
      </div>
      <Grid>
        {renderProducts(allShopifyProduct.edges)}
      </Grid>
    </>
  )
}

export default ProductGrid
