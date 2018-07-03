/**
 * TabNav@0.1.0
 * on 2017-03-07 15:33
 */

import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

class TabNav extends Component {
  static propTypes = {
    classPrefix: PropTypes.string.isRequired,
    panels: PropTypes.node,
    activeIndex: PropTypes.number
  }

  getTabs () {
    const { classPrefix, panels, activeIndex } = this.props

    return React.Children.map(panels, (child) => {
      if (!child) { return }

      const order = parseInt(child.props.order, 10)

      let classes = classNames({
        [`${classPrefix}__nav__tab`]: true,
        'is-active': activeIndex === order,
        'is-disabled': child.props.disabled
      })

      let events = {}
      if (!child.props.disabled) {
        events = {
          onClick: this.props.onTabClick.bind(this, order)
        }
      }

      const ref = {}
      if (activeIndex === order) {
        ref.ref = 'activeTab'
      }

      return (
        <li
          role="tab"
          aria-disabled={child.props.disabled ? 'true' : 'false'}
          aria-selected={activeIndex === order ? 'true' : 'false'}
          {...events}
          className={classes}
          key={order}
          {...ref}
        >
          {child.props.tab}
        </li>
      )
    })
  }

  render () {
    const { classPrefix } = this.props

    const rootClasses = classNames({
      [`${classPrefix}__bar`]: true
    })

    const classes = classNames({
      [`${classPrefix}__nav`]: true
    })

    return (
      <div className={rootClasses} role="tablist">
        <ul className={classes}>
          {this.getTabs()}
        </ul>
      </div>
    )
  }
}

export default TabNav
