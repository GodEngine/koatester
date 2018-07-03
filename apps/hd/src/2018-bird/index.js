import React from 'react'
import { render } from 'react-dom'

import App from './components/App'
import './scss/index.scss'
import Main from './components'

const appProps = {
  designWidth: 750,
  homeBgStyle: {
    background: '#eceef0'
  },
  returnTop: {
    component: <i className='i i__btn_top' />
  },
  footerImgSrc: ''
}

render(
  <App {...appProps}>
    <Main />
  </App>,
  document.querySelector('main')
)
