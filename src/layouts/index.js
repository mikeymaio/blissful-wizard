import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import StoreContext, { defaultStoreContext } from '../context/store'
import Header from '../components/header'
import IntroAnimation from '../components/intro_animation'
import '../components/all.sass'
import { navigate } from '@reach/router'
import { fairyDustCursor } from '../utils/fairy-dust.js'
import background from '../images/trippy-background4.jpg'
import logo from '../images/bw-logo.svg'

const isBrowser = typeof window !== 'undefined'

class Layout extends Component {
  getlocalStorage(value) {
    try {
      return JSON.parse(localStorage.getItem(value))
    } catch (e) {
      return ''
    }
  }

  state = {
    store: {
      ...defaultStoreContext,
      customerAccessToken: this.getlocalStorage('customerAccessToken'),
      addVariantToCart: (variantId, quantity) => {
        this.setState(state => ({
          store: {
            ...state.store,
            adding: true,
          },
        }))

        const { checkout, client } = this.state.store
        const checkoutId = checkout.id
        const lineItemsToUpdate = [
          { variantId, quantity: parseInt(quantity, 10) },
        ]

        return client.checkout
          .addLineItems(checkoutId, lineItemsToUpdate)
          .then(checkout => {
            this.setState(state => ({
              store: {
                ...state.store,
                checkout,
                adding: false,
              },
            }))
          })
      },
      addVariantToCartAndBuyNow: (variantId, quantity) => {
        this.setState(state => ({
          store: {
            ...state.store,
            adding: true,
          },
        }))

        const { checkout, client } = this.state.store
        const checkoutId = checkout.id
        const lineItemsToUpdate = [
          { variantId, quantity: parseInt(quantity, 10) },
        ]
        return client.checkout
          .addLineItems(checkoutId, lineItemsToUpdate)
          .then(checkout => {
            this.setState(state => ({
              store: {
                ...state.store,
                checkout,
                adding: false,
              },
            }))
            navigate(checkout.webUrl)
          })
      },
      removeLineItem: (client, checkoutID, lineItemID) => {
        return client.checkout
          .removeLineItems(checkoutID, [lineItemID])
          .then(resultat => {
            this.setState(state => ({
              store: {
                ...state.store,
                checkout: resultat,
              },
            }))
          })
      },
      updateLineItem: (client, checkoutID, lineItemID, quantity) => {
        const lineItemsToUpdate = [
          { id: lineItemID, quantity: parseInt(quantity, 10) },
        ]
        return client.checkout
          .updateLineItems(checkoutID, lineItemsToUpdate)
          .then(resultat => {
            this.setState(state => ({
              store: {
                ...state.store,
                checkout: resultat,
              },
            }))
          })
      },
      updateFilterType: type => {
        this.setState(state => ({
          store: {
            ...state.store,
            filteredType: type,
          },
        }))
      },
      updateFilterSort: sort => {
        this.setState(state => ({
          store: {
            ...state.store,
            filteredSort: sort,
          },
        }))
      },
      setValue: value => {
        isBrowser &&
          localStorage.setItem('customerAccessToken', JSON.stringify(value))
        this.setState(state => ({
          store: {
            ...state.store,
            customerAccessToken: value,
          },
        }))
      },
    },
  }

  async initializeCheckout() {
    // Check if card exits already
    const isBrowser = typeof window !== 'undefined'
    const existingCheckoutID = isBrowser
      ? localStorage.getItem('shopify_checkout_id')
      : null

    const setCheckoutInState = checkout => {
      if (isBrowser) {
        localStorage.setItem('shopify_checkout_id', JSON.stringify(checkout.id))
      }

      this.setState(state => ({
        store: {
          ...state.store,
          checkout,
        },
      }))
    }

    const createNewCheckout = () => this.state.store.client.checkout.create()
    const fetchCheckout = id => this.state.store.client.checkout.fetch(id)

    if (existingCheckoutID) {
      try {
        const checkout = await fetchCheckout(existingCheckoutID)

        // Make sure this cart hasn’t already been purchased.
        if (!checkout.completedAt) {
          setCheckoutInState(checkout)
          return
        }
      } catch (e) {
        localStorage.setItem('shopify_checkout_id', null)
      }
    }

    const newCheckout = await createNewCheckout()
    setCheckoutInState(newCheckout)
  }

  initFairyDust() {
    // const fairyDustContainer = document.querySelector('.fairy-container')
    // if (!fairyDustContainer || !!this.removeFairyDust) {
    //   return
    // } else {
    //   this.removeFairyDust = fairyDustCursor()
    // }
  }

  componentDidMount() {
    this.initializeCheckout()
    this.initFairyDust()
  }

  componentDidUpdate() {
    this.initFairyDust()
  }

  componentWillUnmount() {
    this.removeFairyDust()
  }

  render() {
    const { children } = this.props

    return (
      <StoreContext.Provider value={this.state.store}>
        <StaticQuery
          query={graphql`
            query SiteTitleQuery {
              site {
                siteMetadata {
                  title
                }
              }
            }
          `}
          render={data => (
            <>
              <Header siteTitle={data.site.siteMetadata.title} />
              <div
                style={{
                  background: `linear-gradient( rgba(250, 250, 250, 0.8), rgba(250, 250, 250, 0.3) ), url('${background}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                  minHeight: 'calc(100vh - 52px)',
                  width: '100vw',
                  paddingTop: 52,
                }}
              >
                {children}
              </div>
              <footer className="footer">
                <img
                  src={logo}
                  alt="Blissful Wizard Logo"
                  style={{ height: 80 }}
                />
                <div
                  className="content has-text-centered"
                  style={{ backgroundColor: 'transparent' }}
                >
                  <p style={{ marginBottom: 0 }}>
                    <strong>Blissful Wizard, LLC &#169;2020</strong>
                  </p>
                  <div className="button-container">
                    <a
                      className="button is-dark"
                      style={{ marginRight: '10px' }}
                      target="_blank"
                      rel="noopener noreferrer"
                      href="#"
                    >
                      Store Policies
                    </a>
                    <a
                      className="button is-dark"
                      target="_blank"
                      rel="noopener noreferrer"
                      href="#"
                    >
                      Legal
                    </a>
                  </div>
                </div>
              </footer>
              <div
                className="fairy-container"
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 10000000,
                  pointerEvents: 'none',
                }}
              ></div>
              <IntroAnimation />
            </>
          )}
        />
      </StoreContext.Provider>
    )
  }
}
Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
