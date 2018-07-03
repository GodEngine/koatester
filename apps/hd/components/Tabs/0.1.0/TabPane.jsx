/**
 * TabPane@0.1.0
 * on 2017-03-07 15:29
 */

import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

class TabPane extends Component {
  static propTypes = {
    tab: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node
    ]).isRequired,
    order: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    isActive: PropTypes.bool
  }

  render () {
    const { classPrefix, className, isActive, children } = this.props

    const classes = classNames({
      [className]: className,
      [`${classPrefix}__content__panel`]: true,
      [`${classPrefix}__content__active`]: isActive
    })

    return (
      <div
        role="tabpanel"
        className={classes}
        aria-hidden={!isActive}
      >
        {children}
      </div>
    )
  }
}

export default TabPane
