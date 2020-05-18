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

  return (
    <Wrapper
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        height: 120,
      }}
    >
      <Container>
        <MobileMenuLink to="/">
          <img
            src={logo}
            alt={siteTitle}
            style={{
              height: 125,
              objectFit: 'cover',
              objectPosition: 'center center',
              marginLeft: 10,
            }}
          />
        </MobileMenuLink>
        <MenuLink
          to="/"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            height: 75,
            position: 'relative',
            bottom: 10,
          }}
        >
          <Title
            style={{
              letterSpacing: 2,
              margin: 0,
              position: 'relative',
              bottom: '-10px',
              color: '#8a25b1',
              background: '-webkit-linear-gradient(left, #000000, #8a25b1)',
              webkitBackgroundClip: 'text',
              webkitTextFillColor: 'transparent',
              fontSize: '2em',
            }}
          >
            {siteTitle}
          </Title>
          <LogoIcon
            src={wizardIcon}
            alt={siteTitle}
            style={{
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center center',
              marginLeft: 10,
            }}
          />
        </MenuLink>
        <MenuLink
          to="/cart"
          style={{ position: 'absolute', right: 30, display: 'flex' }}
        >
          {hasItems && <CartCounter>{quantity}</CartCounter>}
          <span
            className="material-icons-outlined"
            style={{
              fontFamily: 'Material Icons',
              background: '-webkit-linear-gradient(#8a25b1, #000000)',
              webkitBackgroundClip: 'text',
              webkitTextFillColor: 'transparent',
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
