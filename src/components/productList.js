import React, { useContext, useState, useEffect } from 'react'
import StoreContext from '../context/store'
import ProductBox from './ProductList/productBox'
import Sort from './Filter/sort'
import Collection from './Filter/collection'
import Size from './Filter/size'

const ProductList = ({ data }) => {
  const { products } = data.shopifyCollection
  const context = useContext(StoreContext)
  const [type, setType] = useState(context.filteredType)
  const [sort, setSort] = useState(context.filteredSort)
  const [size, setSize] = useState(context.filteredSize)

  useEffect(() => {
    context.updateFilterType(type)
  }, [type])

  useEffect(() => {
    context.updateFilterSort(sort)
  }, [sort])

  return (
    <section className="hero">
      <div className="hero-body">
        <div className="container">
          <div
            className="columns is-mobile"
            style={{ marginBottom: '60px', margin: '0', padding: '10px' }}
          >
            <div className="column is-2-desktop is-6-mobile">
              <Sort sort={sort} setSort={setSort} />
            </div>
            <div className="column is-2-desktop is-6-mobile">
              <Collection type={type} setType={setType} products={products} />
            </div>
            {/* <div className="column is-2-desktop is-6-mobile">
              <Size size={size} setSize={setSize} products={products} />
            </div> */}
          </div>
          <div
            className="columns is-multiline is-mobile"
            style={{ margin: '0' }}
          >
            {products
              .filter(p =>
                context.filteredType === 'all'
                  ? p
                  : p.productType.includes(context.filteredType)
              )
              .sort(
                context.filteredSort === 'featured'
                  ? a => a
                  : context.filteredSort === 'low'
                  ? (a, b) => a.variants[0].price - b.variants[0].price
                  : context.filteredSort === 'high'
                  ? (a, b) => b.variants[0].price - a.variants[0].price
                  : context.filteredSort === 'Z-A'
                  ? (a, b) => b.title.localeCompare(a.title)
                  : context.filteredSort === 'A-Z'
                  ? (a, b) => a.title.localeCompare(b.title)
                  : null
              )
              .map((p, i) => {
                let product = p
                return (
                  <div
                    className="column is-full-mobile is-half-tablet is-one-third-desktop is-one-quarter-widescreen"
                    style={{ marginBottom: '20px' }}
                    key={product.id}
                  >
                    <ProductBox product={product} />
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductList
