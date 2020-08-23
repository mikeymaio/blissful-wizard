import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import ContextProvider from '../provider/ContextProvider'
import Header from '../components/header'
import Footer from '../components/footer'
import IntroAnimation from '../components/intro_animation'
import background from '../images/trippy-background4.jpg'
import { fairyDustCursor } from '../utils/fairy-dust.js'
import '../components/all.sass'

const isBrowser = typeof window !== 'undefined'

class Layout extends Component {
  initFairyDust() {
    const fairyDustContainer = document.querySelector('.fairy-container')
    if (!fairyDustContainer || !!this.removeFairyDust) {
      return
    } else {
      this.removeFairyDust = fairyDustCursor()
    }
  }

  componentDidMount() {
    this.initFairyDust()
  }

  componentWillUnmount() {
    this.removeFairyDust()
  }

  render() {
    const { children } = this.props

    return (
      <ContextProvider>
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
              <Footer />
              <IntroAnimation />
            </>
          )}
        />
      </ContextProvider>
    )
  }
}
Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
