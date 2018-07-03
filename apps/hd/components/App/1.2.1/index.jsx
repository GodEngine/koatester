// Babel Polyfill
// Error: only one instance of babel-polyfill is allowed
// https://github.com/stylelint/stylelint/issues/1316
if (!global._babelPolyfill) {
  require('babel-polyfill')
}

// Fetch Polyfill
import 'whatwg-fetch'

// Fastclick
import FastClick from 'fastclick'
FastClick.attach(document.body)

import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import { HashRouter } from 'react-router-dom'
import LazyLoad from 'react-lazyload'
import debounce from 'lodash.debounce'

import isPath from '../../../utils/isPath'
import scrollTo from '../../../utils/scrollTo'
import getScrollTop from '../../../utils/getScrollTop'

import './index.scss'

class App extends Component {
  static propTypes = {
    // 页面最大宽度
    bodyMaxWidth: PropTypes.number.isRequired,
    // 设计稿宽度
    designWidth: PropTypes.number.isRequired,
    // 容器背景样式
    homeBgStyle: PropTypes.object.isRequired,
    // 活动详情页背景样式
    introBgStyle: PropTypes.object.isRequired,
    // 页脚图片链接
    footerImgSrc: PropTypes.string,
    // 返回顶部
    returnTop: PropTypes.shape({
      // React Node
      component: PropTypes.element,
      // 滚动高度达到此参考数值才显示
      visibilityHeight: PropTypes.string,
      // 多少 ms 滚动回顶部
      speed: PropTypes.number,
      // 相对屏幕右边的距离
      right: PropTypes.string,
      // 相对屏幕底边的距离
      bottom: PropTypes.string
    })
  }

  static defaultProps = {
    bodyMaxWidth: 425,
    designWidth: 0,
    homeBgStyle: {},
    introBgStyle: {},
    returnTop: {}
  }

  constructor ({ bodyMaxWidth, designWidth }) {
    super()

    // 设置页面最大宽度
    document.body.style.maxWidth = `${bodyMaxWidth}px`

    if (designWidth) {
      // 如果 designWidth > 0 使用 Rem Layout
      // @闲闲 提供
      let screenWidth = document.documentElement.clientWidth

      if (screenWidth > bodyMaxWidth) {
        screenWidth = bodyMaxWidth
      }

      document.documentElement.style.fontSize = `${screenWidth / designWidth * 100}px`
    }
  }

  render () {
    const {
      homeBgStyle, introBgStyle, footerImgSrc, returnTop, children
    } = this.props

    const containerStyle = isPath('/intro') ? introBgStyle : homeBgStyle

    // 移除掉客户端错误拼接的 #/&app=x hash
    if (location.hash.includes('&app=')) {
      window.location.href = location.href.split('#')[0]
      return null
    }

    return (
      <HashRouter>
        <div className="container" style={containerStyle}>
          <main className="container__main">
            {children}
          </main>
          {footerImgSrc &&
            <footer className="container__footer">
              <LazyLoad once height={100} offset={300}>
                <img src={footerImgSrc} alt="footer-img" />
              </LazyLoad>
            </footer>
          }
          {returnTop.component &&
            <div
              ref="returnTop"
              className="container__return-top"
              style={{
                right: returnTop.right || 20,
                bottom: returnTop.bottom || 20
              }}
              onClick={() => scrollTo(0, returnTop.speed || 300)}
            >
              {returnTop.component}
            </div>
          }
        </div>
      </HashRouter>
    )
  }

  componentDidMount () {
    const { returnTop } = this.props

    // 监听页面滚动事件控制 `返回顶部` 的 显示/隐藏
    if (returnTop.component) {
      const returnTopNode = findDOMNode(this.refs.returnTop)

      // 利用 debounce 控制触发频率 100ms 内只触发一次
      window.addEventListener('scroll', debounce(() => {
        // 当页面滚动到距离顶部 {returnTop.visibilityHeight} 时显示
        returnTopNode.style.display = getScrollTop() > (returnTop.visibilityHeight || 300) ? 'block' : 'none'
      }, 100))
    }
  }

  componentWillUnmount () {
    window.removeEventListener('scroll')
  }
}

export default App
