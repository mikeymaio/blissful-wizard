import React, { useContext, useState, useEffect } from 'react'
// import Img from 'gatsby-image'
import Img from 'gatsby-image/withIEPolyfill'
// import StoreContext from '../context/store'
// import ProductBox from './ProductList/productBox'
// import Sort from './Filter/sort'
// import Collection from './Filter/collection'
// import Size from './Filter/size'

const GalleryList = ({ data }) => {
  console.log('data: ', data)
  const { products } = data.shopifyCollection
  console.log('products: ', products)

  const [isLightboxVisible, setLightBoxVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState()

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
    </section>
  )
}

export default GalleryList
