import React from 'react'

import { Modal, ModalBackground, ModalContent } from './styles'

import { NewsLetterForm } from '../../NewsLetter'

export default props => {
  // if (!props.open) return null
  return (
    <Modal className={props.className} out={!props.open}>
      <ModalBackground>
        <button
          onClick={() => {
            sessionStorage.setItem('hasSeenEmailModal', true)
            props.closeModal()
          }}
          style={{ position: 'absolute', top: 20, right: 20, background: 'transparent', border: 'none', outline: 'none' }}
        >
          <span
            className="material-icons-outlined"
            style={{
              fontFamily: 'Material Icons',
              color: '#FFF',
              fontSize: 36,
            }}
          >
            close
          </span>
        </button>
        <ModalContent>
          {props.children}
        </ModalContent>
      </ModalBackground>
    </Modal>
  )
}
