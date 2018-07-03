/**
 * Header 1.2.0
 */

import React, { Component, PropTypes } from 'react'
import { Link, Route } from 'react-router-dom'

import { HOME_PATH, INTRO_PATH } from '../../../constants/path'
import isPath from '../../../utils/isPath@0.2.0'

import './index.scss'

class Header extends Component {
  static propTypes = {
    introBtnComponent: PropTypes.element,
    // 当点击 intro 时的回调函数
    // 部分需求并不需要跳转，可能是定位到当前页面某个位置
    introOnClick: PropTypes.func,
    backBtnComponent: PropTypes.element,
    bannerComponent: PropTypes.element,
    introBannerComponent: PropTypes.element,
    introComponent: PropTypes.element,
    // 自定义样式className
    headerClass: PropTypes.string,
    headerStyle: PropTypes.object,
    // 自定义 比如 header-data
    headerProps: PropTypes.object
  }

  static defaultProps = {
    introComponent: null
  }

  render () {
    const {
      introBtnComponent, introOnClick, backBtnComponent,
      bannerComponent, introBannerComponent, introComponent, children,
      headerClass, headerStyle, headerProps, introClass
    } = this.props

    // 自定义类 以及 style
    const _headerProps = {
      className: `header ${headerClass || ''}`,
      style: headerStyle,
    }

    // 自定义属性
    const headerPropsKeys = headerProps ? Object.keys(headerProps) : []
    if (headerPropsKeys.length) {
      headerPropsKeys.map(key => _headerProps[`data-${key}`] = headerProps[key])
    }

    // 当introClass 属性存在 并且当前处于活动详情页 给Header增加属性className
    if (introClass && isPath(INTRO_PATH)) {
      _headerProps['className'] += introClass
    }

    return (
      <header {..._headerProps} >
        <Route
          exact
          path={HOME_PATH}
          render={() =>
            <div>
              {bannerComponent &&
                <div className="header__banner">{bannerComponent}</div>
              }
              {introBtnComponent && (introOnClick
                ? <a
                    className="header__btn"
                    href="javascript:;"
                    onClick={() => introOnClick()}
                  >
                    {introBtnComponent}
                  </a>
                : <Link className="header__btn" to={INTRO_PATH}>
                    {introBtnComponent}
                  </Link>
              )}
              <div className="header__content">{children}</div>
            </div>
          }
        />
        {backBtnComponent &&
          <Route
            path={INTRO_PATH}
            render={() =>
              <div>
                {introBannerComponent &&
                  <div className="header__banner">{introBannerComponent}</div>
                }
                {backBtnComponent &&
                  <Link className="header__btn" to={HOME_PATH}>
                    {backBtnComponent}
                  </Link>
                }
                {introComponent}
              </div>
            }
          />
        }
      </header>
    )
  }
}

export default Header
