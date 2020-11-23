import React, { useState } from 'react'
import Img from 'gatsby-image/withIEPolyfill'
import Modal from './modal'

const prevNextStyles = {
  outline: 'none',
  border: 'none',
  backgroundColor: 'transparent',
}

const GalleryList = ({ data }) => {
  console.log('data: ', data)
  const { products } = data.shopifyCollection
  console.log('products: ', products)

  const [isLightboxVisible, setLightBoxVisible] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState()

  const cycleLightBox = nextVal => {
    if (nextVal < 0) {
      return setSelectedImageIndex(products.length - 1)
    } else if (nextVal > products.length - 1) {
      return setSelectedImageIndex(0)
    }
    return setSelectedImageIndex(nextVal)
  }

  return (
    <section className="hero">
      <div className="hero-body">
        <div className="container">
          <div
            className="columns is-mobile has-text-centered has-text-white is-size-1"
            style={{
              marginBottom: '60px',
              margin: '0',
              padding: '10px',
              justifyContent: 'center',
            }}
          >
            <h1
              style={{ fontFamily: 'Lobster Two' }}
              className="has-text-centered has-text-white is-size-1"
            >
              GALLERY
            </h1>
          </div>
          <div
            className="columns is-multiline is-mobile"
            style={{ margin: '0' }}
          >
            {/* {products.map((p, i) => { */}
            {products.map((p, i) => {
              let product = p
              return (
                <div
                  className="column is-half-mobile is-half-tablet is-one-third-desktop is-one-quarter-widescreen"
                  style={{ marginBottom: '20px' }}
                  key={product.id}
                  onClick={() => {
                    setSelectedImageIndex(i)
                    setLightBoxVisible(true)
                  }}
                >
                  {/* <div className="box productBox" key={product.title}> */}
                  <Img
                    fluid={product.images[0].localFile.childImageSharp.fluid}
                    key={product.images[0].localFile.id}
                    fadeIn={true}
                    loading="eager"
                    alt={product.title}
                    objectFit="cover"
                    objectPosition="50% 50%"
                  />
                </div>
                // </div>
              )
            })}
          </div>
        </div>
      </div>
      {selectedImageIndex !== undefined && (
        <Modal
          visible={isLightboxVisible}
          width="100vw"
          height="100vh"
          effect="fadeInUp"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClose={() => setLightBoxVisible(false)}
          hideOverflow
          hideOnClickAway
        >
          <div
            style={{
              backgroundColor: 'transparent',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <button
              style={prevNextStyles}
              onClick={() => cycleLightBox(selectedImageIndex - 1)}
              aria-label="view previous photo"
            >
              <i
                style={{ fontSize: 32, color: '#fff' }}
                className="fas fa-chevron-left"
              ></i>
            </button>

            <Img
              fixed={
                products[selectedImageIndex]?.images[0]?.localFile
                  ?.childImageSharp?.fixed
              }
              key={products[selectedImageIndex]?.images[0]?.localFile?.id}
              fadeIn={true}
              loading="eager"
              alt={products[selectedImageIndex]?.title}
              objectFit="contain"
              objectPosition="50% 50%"
            />

            <button
              style={prevNextStyles}
              onClick={() => cycleLightBox(selectedImageIndex + 1)}
              aria-label="view previous photo"
            >
              <i
                style={{ fontSize: 32, color: '#fff' }}
                className="fas fa-chevron-right"
              ></i>
            </button>
          </div>
        </Modal>
      )}
    </section>
  )
}

export default GalleryList
