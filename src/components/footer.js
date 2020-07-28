import React from "react";
import logo from '../images/bw-logo.svg'

const Footer = () => {
  return (
    <footer className="footer">
      <img src={logo} alt="Blissful Wizard Logo" style={{ height: 80 }} />
      <div
        className="content has-text-centered"
        style={{ backgroundColor: "transparent" }}
      >
        <p style={{ marginBottom: 0 }}>
          <strong>Blissful Wizard, LLC &#169;2020</strong>
        </p>
        <div className="button-container">
          <a
            className="button is-dark"
            style={{ marginRight: "10px" }}
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
  );
};

export default Footer;
