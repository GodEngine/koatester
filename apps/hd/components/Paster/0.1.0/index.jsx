/**
 * Paster HOC
 */

import { Component } from 'react'
import { findDOMNode } from 'react-dom'

import Hammer from 'hammerjs'

export default (WrappedComponent) => class extends Component {
  constructor () {
    super()

    this.transforms = {}
  }

  setTransform () {
    const style = Object.keys(this.transforms).map(
      (key) => `${key}(${this.transforms[key]})`
    ).join(' ')

    // Chrome, Safari, iOS, Android
    this.DOMNode.style['-webkit-transform'] = style
    // IE 9
    this.DOMNode.style['-ms-transform'] = style
    // IE 10, Firefox, Opera
    this.DOMNode.style['transform'] = style
  }

  componentDidMount () {
    // Get a reference to the dom node
    this.DOMNode = findDOMNode(this)

    // Create a manager for the dom node
    const mc = new Hammer.Manager(this.DOMNode, {
      tap: { enable: false }
    })

    // Create recognizers
    const pan = new Hammer.Pan({ pointers: 1 })
    const pinch = new Hammer.Pinch({ pointers: 2 })
    const rotate = new Hammer.Rotate({ pointers: 2 })

    // Detect pinch, rotate both the same time
    pinch.recognizeWith(rotate)

    // Add the recognizer
    mc.add([pan, pinch, rotate])

    // Fix: 当两个手指触碰屏幕时，会立即旋转180度的 bug
    // Fix: Pan 和 Pinch 手势冲突
    let startRotation = 0
    let rotation = 0
    let lastRotation
    let scale = 1
    let lastScale = this.DOMNode.clientWidth
    let lastPosX = 0
    let lastPosY = 0
    let posX = 0
    let posY = 0

    // Subcribe to events
    mc.on(`
      pinchstart pinch pinchend
      rotatestart rotate rotateend
      pan panend
      tap, multitap
    `, (e) => {
      e.preventDefault()

      switch (e.type) {
        case 'pinchstart':
          lastScale = scale
          break

        case 'pinch':
          scale = Math.max(0, Math.min(lastScale * e.scale, 10))
          break

        case 'pinchend':
          lastScale = scale
          break

        case 'rotatestart':
          lastScale = scale
          lastRotation = rotation
          startRotation = e.rotation
          break

        case 'rotate':
          const diff = startRotation - e.rotation
          rotation = lastRotation - diff
          break

        case 'rotateend':
          lastScale = scale
          lastRotation = rotation
          break

        case 'pan':
          posX = e.deltaX + lastPosX
          posY = e.deltaY + lastPosY
          break

        case 'panend':
          lastPosX = posX
          lastPosY = posY
          break
      }

      if (e.pointers.length < 2) {
        // Pan
        this.transforms.translate3d = `${posX}px, ${posY}px, 0`
      } else {
        // Pinch, Rotate
        this.transforms.rotate = `${rotation}deg`
        this.transforms.scale3d = `${scale}, ${scale}, 1`
      }

      this.setTransform()
    })
  }

  render () {
    return WrappedComponent
  }
}
