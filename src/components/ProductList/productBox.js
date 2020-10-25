import React, { useState, useEffect } from 'react'
import Img from 'gatsby-image'
import OutOfStockOverlay from './outOfStockOverlay'

const ProductBox = props => {
  const product = props.product

  const [available, setAvailable] = useState(true)
  const [sizes, setSizes] = useState([])

  const getSizes = variant => {
    const variantSizes = []
    if (variant.selectedOptions && variant.selectedOptions.length) {
      variant.selectedOptions.forEach(v => {
        if (
          v.name?.toLowerCase().indexOf('size') !== -1 &&
          sizes.indexOf(v.value) === -1
        ) {
          sizes.push(v.value)
        }
      })
      setSizes([...sizes, ...variantSizes])
    }
  }

  useEffect(() => {
    product.node.variants.forEach(variant => {
      setAvailable(variant.availableForSale)
      getSizes(variant)
    })
  }, [product])

  const sizeLabel = sizes.length > 1 ? 'Sizes' : 'Size'

  return (
    <div className="box productBox" key={product.node.title}>
      <a href={`/product/${product.node.handle}`}>
        <Img
          fluid={product.node.images[0].localFile.childImageSharp.fluid}
          key={product.node.images[0].localFile.id}
          fadeIn={false}
          loading="eager"
          alt={product.node.title}
        />
        <p
          className="has-text-weight-semibold has-text-black"
          style={{
            marginTop: 10,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {product.node.title}
        </p>
        {!!sizes.length ? (
          <p className="has-text-black">
            {`${sizeLabel}: `}
            {sizes
              .toString()
              .split(',')
              .join(', ')}
          </p>
        ) : null}
        <p className="has-text-white">${product.node.variants[0].price}</p>
      </a>
      {!available && <OutOfStockOverlay />}
    </div>
  )
}

export default ProductBox
