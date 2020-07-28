import React, { useState, useEffect } from 'react'
import Img from 'gatsby-image'
import OutOfStockOverlay from './outOfStockOverlay';

const ProductBox = props => {
  const product = props.product

  const [available, setAvailable] = useState(true)

  useEffect(() => {
    product.node.variants.forEach(variant => setAvailable(variant.availableForSale))
  }, [product])

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
        <p className="has-text-weight-semibold has-text-black">
          {product.node.title}
        </p>
        <p className="has-text-weight-light has-text-grey">
          ${product.node.variants[0].price}
        </p>
      </a>
      {!available && <OutOfStockOverlay />}
    </div>
  )
}

export default ProductBox
