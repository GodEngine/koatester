import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import classNames from 'classnames'

import checkType from '../../../utils/checkType'

import Swiper from 'swiper'

import './swiper.scss'
import './index.scss'

const DIRECTIONS = ['horizontal', 'vertical']

class Carousel extends Component {
  static propTypes = {
    initialSlide: PropTypes.number.isRequired,
    direction: PropTypes.oneOf(DIRECTIONS).isRequired,
    fullScreen: PropTypes.bool.isRequired,
    speed: PropTypes.number.isRequired,
    onSlideChangeStart: PropTypes.func.isRequired,
    onSlideChangeEnd: PropTypes.func.isRequired,
    animate: PropTypes.bool.isRequired
  }

  static defaultProps = {
    initialSlide: 0,
    direction: 'horizontal',
    fullScreen: false,
    speed: 300,
    onSlideChangeStart: () => {},
    onSlideChangeEnd: () => {},
    animate: false
  }

  constructor ({
    initialSlide, direction, fullScreen, animate, children
}) {
    super()

    if (!DIRECTIONS.includes(direction)) {
      throw new Error('direction must be "horizontal" or "vertical".')
    }

    if (!checkType(children, 'Array')) {
      throw new Error('children must be an array.')
    }

    if (initialSlide >= children.length) {
      throw new Error('initialSlide must be less than slides length.')
    }

    const styleWidthOrHeight = direction === 'horizontal' ? 'width' : 'height'

    if (fullScreen) {
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
    const { fullScreen, direction, children } = this.props

    return (
      <div
        className={classNames({
          'swiper-container': true,
          'swiper-container--full': fullScreen,
          'swiper-container--vertical': direction === 'vertical'
        })}
      >
        <div className="swiper-wrapper">
          {children.filter(child => child).map((child, idx) =>
            <div className="swiper-slide" key={idx}>{child}</div>
          )}
        </div>
      </div>
    )
  }

  componentDidMount () {
    const {
      initialSlide, direction, speed, onSlideChangeStart, onSlideChangeEnd, animate
    } = this.props

    let swiperAnimateCache
    let swiperAnimate

    if (animate) {
      const swiper = require('./swiper.animate').default

      swiperAnimateCache = swiper.swiperAnimateCache
      swiperAnimate = swiper.swiperAnimate
    }

    const swiper = new Swiper(findDOMNode(this), { // eslint-disable-line no-unused-vars
      initialSlide,
      direction,
      speed,
      onInit: function (swiper) {
        if (animate) {
          swiperAnimateCache(swiper)
          swiperAnimate(swiper)
        }
      },
      onSlideChangeStart,
      onSlideChangeEnd: function (swiper) {
        if (animate) {
          swiperAnimate(swiper)
        }

        onSlideChangeEnd(swiper)
      }
    })
  }
}

export default Carousel
