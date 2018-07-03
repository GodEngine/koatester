import React, {Component} from 'react'
import './index.scss'
let Hammer = require('react-hammerjs')

let timer
export default class HammerTarget extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // 移动
      startX: 0,
      translateX: 0,
      startY: 0,
      translateY: 0,

      // 缩放
      width: 160,
      height: 160,

      // 旋转
      startRotate: 0,
      rotateArg: 0
    }
    this.handlePan = this.handlePan.bind(this)
    this.handlePanstart = this.handlePanstart.bind(this)
    this.PanEnd = this.PanEnd.bind(this)
    // 关于旋转
    this.handleRotate = this.handleRotate.bind(this)
    this.handleRotateEnd = this.handleRotateEnd.bind(this)
    this.handleRotateStart = this.handleRotateStart.bind(this)
    // 缩放
    this.pinchstart = this.pinchstart.bind(this)
    this.pinchIn = this.pinchIn.bind(this)
    this.pinchOut = this.pinchOut.bind(this)
    this.PinchEnd = this.PinchEnd.bind(this)
    // tap
    this.handleTap = this.handleTap.bind(this)
    // 按压 press
    this.handlePress = this.handlePress.bind(this)
    this.handlePressUp = this.handlePressUp.bind(this)
  }
  // press
  handlePress ({target}) {
    // 如果按压的是旋转按钮
    let targetClass = target.getAttribute('data-clock')
    let old = this.state.rotateArg
    if (targetClass === 'clockWise') {
      timer = setInterval(() => {
        old++
        this.setState({rotateArg: old})
      }, 25)
    } else if (targetClass === 'anti-clockWise') {
      timer = setInterval(() => {
        old--
        this.setState({rotateArg: old})
      }, 25)
    }
  }
  handlePressUp () {
    timer = window.clearInterval(timer)
  }

  // 单手指点击  选择白色边框
  handleTap ({target}) {
    timer = window.clearInterval(timer) // 为了解决手势并发的问题 所有手势结束 都清除一次定时器

    // 如果点击的是旋转按钮
    let targetClass = target.getAttribute('data-clock')
    // 如果旋转属性为FALSE 不支持旋转
    let rotate = this.props.gesture.rotate
    let old = this.state.rotateArg
    if (targetClass === 'clockWise' && rotate) {
      old++
    } else if (targetClass === 'anti-clockWise' && rotate) {
      old--
    } else {
      this.props.tap(target)
    }
    this.setState({rotateArg: old})
  }
  // 滑动初始 添加白框
  handlePanstart ({target}) {
    this.props.tap(target)
  }

  // 滑动
  handlePan (ev) {
    let {deltaX, deltaY, direction, eventType} = ev
    let {startX, startY, translateX, translateY} = this.state
    let end
    let topEnd

    switch (true) {
      case direction === 2 || direction === 4:
        // 往左边滑动 // 往右边滑动
        end = startX + deltaX
        topEnd = translateY // 垂直方向不变
        break
      case direction === 8 || direction === 16:
        // up // down
        topEnd = startY + deltaY
        end = translateX // 水平方向不变
        break
    }
    // 不触发方向运动 也就是手指离开的时候
    if (direction === 1) {
      end = translateX
      topEnd = translateY
    }
    this.setState({translateX: end, translateY: topEnd})
    if (eventType === 4) {
      // 结束部分
      this.setState({translateX: end, startX: end, translateY: topEnd, startY: topEnd})
    }
  }

  PanEnd () {
    timer = window.clearInterval(timer) // 为了解决手势并发 导致不停旋转的问题 所有手势结束 都清除一次定时器
  }

  // 旋转
  handleRotateStart (ev) {
    let {target} = ev
    this.props.tap(target)
  }
  handleRotate (ev) {
    // console.log(ev)
    let {startRotate} = this.state
    let {deltaTime, srcEvent, rotation: rotationBox} = ev
    // 点触事件  时间太短不去触发旋事件
    if (deltaTime < 100) return

    let {rotation = ''} = srcEvent || {} // 每次手指旋转的角度
    let end
    if (rotation) {
      // 如果存在则表示是在iOS中 rotation 从srcEvent 中获取 表示每一次旋转的角度
      end = startRotate + rotation
    } else {
      // 在安卓中是没有这个属性的
      end = rotationBox
    }
    this.setState({rotateArg: end})
  }
  handleRotateEnd (ev) {
    // 结束之后 将最后的元素角度 存入最后
    this.setState({startRotate: this.state.rotateArg})

    timer = window.clearInterval(timer) // 为了解决手势并发 导致不停旋转的问题 所有手势结束 都清除一次定时器
  }

  // 缩放 pinch
  pinchstart ({target}) {
    // console.log('pinchstart 开始缩放')
    this.props.tap(target)
  }
  // 手指  变小
  pinchIn () {
    let width = this.state.width - 1
    let height = this.state.height - 1
    // 最小为50
    let {minWidth = 40, minHeight = 40} = this.props
    this.setState({width: width < minWidth ? minWidth : width, height: height < minHeight ? minHeight : height})
  }
  // 手指  变大
  pinchOut () {
    let width = this.state.width + 1
    let height = this.state.height + 1
    // 最大为 250
    let {maxWidth = 300, maxHeight = 300} = this.props
    this.setState({width: width > maxWidth ? maxWidth : width, height: height > maxHeight ? maxHeight : height})
  }

  PinchEnd () {
    timer = window.clearInterval(timer) // 为了解决手势并发 导致不停旋转的问题 所有手势结束 都清除一次定时器
  }

  render () {
    // 根据传入的 gesture 判断支持的手势
    let {gesture, target, canRemove} = this.props
    let {drag, rotate, zoom} = gesture

    // 判断是否需要支持缩放以及旋转操作
    let options = {
      recognizers: {
        pinch: { enable: zoom },
        rotate: { enable: rotate }
      }
    }

    let hanmmerProps = {
      // onTap  每一个点击图片 都在当前图片显示一个框
      onTap: this.handleTap
    }

    // 如果支持拖拽
    if (drag) {
      let dragAttr = {
        onPan: this.handlePan,
        onPanStart: this.handlePanstart,
        onPanEnd: this.PanEnd
      }
      // 添加拖拽属性
      hanmmerProps = Object.assign({}, hanmmerProps, dragAttr)
    }
    // 如果支持旋转
    if (rotate) {
      let rotateAttr = {
        // 关于旋转
        onRotateStart: this.handleRotateStart,
        onRotateEnd: this.handleRotateEnd,
        onRotateMove: this.handleRotate,

        //  由于在安卓设备中旋转事件有bug 所以这里提供两个按钮来支持旋转 press
        onPress: this.handlePress,
        onPressUp: this.handlePressUp,
      }
      hanmmerProps = Object.assign({}, hanmmerProps, rotateAttr)
    }
    // 如果支持缩放
    if (zoom) {
      let zoomAttr = {
        // 缩放处理
        onPinchStart: this.pinchstart,
        onPinchIn: this.pinchIn,
        onPinchOut: this.pinchOut,
        onPinchEnd: this.PinchEnd
      }
      hanmmerProps = Object.assign({}, hanmmerProps, zoomAttr)
    }

    let {rotateArg, width, height, translateX, translateY} = this.state
    // 点击前面的 会空出来
    if (!target) return null
    let styles = {
      transform: `rotate(${rotateArg}deg)`,
      width: `${width}px`,
      height: `${height}px`,
    }

    // 盒子变动
    let boxStyle = {
      transform: `translateX(${translateX}px) translateY(${translateY}px)`,
      width: `${width}px`,
      height: `${height}px`,
    }

    // 判断是否支持取消事件
    let removeProps = {}
    if (this.props.onClickRemove) {
      removeProps['onClick'] = this.props.onClickRemove(target)
    }
    return (
      <Hammer {...hanmmerProps} options={options} direction='DIRECTION_ALL'>
        <div data-drag='dragBox' style={boxStyle}>
          {/* 删除操作 */}
          {
            canRemove && <img src={require('./img/btn_delete.png')} data-btns className='btn_delete' {...removeProps} />
          }
          {/* 元素展示 */}
          <div className='forHideImg' style={{display: 'block'}}>
            <b style={{height: `${height}px`}} />
            <img src={target} data-index='dragImg' style={styles} />
          </div>
          {/* 顺时针旋转按钮 */}
          {
            rotate && <img src={require('./img/btn_right.png')} data-btns className='btns btn_right' data-clock='clockWise' />
          }
          {/* 逆时针旋转按钮 */}
          {
            rotate && <img src={require('./img/btn_left.png')} data-btns className='btns btn_left' data-clock='anti-clockWise' />
          }
        </div>
      </Hammer>
    )
  }
}
