// 主要测试三个新增功能
// headerClass | 自定义组件类名 | String
// headerStyle | 自定义组件CSS属性 | Object
// headerProps | 自定义属性 | Object
// introClass | 自定义组件类名 仅当页面位于活动详情页才添加此类名 | String
import React from 'react'
import { shallow } from 'enzyme'
import { mountWithRouter } from '../../utils.js'

import Header from '../../../../components/Header/1.1.1/index.jsx'
import { HOME_PATH, INTRO_PATH } from '../../../../constants/path.js'

describe('Header@1.1.1', () => {
  it(`
    should render header

    <header className="header" />
  `, () => {
    const wrapper = shallow(<Header />)
    expect(wrapper.find('header.header').length).toEqual(1)
  })
  it(`
    should add header style and className

    <header className="header" style={{...}} />
  `, () => {
    const headerProps = {
      headerStyle: {color: 'red', background: '#fff'},
      headerClass: 'headerClass'
    }
    const wrapper = shallow(<Header {...headerProps} />)
    expect(wrapper.find('header').hasClass('header headerClass')).toEqual(true)
    expect(wrapper.find('header').props().style).toEqual(headerProps['headerStyle'])
  })
  it(`
    should add custom attributes

    <header />
  `, () => {
    const _headerProps = {
      headerProps: {title: 'header-title', rank: 'header-rank'}
    }
    const wrapper = shallow(<Header {..._headerProps} />)
    expect(wrapper.find('header').props()['data-title']).toEqual('header-title')
    expect(wrapper.find('header').props()['data-rank']).toEqual('header-rank')
  })

  it(`
    should add class if hash is intro

    <header />
  `, () => {
    const headerProps = {
      introClass: 'introClass'
    }
    // 通过这种方式添加哈希值 因缺思厅
    window.location += `#${INTRO_PATH}`
    const wrapper = shallow(<Header {...headerProps} />)
    expect(wrapper.find('header').hasClass('introClass')).toEqual(true)
  })

  it(`
    should render bannerComponent

    <header className="header">
      {bannerComponent &&
        <div className="header__banner">{bannerComponent}</div>
      }
    </header>
  `, () => {
    const BannerComponent = () => <div>Banner Component</div>
    const headerProps = {
      bannerComponent: <BannerComponent />
    }
    const wrapper = shallow(<Header {...headerProps} />)
    expect(wrapper.find('.header__banner').contains(<BannerComponent />)).toEqual(true)
  })

  it(`
    should render children

    <header className="header">
      <Route
        exact
        path={HOME_PATH}
        render={() =>
          <div>
            <div className="header__content">{children}</div>
          </div>
        }
      />
    </header>
  `, () => {
    const Children = () => <div>Children</div>
    const wrapper = mountWithRouter(
      <Header>
        <Children />
      </Header>
    )

    expect(wrapper.find('.header__content').contains(<Children />)).toEqual(true)
  })

  it(`
    should render introBtnComponent

    <Link className="header__btn" to={INTRO_PATH}>
      {introBtnComponent}
    </Link>
  `, () => {
    const IntroBtnComponent = () => <div>IntroBtnComponent</div>
    const headerProps = { introBtnComponent: <IntroBtnComponent /> }
    const wrapper = mountWithRouter(<Header {...headerProps} />)
    const introBtnWrapper = wrapper.find('.header__btn')

    expect(introBtnWrapper.prop('href')).toEqual(INTRO_PATH)
    expect(introBtnWrapper.contains(<IntroBtnComponent />)).toEqual(true)
  })

  it(`
    should render introBtnComponent & introOnClick

    {introBtnComponent && (introOnClick
      ? <a
          className="header__btn"
          href="javascript:;"
          onClick={() => introOnClick()}
        >
          {introBtnComponent}
        </a>
      : ...
    }
  `, () => {
    const IntroBtnComponent = () => <div>IntroBtnComponent</div>
    const spyOnClick = jasmine.createSpy('introOnClick')
    const headerProps = {
      introBtnComponent: <IntroBtnComponent />,
      introOnClick: spyOnClick
    }
    const wrapper = mountWithRouter(<Header {...headerProps} />)
    const introBtnWrapper = wrapper.find('.header__btn')

    introBtnWrapper.simulate('click')
    expect(spyOnClick).toHaveBeenCalled()
    expect(introBtnWrapper.contains(<IntroBtnComponent />)).toEqual(true)
  })

  it(`
    should render backBtnComponent

    {backBtnComponent &&
      <Route
        path={INTRO_PATH}
        render={() =>
          <div>
            {backBtnComponent &&
              <Link className="header__btn" to={HOME_PATH}>
                {backBtnComponent}
              </Link>
            }
            ...
          </div>
        }
      />
    }
  `, () => {
    const BackBtnComponent = () => <div>BackBtnComponent</div>
    const IntroComponent = () => <div>IntroComponent</div>
    const headerProps = {
      backBtnComponent: <BackBtnComponent />,
      introBtnComponent: <IntroComponent />
    }

    const wrapper = mountWithRouter(<Header {...headerProps} />, {
      initialEntries: [INTRO_PATH]
    })
    const backBtnComponentWrapper = wrapper.find('.header__btn')

    expect(backBtnComponentWrapper.prop('href')).toEqual(HOME_PATH)
    expect(backBtnComponentWrapper.contains(<BackBtnComponent />)).toEqual(true)
    expect(wrapper.contains(<IntroComponent />)).toEqual(false)

    // TODO
    // test Link to
    backBtnComponentWrapper.simulate('click')
    // const wrapperNow = shallow(<Header {...headerProps} />)
    // expect(wrapperNow.find('.header__btn').props()['href']).toEqual(INTRO_PATH)
    // expect(wrapperNow.contains(<BackBtnComponent />)).toEqual(false)
    // expect(wrapperNow.contains(<IntroComponent />)).toEqual(true)
  })

  it(`
    should render introComponent

    {backBtnComponent &&
      <Route
        path={INTRO_PATH}
        render={() =>
          <div>
            ...
            {introComponent}
          </div>
        }
      />
    }
  `, () => {
    const BackBtnComponent = () => <div>BackBtnComponent</div>
    const IntroComponent = () => <div>IntroComponent</div>
    const headerProps = {
      backBtnComponent: <BackBtnComponent />,
      introComponent: <IntroComponent />
    }
    const wrapper = mountWithRouter(<Header {...headerProps} />, {
      initialEntries: [INTRO_PATH]
    })

    const backBtnComponentWrapper = wrapper.find('.header__btn')
    expect(backBtnComponentWrapper.contains(<BackBtnComponent />)).toEqual(true)
    expect(wrapper.contains(<IntroComponent />)).toEqual(true)
  })
})
