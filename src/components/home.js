import React, { useContext, useState, useEffect } from 'react'
// import StoreContext from '../context/store'
// import ProductBox from './ProductList/productBox'
// import Sort from './Filter/sort'
// import Collection from './Filter/collection'
// import Size from './Filter/size'

import Img from 'gatsby-image/withIEPolyfill'

const Landing = ({ data }) => {
  console.log('data: ', data)
  const collections = data?.allShopifyCollection?.edges

  // console.log('collections: ', collections)

  const images = collections.map(c => ({
    ...c.node.image,
    title: c.node.title,
  }))

  console.log('images: ', images)

  return (
    <section className="hero">
      <div className="hero-body">
        <div className="container">
          {images?.map(image => (
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
          ))}
        </div>
      </div>
    </section>
  )
}

export default Landing
