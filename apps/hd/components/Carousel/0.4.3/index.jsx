/**
 * Carousel
 * 0.4.2
 */

import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import classNames from 'classnames'

import checkType from '../../../utils/checkType'

import Swiper from 'swiper'

import './swiper.scss'
import './index.scss'

class Carousel extends Component {
  static propTypes = {
    fullscreen: PropTypes.bool.isRequired,
    animate: PropTypes.bool.isRequired
  }

  static defaultProps = {
    fullscreen: false,
    animate: false
  }

  constructor ({ fullscreen, animate, children, params = {} }) {
    super()

    if (!checkType(children, 'Array')) {
      throw new Error('children must be an array.')
    }

    this.direction = params.direction || 'horizontal'
    const styleWidthOrHeight = this.direction === 'horizontal' ? 'width' : 'height'

    if (fullscreen) {
      [document.documentElement, document.body].map(node => {
        node.style.position = 'relative'
        node.style[styleWidthOrHeight] = '100%'
      })

      if (document.body.children.length) {
        document.body.children[0].style.height = 'inherit'
      }
    }

    if (animate) {
      require('./swiper.animate.scss')
    }
  }

  render () {
    const { fullscreen, children } = this.props

    return (
      <div
        className={classNames({
          'swiper-container': true,
          'swiper-container--full': fullscreen,
          'swiper-container--vertical': this.direction === 'vertical'
        })}
      >
        <div className="swiper-wrapper">
          {[...children].filter(child => child).map((child, idx) =>
            <div className="swiper-slide" key={idx}>{child}</div>
          )}
        </div>
      </div>
    )
  }

  componentDidMount () {
    const { animate, params } = this.props

    let swiperAnimateCache
    let swiperAnimate

    if (animate) {
      const swiper = require('./swiper.animate').default

      swiperAnimateCache = swiper.swiperAnimateCache
      swiperAnimate = swiper.swiperAnimate
    }

    // eslint-disable-next-line no-unused-vars
    const swiper = new Swiper(findDOMNode(this), Object.assign({}, params, {
      onInit: function (swiper) {
        if (animate) {
          swiperAnimateCache(swiper)
          swiperAnimate(swiper)
        }

        params.onInit && params.onInit(swiper)
      },
      onSlideChangeEnd: function (swiper) {
        if (animate) {
          swiperAnimate(swiper)
        }

        params.onSlideChangeEnd && params.onSlideChangeEnd(swiper)
      }
    }))
  }
}

export default Carousel
