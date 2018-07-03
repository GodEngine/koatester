/**
 * Tabs@0.1.0
 * on 2017-03-07 13:18
 */

import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

import TabNav from './TabNav'
import TabContent from './TabContent'

import './index.scss'

class Tabs extends Component {
  static propTypes = {
    // 在主节点上增加可选 class
    className: PropTypes.string,
    // class 前缀
    classPrefix: PropTypes.string,
    // 默认激活索引，组件内更新
    defaultActiveIndex: PropTypes.number,
    // 默认激活索引，组件外更新
    activeIndex: PropTypes.number,
    // 切换时回调函数
    // 当切换 tab 时，外组件需要知道组件内部的信息，尤其是当前 tab 的索引号信息。
    // 一般与 activeIndex 搭配使用。
    onChange: PropTypes.func,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  }

  static defaultProps = {
    classPrefix: 'tabs',
    defaultActiveIndex: 0,
    onChange: () => {}
  }

  constructor (props) {
    super(props)

    this.handleTabClick = this.handleTabClick.bind(this)

    const currProps = this.props

    // 对于 activeIndex 来说，既可能来源于使用内部更新的 defaultActiveIndex prop，
    // 即我们我不需要外组件控制组件状态，也可能来源于需要外部更新的 activeIndex prop。
    // 不过，不论组件是内部更新还是外部更新，我们都需要 activeIndex 这个 state 来更新
    // 渲染。
    let activeIndex
    if ('activeIndex' in currProps) {
      activeIndex = currProps.activeIndex
    } else if ('defaultActiveIndex' in currProps) {
      activeIndex = currProps.defaultActiveIndex
    }

    this.state = {
      activeIndex,
      prevIndex: activeIndex
    }
  }

  componentWillReceiveProps (nextProps) {
    // 如果 props 传入 activeIndex，则直接更新
    if ('activeIndex' in nextProps) {
      this.setState({ activeIndex: nextProps.activeIndex })
    }
  }

  handleTabClick (activeIndex) {
    const prevIndex = this.state.activeIndex

    // 如果当前 activeIndex 与传入的 activeIndex 不一致，并且 props 中存在
    // defaultActiveIndex 时，则更新
    if (this.state.activeIndex !== activeIndex && 'defaultActiveIndex' in this.props) {
      this.setState({
        activeIndex,
        prevIndex
      })

      // 更新后执行回调函数，抛出当前索引和上一次索引
      this.props.onChange({ activeIndex, prevIndex })
    }
  }

  renderTabNav () {
    const { classPrefix, children } = this.props

    return (
      <TabNav
        key="tab-bar"
        classPrefix={classPrefix}
        onTabClick={this.handleTabClick}
        panels={children}
        activeIndex={this.state.activeIndex}
      />
    )
  }

  renderTabContent () {
    const { classPrefix, children } = this.props

    return (
      <TabContent
        key="tab-content"
        classPrefix={classPrefix}
        activeIndex={this.state.activeIndex}
        panels={children}
      />
    )
  }

  render () {
    const { className } = this.props
    const cx = classNames(className, 'tabs')

    return (
      <div className={cx}>
        {this.renderTabNav()}
        {this.renderTabContent()}
      </div>
    )
  }
}

export default Tabs
