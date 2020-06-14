import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'

import ContextProvider from '~/provider/ContextProvider'

import { GlobalStyle } from '~/utils/styles'
import Navigation from '~/components/Navigation'

import fullLogo from '../images/logo/bw-logo-w-text.svg'
import wizardIcon from '../images/logo/bw-logo.svg'

import wizardWand from '../images/wizard-wand1.png'

import { fairyDustCursor } from '../utils/fairy-dust.js'

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 0px 1.0875rem 1.45rem;
  height: 100%;
`

const Layout = ({ children }) => {
  useEffect(() => {
    const removeFairyDustListeners = fairyDustCursor(); // returns a function to remove event listeners

    return () => removeFairyDustListeners();
  })
  return (
    <ContextProvider>
      <GlobalStyle cursor={wizardIcon} />
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
        render={data => {
          return (
            <>
              <Navigation
                siteTitle={data.site.siteMetadata.title}
                logo={fullLogo}
                wizardIcon={wizardIcon}
              />
              <Wrapper style={{ paddingTop: 125 }}>{children}</Wrapper>
              <footer
                style={{
                  width: '100%',
                  padding: 20,
                  boxSizing: 'border-box',
                }}
              >
                © {new Date().getFullYear()},{` `}
                <a href="/legal" style={{ color: '#8a25b1' }}>
                  Blissful Wizard, LLC
                </a>
              </footer>
              <span className="container" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10000000, pointerEvents: 'none' }}></span>
            </>
          )
        }}
      />
    </ContextProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
