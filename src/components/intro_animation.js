import React, { useState, useEffect } from 'react'
import Flip from 'react-reveal/Flip'
import Fade from 'react-reveal/Fade'
import Roll from 'react-reveal/Roll'
import Modal from './modal'
import logo from '../images/bw-logo.svg'
import introBackground from '../utils/intro-background'

export default props => {
  const hasSeenIntro = !!sessionStorage.getItem('hasSeenIntro')
  const [modalOpen, setModalOpen] = useState(!hasSeenIntro)

  useEffect(() => {
    if (!hasSeenIntro) {
      const html = document.getElementsByTagName('html')[0]
      html.style.overflowY = 'hidden'
      introBackground()

      setTimeout(() => enterSite(), 6000)
    }
  }, [])

  const enterSite = () => {
    setModalOpen(false)
    const html = document.getElementsByTagName('html')[0]
    html.style.overflowY = 'scroll'
    sessionStorage.setItem('hasSeenIntro', true)
  }

  if (hasSeenIntro) {
    return null
  }

  return (
    <Modal
      visible={modalOpen}
      isIntro
      hideClose
      hideOverflow
      backgroundClass="has-background-white"
      scrollContent={false}
      renderBackgroundHtml={() => (
        <>
          <div id="universe"></div>
          <div
            className="svg-wrapper"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 0,
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <path
                class="circle"
                d="M0,0V500H500V0ZM250,287a37,37,0,1,1,37-37A37,37,0,0,1,250,287Z"
              />
            </svg>
          </div>
          <div className="intro-overlay"></div>
        </>
      )}
    >
      <h1 className="logo has-text-centered is-size-1 has-text-white">
        <Flip left cascade duration={2500} delay={500}>
          Blissful Wizard
        </Flip>
      </h1>
      <p className="image is-4by3">
        <Roll bottom>
          <img src={logo} alt="Blissful Wizard Logo" />
        </Roll>
      </p>
      <h3 className="logo-subtext has-text-centered is-size-3 is-size-4-mobile has-text-white">
        <Flip left cascade duration={2500} delay={1000}>
          Handmade in the East Village, NYC
        </Flip>
      </h3>
    </Modal>
  )
}
