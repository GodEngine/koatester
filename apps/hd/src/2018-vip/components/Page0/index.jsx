import React, {Component} from 'react'
import './index.scss'

const {env, vipListPage} = window.CONFIG
export default class Page0 extends Component {
  constructor (props) {
    super(props)
    this.next = this.next.bind(this)
  }
  next (e) {
    // location.hash = 'hash'
    //    if (env === 'native') {
      // 端内直接跳转
    var img = new Image()
    img.src = `/redirect?url=2018vip_start_${env}`
    img = null
    this.props.next()
  }

  componentDidMount () {
    if (env === 'website' && location.hash === '#/goapp') {
      return
    } else if (location.href.indexOf('#') < 0) {
      location.reload()
    }
  }
  render () {
    return (
      <div className='page page1 swiper-no-swiping'>
        <img src={require('../../img/init-page.jpg')} alt=""/>
        <div className="start-button animated swing">
          <img src={require('../../img/start-button.png')} alt="" onClick={this.next}/>
        </div>
        <div className="line">
          <img src={require('../../img/line.png')} alt="" onClick={this.next}/>
        </div>
      </div>
    )
  }
}
