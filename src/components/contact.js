import React, { useState } from 'react'
import logo from '../images/bw-logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faShoppingBag,
  faUser,
  faSearch,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'

const Contact = () => {
  const [flipped, setFlipped] = useState(false)
  const toggleFlip = () => {
    setFlipped(!flipped)
  }
  return (
    <div className="py-4 px-4 contact-container">
      <div className="py-4 px-4 left">
        <h2
          style={{ fontFamily: 'Lobster Two' }}
          className="has-text-centered has-text-white is-size-2 px-4"
        >
          Contact us for custom orders, questions, or just to say hi!
        </h2>
      </div>
      <div className="py-4 px-4 right">
        <div className="cont-contactBtn">
          <div className={`cont-flip${flipped ? ' flipped' : ''}`}>
            <div className="front">
              <img
                src={logo}
                alt="Blissful Wizard Logo"
                style={{ height: 180, margin: 20 }}
              />
              <button
                onClick={toggleFlip}
                className="btn btn-white flip glowing has-text-centered has-text-weight-semibold"
              >
                {/* Send Message */}
                CONTACT
              </button>
            </div>
            <div className="back">
              <button onClick={toggleFlip} className="flip close">
                <FontAwesomeIcon
                  className="has-text-dark is-size-5"
                  icon={faTimes}
                />
              </button>
              <form
                className="contact-form"
                // action=""
                name="contact"
                // method="POST"
                netlify
              >
                <input
                  className="gutter"
                  type="text"
                  placeholder="Name"
                  name="name"
                  aria-label="name"
                  required
                />
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  aria-label="email address"
                  required
                />
                {/* <input
                  className="gutter"
                  type="text"
                  placeholder="Subject"
                  name="subject"
                  aria-label="subject"
                /> */}
                {/* <input
                  className="gutter"
                  type="text"
                  placeholder="Telephone"
                  name="phone"
                  aria-label="phone number"
                />
                <input
                  type="text"
                  placeholder="Company"
                  name="company"
                  aria-label="company"
                /> */}
                <textarea
                  name=""
                  id=""
                  placeholder="Leave a message"
                  name="message"
                  aria-label="message"
                  required
                ></textarea>
                <input type="submit" value="Send" aria-label="submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
