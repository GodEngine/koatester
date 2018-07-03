import React from 'react'
import { render } from 'react-dom'
import { Route } from 'react-router-dom'

import App from 'components/App/1.2.1'
import './scss/index.scss'
import {Pay, Card} from './container'

const appProps = {
  designWidth: 750
}

// const {env} = window.CONFIG
render(
  <App {...appProps}>
    <Route exact path='/' component={Card} />
    <Route exact path='/pay' component={Pay} />
  </App>,
  document.querySelector('main')
)
