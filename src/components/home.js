import React, { useContext, useState, useEffect } from 'react'
// import StoreContext from '../context/store'
// import ProductBox from './ProductList/productBox'
// import Sort from './Filter/sort'
// import Collection from './Filter/collection'
// import Size from './Filter/size'

import Img from 'gatsby-image/withIEPolyfill'
import Carousel from './carousel'

const Landing = ({ data }) => {
  const collections = data?.allShopifyCollection?.edges

  const images = collections.map(c => ({
    ...c.node.image,
    title: c.node.title,
    description: c.node.description,
    descriptionHtml: c.node.descriptionHtml,
  }))

  return (
    <section className="hero">
      {/* <div style={{ width: '100vw' }}> */}
      <Carousel style={{ height: '95vh' }}>
        {images?.map(image => (
          <div
            data-src={image.src}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* <div
              className="has-text-black has-text-centered is-size-4"
              style={{
                position: 'relative',
                backgroundColor: 'rgba(250,250,250,0.7)',
              }}
            >
              {image.descriptionHtml}
            </div>
            <p
              className="has-text-black has-text-centered is-size-4"
              style={{ position: 'relative' }}
            >
              {image.description}
            </p> */}
          </div>
        ))}
      </Carousel>
      {/* </div> */}
      <div className="hero-body">
        <div className="container">
          {/* {images?.map(image => (
            <div className="box">
              <Img
                fluid={image.localFile.childImageSharp.fluid}
                key={image.localFile.id}
                fadeIn={true}
                loading="eager"
                alt={image.title}
                objectFit="cover"
                objectPosition="50% 50%"
              />
            </div>
          ))} */}
        </div>
      </div>
    </section>
  )
}

export default Landing
