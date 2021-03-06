import React from 'react'

export default props => (
  <div
    id="modal-container"
    className={`modal ${props.isIntro ? '' : 'one'} ${
      props.visible ? 'is-active' : 'is-active one out'
    }`}
  >
    <div
      className={`modal-background ${
        props.backgroundClass ? props.backgroundClass : ''
      }`}
      onClick={() =>
        props.hideOnClickAway ? props.onClose && props.onClose() : null
      }
    >
      {props.renderBackgroundHtml ? props.renderBackgroundHtml() : null}
    </div>
    <div
      className="modal-content"
      style={props.hideOverflow ? { overflow: 'hidden' } : {}}
    >
      {props.children}
    </div>
    {!props.hideClose && (
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={props.onClose}
      ></button>
    )}
  </div>
)
