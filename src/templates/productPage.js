import React, {
  useContext,
  useState,
  useEffect,
} from 'react' /* eslint-disable */
import SEO from '../components/seo'
import { graphql } from 'gatsby'
import ProductInfo from '../components/ProductPage/ProductInfo'
import StoreContext from '../context/store'
import VariantSelectors from '../components/ProductPage/VariantSelectors'
import QuantityButton from '../components/ProductPage/QuantityButton'
import Buttons from '../components/ProductPage/Buttons'
import Gallery from '../components/ProductPage/Gallery'
import { customTieDyeOptions } from '../components/ProductPage/customTieDyeOptions'
import { Flex, Box } from 'rebass'

const [
  patchOptions,
  patchPlacementOptionsTops,
  patchPlacementOptionsBottoms,
  patternOptions,
  color1Options,
  color2Options,
  color3Options,
] = customTieDyeOptions

const productPage = ({ data }) => {
  const context = useContext(StoreContext)
  const product = data.shopifyProduct
  const isCustom = product.tags.indexOf('custom') > -1
  const isBottoms = product.tags.indexOf('bottoms') > -1

  const [quantity, setQuantity] = useState(1)
  const [variant, setVariant] = useState(product.variants[0])
  const productVariant =
    context.client.product.helpers.variantForOptions(product, variant) ||
    variant

  const [selectedVariantPrice, setSelectedVariantPrice] = useState(undefined)

  const [customAttributes, setCustomAttributes] = useState([])
  const [available, setAvailable] = useState(productVariant.availableForSale)
  const [isReverse, setIsReverse] = useState(false)

  useEffect(() => {
    let defaultOptionValues = {}
    product.options.forEach(selector => {
      defaultOptionValues[selector.name] = selector.values[0]
    })
    setVariant(defaultOptionValues)
  }, [])

  useEffect(() => {
    checkAvailability(product.shopifyId)
    setSelectedVariantPrice(productVariant.price)
  }, [productVariant])

  const checkAvailability = productId => {
    context.client.product.fetch(productId).then(product => {
      // this checks the currently selected variant for availability
      const result = product.variants.filter(
        variant => variant.id === productVariant.shopifyId
      )
      setAvailable(result[0].available)
    })
  }

  const handleOptionChange = event => {
    const { target } = event
    setVariant(prevState => ({
      ...prevState,
      [target.name]: target.value,
    }))

    const isCustomAttribute =
      customTieDyeOptions.findIndex(o => o.name === target.name) > -1

    if (isCustomAttribute) {
      if (target.name === 'Pattern' && target.value === 'Reverse Tiedye') {
        setIsReverse(true)
      } else if (
        target.name === 'Pattern' &&
        target.value !== 'Reverse Tiedye'
      ) {
        setIsReverse(false)
      }
      setCustomAttributes(prevState => [
        ...prevState,
        {
          key: target.name,
          value: target.value,
        },
      ])
    }
  }

  return (
    <>
      <SEO
        title={product.title}
        description={`${product.description} TAGS: [${product.tags}]`}
      />
      <section className="hero is-fullheight-with-navbar">
        <div className="hero-body" style={{ display: 'block' }}>
          <div className="container">
            {!available && (
              <h3 className="has-text-centered has-text-danger is-size-3">
                This product is out of stock.
              </h3>
            )}
            <Flex flexDirection={['column', null, 'row']} pt={3} px={4}>
              <Gallery product={product} />

              <Box
                flexDirection="column"
                width={[1, null, 2.5 / 5]}
                px={2}
                data-product-info
                order={3}
              >
                <div>
                  <ProductInfo
                    product={product}
                    selectedVariantPrice={selectedVariantPrice}
                  />
                  <div className="columns">
                    {product.options.map(options => (
                      <div className="column">
                        <VariantSelectors
                          key={options.id.toString()}
                          onChange={handleOptionChange}
                          options={options}
                          fullWidth={product.options.length > 1}
                        />
                      </div>
                    ))}
                  </div>
                  {!isCustom && <br />}

                  {isCustom && (
                    <>
                      <div className="columns">
                        <div className="column">
                          <VariantSelectors
                            key={patternOptions.id}
                            onChange={handleOptionChange}
                            options={patternOptions}
                          />
                        </div>
                        <div className="column">
                          <VariantSelectors
                            key={
                              isBottoms
                                ? patchPlacementOptionsBottoms.id
                                : patchPlacementOptionsTops.id
                            }
                            onChange={handleOptionChange}
                            options={
                              isBottoms
                                ? patchPlacementOptionsBottoms
                                : patchPlacementOptionsTops
                            }
                          />
                        </div>
                      </div>
                      <div className="columns">
                        <div className="column">
                          <VariantSelectors
                            key={color1Options.id}
                            onChange={handleOptionChange}
                            options={color1Options}
                            disabled={isReverse}
                            placeholder={'Choose Color 1'}
                          />
                        </div>
                        <div className="column">
                          <VariantSelectors
                            key={color2Options.id}
                            onChange={handleOptionChange}
                            options={color2Options}
                            disabled={isReverse}
                            placeholder={'Choose Color 2'}
                          />
                        </div>
                      </div>
                      <div className="columns">
                        <div className="column">
                          <VariantSelectors
                            key={color3Options.id}
                            onChange={handleOptionChange}
                            options={color3Options}
                            disabled={isReverse}
                            placeholder={'Choose Color 3'}
                          />
                        </div>
                        <div className="column">
                          <QuantityButton
                            quantity={quantity}
                            setQuantity={setQuantity}
                            available={available}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <br />

                  <Buttons
                    context={context}
                    available={available}
                    quantity={quantity}
                    productVariant={productVariant}
                    customAttributes={customAttributes}
                  />
                  <hr />
                  {product.descriptionHtml && (
                    <div
                      key={`body`}
                      id="content"
                      className="content py-4 px-4"
                      dangerouslySetInnerHTML={{
                        __html: product.descriptionHtml,
                      }}
                    />
                  )}
                </div>
              </Box>
            </Flex>
          </div>
          <div className="container has-text-centered py-5">
            <a className="is-medium button" href="/">
              {' '}
              ← Back to the Store
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default productPage

export const query = graphql`
  query($id: String!) {
    shopifyProduct(handle: { eq: $id }) {
      handle
      id
      title
      handle
      tags
      productType
      description
      descriptionHtml
      shopifyId
      options {
        id
        name
        values
      }
      variants {
        id
        title
        price
        availableForSale
        shopifyId
        selectedOptions {
          name
          value
        }
      }
      images {
        originalSrc
        id
        localFile {
          childImageSharp {
            fluid(maxWidth: 910) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
      }
    }
  }
`
