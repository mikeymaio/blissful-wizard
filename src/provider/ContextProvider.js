import React, { useState, useEffect } from 'react'
import Client from 'shopify-buy'
import Context, { defaultStoreContext } from '../context/store'
import { navigate } from '@reach/router'

const isBrowser = typeof window !== 'undefined'

const ContextProvider = ({ children }) => {
  const getlocalStorage = value => {
    try {
      return JSON.parse(localStorage.getItem(value))
    } catch (e) {
      return ''
    }
  }

  const [store, updateStore] = useState(defaultStoreContext)
  let isRemoved = false

  useEffect(() => {
    const initializeCheckout = async () => {
      // Check for an existing cart.
      const isBrowser = typeof window !== 'undefined'
      const existingCheckoutID = isBrowser
        ? localStorage.getItem('shopify_checkout_id')
        : null

      const setCheckoutInState = checkout => {
        if (isBrowser) {
          localStorage.setItem('shopify_checkout_id', checkout.id)
        }

        updateStore(prevState => {
          return { ...prevState, checkout }
        })
      }

      const createNewCheckout = () => store.client.checkout.create()
      const fetchCheckout = id => store.client.checkout.fetch(id)

      if (existingCheckoutID) {
        try {
          const checkout = await fetchCheckout(existingCheckoutID)
          // Make sure this cart hasn’t already been purchased.
          if (!isRemoved && !checkout.completedAt) {
            setCheckoutInState(checkout)
            return
          }
        } catch (e) {
          localStorage.setItem('shopify_checkout_id', null)
        }
      }

      const newCheckout = await createNewCheckout()
      if (!isRemoved) {
        setCheckoutInState(newCheckout)
      }
    }

    initializeCheckout()
  }, [store.client.checkout])

  useEffect(
    () => () => {
      isRemoved = true
    },
    []
  )

  return (
    <Context.Provider
      value={{
        ...store,
        customerAccessToken: getlocalStorage('customerAccessToken'),
        addVariantToCart: (variantId, quantity) => {
          if (variantId === '' || !quantity) {
            console.error('Both a size and quantity are required.')
            return
          }

          updateStore(prevState => {
            return { ...prevState, adding: true }
          })

          const { checkout, client } = store

          const checkoutId = checkout.id
          const lineItemsToUpdate = [
            { variantId, quantity: parseInt(quantity, 10) },
          ]

          return client.checkout
            .addLineItems(checkoutId, lineItemsToUpdate)
            .then(checkout => {
              updateStore(prevState => {
                return { ...prevState, checkout, adding: false }
              })
            })
        },
        addVariantToCartAndBuyNow: (variantId, quantity) => {
          if (variantId === '' || !quantity) {
            console.error('Both a size and quantity are required.')
            return
          }

          updateStore(prevState => {
            return { ...prevState, adding: true }
          })

          const { checkout, client } = store

          const checkoutId = checkout.id
          const lineItemsToUpdate = [
            { variantId, quantity: parseInt(quantity, 10) },
          ]

          return client.checkout
            .addLineItems(checkoutId, lineItemsToUpdate)
            .then(checkout => {
              updateStore(prevState => {
                return { ...prevState, checkout, adding: false }
              })
              navigate(checkout.webUrl)
            })
        },
        removeLineItem: (client, checkoutID, lineItemID) => {
          return client.checkout
            .removeLineItems(checkoutID, [lineItemID])
            .then(res => {
              updateStore(prevState => {
                return { ...prevState, checkout: res }
              })
            })
        },
        updateLineItem: (client, checkoutID, lineItemID, quantity) => {
          const lineItemsToUpdate = [
            { id: lineItemID, quantity: parseInt(quantity, 10) },
          ]

          return client.checkout
            .updateLineItems(checkoutID, lineItemsToUpdate)
            .then(res => {
              updateStore(prevState => {
                return { ...prevState, checkout: res }
              })
            })
        },
        updateFilterType: type => {
          updateStore(prevState => {
            return { ...prevState, filteredType: type }
          })
        },
        updateFilterSize: size => {
          updateStore(prevState => {
            return { ...prevState, filteredSize: size }
          })
        },
        updateFilterSort: sort => {
          updateStore(prevState => {
            return { ...prevState, filteredSort: sort }
          })
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
      }}
    >
      {children}
    </Context.Provider>
  )
}
export default ContextProvider
