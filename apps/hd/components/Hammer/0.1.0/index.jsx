import React, {Component} from 'react'
import HammerTarget from './hammer.jsx'

export default class Hammer extends Component {
  constructor (props) {
    super()
    this.state = {targets: null, newImgs: [], removeImgs: null}
    this.tap = this.tap.bind(this)
  }
  // tap 为目标元素添加 白色边框
  tap (ele) {
    // 先将旧的元素的class 移除
    let oldEle = document.getElementsByClassName('target')[0]
    if (oldEle) {
      oldEle.className = ''
    }
    // 新的元素添加 class
    ele.parentNode.parentNode.className = 'target'
  }
  render () {
    let {targets} = this.props
    return (
      <div>
        {
          targets && targets.length && targets.map((item) => <HammerTarget target={item} {...this.props} tap={this.tap} />)
        }
      </div>
    )
  }
}
