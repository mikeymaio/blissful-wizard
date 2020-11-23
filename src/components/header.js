import { Link } from 'gatsby' /* eslint-disable */
import PropTypes from 'prop-types'
import React, { useContext, useState, useEffect, useRef } from 'react'
import Drawer from 'rc-drawer'
import StoreContext from '../context/store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faShoppingBag,
  faUser,
  faSearch,
} from '@fortawesome/free-solid-svg-icons'

const countQuantity = lineItems => {
  let quantity = 0

  lineItems.forEach(item => {
    quantity = quantity + item.quantity
  })
  return quantity
}

const Header = ({ siteTitle }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const context = useContext(StoreContext)
  const { checkout } = context
  const [quantity, setQuantity] = useState(
    countQuantity(checkout ? checkout.lineItems : [])
  )
  const [modal, setModal] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    setQuantity(countQuantity(checkout ? checkout.lineItems : []))
  }, [checkout])

  const openSearchBar = () => {
    setModal(true)
  }
  const closeSearchBar = () => {
    setModal(false)
  }

  const styles = {
    navigationItemOrig: {
      display: 'inline-flex',
      alignItems: 'center',
      margin: '0.5em 1em',
    },
    navigationItem: {
      display: 'flex',
      alignItems: 'center',
      margin: '0.5em 1em',
    },
  }

  const [isChecked, setChecked] = useState(false)
  const menuOpener = useRef()

  return (
    <>
      <nav
        className="navbar"
        role="navigation"
        aria-label="main navigation"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        }}
      >
        {/* <button
          style={{
            outline: 'none',
            border: 'none',
            padding: 10,
            marginLeft: 10,
            backgroundColor: 'transparent',
          }}
          onClick={() => setDrawerOpen(true)}
        >
          <i style={{ fontSize: 24 }} className="fas fa-bars"></i>
        </button> */}

        <button
          style={{
            outline: 'none',
            border: 'none',
            padding: 10,
            marginLeft: 10,
            backgroundColor: 'transparent',
          }}
          onClick={() => setChecked(true)}
        >
          <i style={{ fontSize: 24 }} className="fas fa-bars"></i>
        </button>

        <input
          ref={menuOpener}
          type="checkbox"
          data-menu
          id="menu-opener"
          checked={isChecked}
          hidden
        />
        <aside
          className="DrawerMenu"
          role="menu"
          id="menu"
          aria-labelledby="openmenu"
        >
          <nav className="Menu">
            <ul className={'mobileNavClassNames'}>
              <li
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginBottom: 20,
                }}
              >
                <button
                  style={{
                    outline: 'none',
                    border: 'none',
                    padding: 10,
                    marginLeft: 10,
                    backgroundColor: 'transparent',
                  }}
                  onClick={() => setChecked(false)}
                >
                  <i
                    style={{ fontSize: 24, color: '#000' }}
                    className="fas fa-times"
                  ></i>
                </button>
              </li>
              <li style={styles.navigationItem}>
                <Link
                  aria-label="home"
                  className="has-text-black logo-nav"
                  to="/"
                  style={{ fontSize: 32 }}
                  onClick={() => setChecked(false)}
                >
                  Home
                </Link>
              </li>
              <li style={styles.navigationItem}>
                <Link
                  aria-label="products"
                  className="has-text-black logo-nav"
                  to="/products"
                  style={{ fontSize: 32 }}
                  onClick={() => setChecked(false)}
                >
                  Products
                </Link>
              </li>
              <li style={styles.navigationItem}>
                <Link
                  aria-label="gallery"
                  className="has-text-black logo-nav"
                  to="/gallery"
                  style={{ fontSize: 32 }}
                  onClick={() => setChecked(false)}
                >
                  Gallery
                </Link>
              </li>
              <li
                style={styles.navigationItem}
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: 20,
                  backgroundColor: 'rgba(250,250,250,0.75)',
                }}
              >
                <a
                  className="facebook"
                  aria-label="facebook"
                  href="https://www.facebook.com/TheBlisssfulWizard/"
                  target="_blank"
                >
                  <i class="fab fa-facebook"></i>
                </a>
                <a
                  className="instagram"
                  aria-label="instagram"
                  href="https://www.instagram.com/blissful__wizard/"
                  target="_blank"
                >
                  <i data-badge="0" className="fab fa-instagram"></i>
                </a>
              </li>
              {/* <li style={styles.navigationItem}>
                <Link to="/#contact">Contact</Link>
              </li> */}
            </ul>
          </nav>
          <label htmlFor="menu-opener" className="MenuOverlay"></label>
        </aside>

        {/* <label
          htmlFor="menu-opener"
          tabIndex="0"
          aria-haspopup="true"
          role="button"
          aria-controls="menu"
          className="OpenMenuButton"
          id="openmenu"
        >
          <i style={{ fontSize: 24 }} className="fas fa-bars"></i>
        </label>

        <input type="checkbox" data-menu id="menu-opener" hidden />

        <aside
          className="DrawerMenu"
          role="menu"
          id="menu"
          aria-labelledby="openmenu"
        >
          <nav className="Menu">
            <button aria-label="close" onClick={() => setDrawerOpen(false)}>
              <i style={{ fontSize: 24 }} className="fas fa-times"></i>
            </button>
            <ul className={'mobileNavClassNames'}>
              <li style={styles.navigationItem} key="homeMobile">
                <Link
                  aria-label="home"
                  className="has-text-black logo-nav"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li style={styles.navigationItem} key="aboutMobile">
                <Link
                  aria-label="products"
                  className="has-text-black logo-nav"
                  to="/products"
                >
                  Products
                </Link>
              </li>
              <li style={styles.navigationItem} key="recentWorkMobile">
                <Link
                  aria-label="gallery"
                  className="has-text-black logo-nav"
                  to="/gallery"
                >
                  Gallery
                </Link>
              </li>
              <li style={styles.navigationItem} key="skillsMobile">
                <a
                  className="facebook"
                  aria-label="facebook"
                  href="https://www.facebook.com/TheBlisssfulWizard/"
                  target="_blank"
                >
                  <i className="fab fa-facebook"></i>
                </a>
                <a
                  className="instagram"
                  aria-label="instagram"
                  href="https://www.instagram.com/blissful__wizard/"
                  target="_blank"
                >
                  <i data-badge="0" className="fab fa-instagram"></i>
                </a>
              </li>
              <li style={styles.navigationItem} key="contactMobile">
                <Link to="/#contact">Contact</Link>
              </li>
            </ul>
          </nav>
          <label htmlFor="menu-opener" className="MenuOverlay"></label>
        </aside> */}

        <div
          className="navbar-start"
          style={{
            marginLeft: '30px',
            width: '100%',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <h1 className="subtitle">
            <Link
              aria-label="search"
              className="has-text-black logo-nav"
              to="/"
            >
              {siteTitle}
            </Link>
          </h1>
        </div>
        <div
          className="navbar-end"
          style={{ marginRight: '30px', display: 'flex' }}
        >
          <div className="navbar-item" onClick={openSearchBar}>
            <FontAwesomeIcon
              className="has-text-dark is-size-5"
              onClick={openSearchBar}
              icon={faSearch}
            />
          </div>
          {/* <div className="navbar-item">
            <Link aria-label="cart" to="/account/login">
              <FontAwesomeIcon
                icon={faUser}
                className="is-size-5 has-text-dark"
              />
            </Link>
          </div> */}
          <div className="navbar-item">
            <Link aria-label="cart" to="/cart">
              {quantity > 0 ? (
                <i
                  data-badge="0"
                  className="fas fa-shopping-bag has-text-dark is-size-5"
                >
                  <span className="cart-count">{quantity}</span>
                </i>
              ) : (
                <FontAwesomeIcon
                  icon={faShoppingBag}
                  className="is-size-5 has-text-dark"
                />
              )}
            </Link>
          </div>
        </div>
      </nav>

      <div className={` ${modal === true ? 'modal is-active' : 'modal'}`}>
        <div className="modal-background" onClick={closeSearchBar}></div>
        <div className="modal-content">
          <div className="field">
            <div className="control has-icons-right">
              <form action="../search" method="GET">
                <input
                  className="input is-large"
                  name="value"
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search"
                />
                <span className="icon is-right">
                  <FontAwesomeIcon icon={faSearch} />
                </span>
                <label className="has-text-white">ENTER ↵</label>
              </form>
            </div>
          </div>
        </div>

        <button
          className="modal-close is-large"
          onClick={closeSearchBar}
          aria-label="close"
        ></button>
      </div>
    </>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
