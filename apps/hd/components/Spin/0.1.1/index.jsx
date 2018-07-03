/**
 * Spin@0.1.1
 */

import React, { PropTypes } from 'react'

import './index.scss'

const Spin = ({ width, color, duration, style }) => (
  <i
    className="spin"
    style={{
      width,
      height: width,
      borderTopColor: color,
      borderLeftColor: color,
      borderRightColor: color,
      animationDuration: duration,
      ...style
    }}
  />
)

Spin.propTypes = {
  width: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  style: PropTypes.object
}

Spin.defaultProps = {
  width: '25px',
  color: '#666',
  duration: '0.75s',
  style: {}
}

export default Spin
