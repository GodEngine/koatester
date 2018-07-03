/**
 * Modal 0.2.0
 */

import React, { PropTypes } from 'react'
import classNames from 'classnames'

import './index.scss'

const Modal = ({ cls = '', visible, onClick, children }) => (
    <div
      className={classNames({
        'modal': true,
        [cls]: true,
        'is-show': visible
      })}
      onClick={onClick}
    >
      {children}
    </div>
  )

Modal.propTypes = {
  visible: PropTypes.bool.isRequired
}

Modal.defaultProps = {
  visible: false
}

export default Modal
