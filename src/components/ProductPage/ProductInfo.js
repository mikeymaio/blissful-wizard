import React from 'react'

const ProductInfo = ({ product, selectedVariantPrice }) => {
  return (
    <>
      <p className="has-text-weight-semibold is-size-2 has-text-white">
        {product.title}
      </p>
      <p className="is-size-4 has-text-white">
        ${selectedVariantPrice || product.variants[0].price}
      </p>
    </>
  )
}

export default ProductInfo
