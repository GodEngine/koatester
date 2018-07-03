/**
 * Reference: http://stackoverflow.com/questions/38121454/how-to-mock-react-router-context
 * @Author: 刘谦 <qianliu>
 * @Email:  112486391@qq.com
 */

import React from 'react'
import { MemoryRouter as Router } from 'react-router-dom'
import { mount } from 'enzyme'

export const mountWithRouter = (ReactNode, routerProps = {}, context = {}) => {
  return mount(
    <Router {...routerProps}>
      {ReactNode}
    </Router>
  , context)
}
