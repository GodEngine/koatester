/**
 * @Author: 刘谦 <qianliu>
 * @Email:  112486391@qq.com
 */

import React from 'react'
import { shallow } from 'enzyme'
import { mountWithRouter } from '../../utils.js'

import App from '../../../../components/App/1.2.1/index.jsx'

describe('App@1.2.1', () => {
  it('Render root', () => {
    const wrapper = mountWithRouter(<App />)
  })
})
