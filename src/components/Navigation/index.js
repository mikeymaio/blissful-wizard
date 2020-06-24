import React, { useContext } from 'react'
import reduce from 'lodash/reduce'
import PropTypes from 'prop-types'

import StoreContext from '~/context/StoreContext'
import {
  CartCounter,
  Container,
  MenuLink,
  MobileMenuLink,
  Wrapper,
  LogoIcon,
  Img,
  Title,
} from './styles'

const useQuantity = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext)
  const items = checkout ? checkout.lineItems : []
  const total = reduce(items, (acc, item) => acc + item.quantity, 0)
  return [total !== 0, total]
}

const Navigation = ({ siteTitle, logo, wizardIcon }) => {
  const [hasItems, quantity] = useQuantity()

  const toTitleCase = phrase => {
    return phrase
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  }

  return (
    <Wrapper
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
      }}
    >
      <Container>
        <MobileMenuLink to="/" />
        <MobileMenuLink to="/">
          <img
            src={wizardIcon}
            alt={siteTitle}
            style={{
              height: 110,
              objectFit: 'contain',
              objectPosition: 'center center',
              marginLeft: 10,
            }}
          />
        </MobileMenuLink>
        <MenuLink
          to="/"
          style={{
            // display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            height: 75,
            // position: 'relative',
            // bottom: 10,
            marginLeft: 10,
            // height: '100%',
          }}  
        >
          <LogoIcon
            src={wizardIcon}
            alt={siteTitle}
            style={{
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center center',
            }}
          />
        </MenuLink>
        <MenuLink
          to="/"
          style={{
            flex: 3,
            justifyContent: 'center',
          }}
        >
          <Title>
            {toTitleCase(siteTitle)}
          </Title>

        </MenuLink>
        <MenuLink
          to="/cart"
          style={{ display: 'flex', position: 'relative', marginRight: 10, justifyContent: 'flex-end', }}
        >
          {hasItems && <CartCounter>{quantity}</CartCounter>}
          <span
            className="material-icons-outlined"
            style={{
              fontFamily: 'Material Icons',
              color: '#000',
              fontSize: 36,
            }}
          >
            shopping_cart
          </span>
        </MenuLink>
      </Container>
    </Wrapper>
  )
}

Navigation.propTypes = {
  siteTitle: PropTypes.string,
}

Navigation.defaultProps = {
  siteTitle: ``,
}

export default Navigation
