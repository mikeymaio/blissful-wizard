import React from 'react'
import { find } from 'lodash/find'

const Size = ({ size, setSize, products }) => {
  const productSizes = []
  const sizes = []
  sizes.push(
    <option value="all" key="-1">
      All
    </option>
  )

  products.map((t, i) => {
    let type = t.node.productType
    if (!productSizes.includes(type) && type.length > 0) {
      productSizes.push(type)
      sizes.push(
        <option key={i} value={type}>
          {type}
        </option>
      )
    }
    return null
  })

  productSizes.sort()

  return (
    <label
      htmlFor="filter"
      className="has-text-weight-semibold is-uppercase has-text-white"
    >
      SIZE:
      <div className="field">
        <div className="control">
          <div className="select">
            <select
              defaultvalues={size}
              onChange={e => setSize(e.target.value)}
              id="filter"
            >
              {sizes}
            </select>
          </div>
        </div>
      </div>
    </label>
  )
}

export default Size
