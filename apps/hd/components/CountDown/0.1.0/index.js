import React from 'react'
import Flipper from './Flipper'
import schema from './schema.js'
import './style.scss'

class Countdown extends React.PureComponent {
  state = {diff: this.getDiffObject()}
  /**
   * Create second interval
   */
  componentDidMount () {
    let {isEnd} = this.props.isEnd
    if (isEnd) return
    this.interval = window.setInterval(() => this.updateTime(), 1000)
  }

  /**
   * Destroy second interval
   */
  componentWillUnmount () {
    window.clearInterval(this.interval)
  }

  /**
   * Calculate diff object between stop and current date
   * @return {Object} formatted value
   */
  getDiffObject () {
    let {isEnd} = this.props.isEnd
    let future = this.props.stop.getTime()
    // 倒计时插件 在当前页面不进行刷新的情况下 无法获取第二天 所以需要手动添加一天
    if (future - (new Date()).getTime() < 0) {
      future = 24 * 60 * 60 * 1000 + future
    }
    var ms = Math.abs(future - (new Date()).getTime())
    if (isEnd) {
      ms = 0
    }
    var s = Math.floor(ms / 1000)
    var m = Math.floor(s / 60)
    var h = Math.floor(m / 60)
    var d = Math.floor(h / 24)

    return {
      days: Math.floor(h / 24),
      hours: h % 24,
      minutes: m % 60,
      seconds: s % 60
    }
  }

  /**
   * Update state with calcualted diff object
   */
  updateTime () {
    this.setState({ diff: this.getDiffObject() })
  }

  /**
   * Returns formated to 2 digits string
   * @param {Number} data - raw value
   * @return {String} formatted value
   */
  getFormattedVal (data) {
    return (data < 10 ? '0' + data : data) + ''
  }

  /**
   * Render Flipper component for each digit of diff object vals
   * @return {ReactElement} markup
   */
  render () {
    let forks = {
      days: [ [0, 9], [0, 9] ],
      hours: [ [0, 2], [0, 4] ],
      minutes: [ [0, 5], [0, 9] ],
      seconds: [ [0, 5], [0, 9] ]
    }

    return (
      <div className='countdown'>
        {
          Object.keys(this.state.diff).map(key => {
            return (
              <div
                key={key}
                className={`countdown-${key}`}>
                {Array(2).fill(0).map((_, i) => <Flipper
                  key={`${key}${i}`}
                  reverse
                  now={+this.getFormattedVal(this.state.diff[key])[i]}
                  min={forks[key][i][0]}
                  max={forks[key][i][1]}
                />)}
              </div>
            )
          }
        )
      }
      </div>
    )
  }
}

Countdown.propTypes = schema.types

Countdown.defaultProps = schema.defaults

export default Countdown
