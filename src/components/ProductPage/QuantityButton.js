import React from 'react'

const QuantityButton = ({ quantity, setQuantity, available }) => {
  const increaseQuantity = () => {
    !!available && setQuantity(q => q + 1)
  }
  const decreaseQuantity = () => {
    !!available && setQuantity(q => (q <= 1 ? 1 : q - 1))
  }
  return (
    <div className="field">
      <label className="label has-text-white">Quantity </label>
      <div className="control">
        <div className="field has-addons">
          <div className="control">
            <button className="button" onClick={decreaseQuantity}>
              -
            </button>
          </div>
          <div className="control">
            <button className="button">{!!available ? quantity : '0'}</button>
          </div>
          <div className="control">
            <button className="button" onClick={increaseQuantity}>
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuantityButton
