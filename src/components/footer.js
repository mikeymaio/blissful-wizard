import React from 'react'
import logo from '../images/bw-logo.svg'
import Contact from './contact'

const Footer = () => {
  return (
    <>
      <Contact />
      <footer className="footer">
        {/* <Contact /> */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="Blissful Wizard Logo" style={{ height: 80 }} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
            }}
          >
            <div className="contact-info">
              <p style={{ marginBottom: 0 }}>
                E:{' '}
                <a
                  href="mailto:info@theblissfulwizard.com"
                  className="contact-link"
                >
                  info@theblissfulwizard.com
                </a>
              </p>
              <p style={{ marginBottom: 0 }}>
                T:{' '}
                <a href="tel:610-456-7890" className="contact-link">
                  610-456-7890
                </a>
              </p>
            </div>

            <div className="social">
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
            </div>
          </div>
        </div>
        <div
          className="content has-text-centered"
          style={{ backgroundColor: 'transparent' }}
        >
          <p className="has-text-left" style={{ marginBottom: 0 }}>
            <strong>Blissful Wizard, LLC &#169;2020</strong>
          </p>
          <div className="button-container legal-container">
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
