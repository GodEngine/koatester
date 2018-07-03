import React from 'react'
import {render} from 'react-dom'
import App from '../../components/App/1.2.1'
import Main from './components/main'
import './scss/index.scss'

let root = document.getElementById('app')
const bgStyle = {
  background: 'transparent'
}

render(
  <App homeBgStyle={bgStyle}>
   <Main />
  </App>, root)
