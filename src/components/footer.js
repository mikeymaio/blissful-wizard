import React from 'react'
import logo from '../images/bw-logo.svg'
import Contact from './contact'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
  return (
    <>
      <Contact />
      <footer className="footer">
        {/* <Contact /> */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="Blissful Wizard Logo" style={{ height: 80 }} />
          <div>
            <p style={{ marginBottom: 0 }}>
              E:{' '}
              <a
                href="mailto:info@theblissfulwizard.com"
                className="contact-link"
              >
                info@theblissfulwizard.com
              </a>
            </p>
            {/* <p style={{ marginBottom: 0 }}>
              T:{' '}
              <a href="tel:610-456-7890" className="contact-link">
                610-456-7890
              </a>
            </p> */}
          </div>
        </div>
        <div
          className="content has-text-centered"
          style={{ backgroundColor: 'transparent' }}
        >
          <p className="has-text-left" style={{ marginBottom: 0 }}>
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
    </>
  )
}

export default Footer
