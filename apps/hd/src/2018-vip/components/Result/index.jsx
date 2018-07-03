import React, {Component} from 'react'
// import html2canvas from '../../../../utils/htmlToCanvas'
import html2canvas from 'html2canvas'
import {convertBase64UrlToBlob} from '../../../../utils/common'
import $ from 'jquery'

import './index.scss'
const {env, vipListPage} = window.CONFIG

const reMap = {
  'aaaa': 'kszy',
  'aaab': 'xbzh',
  'aaba': 'xbzh',
  'aabb': 'yxdp',
  'abaa': 'kszy',
  'abab': 'yxdp',
  'abba': 'cnmw',
  'abbb': 'cyzy',
  'baaa': 'wxhd',
  'baab': 'cnmw',
  'baba': 'wmtwj',
  'babb': 'wxhd',
  'bbaa': 'wmtwj',
  'bbab': 'sksl',
  'bbba': 'sksl',
  'bbbb': 'cyzy'
}
let canvas
export default class Result extends Component {
  constructor (props) {
    super(props)
    this.state = {
      saveImg: null,
      hashload: false,
      hideOperate: false
    }
    this.refresh = this.refresh.bind(this)
  }

  // 页面加载完毕截屏叠层
  componentDidMount () {
  }
  componentDidUpdate () {
    if (this.state.hashload) {
      return
    }
    html2canvas(document.querySelector('#view'), { useCORS: true }).then(canvas => {
      let getImg = canvas.toDataURL('image/png')
      this.setState({
        saveImg: getImg,
        hashload: true
      })
    })
  }
  // app跳转
  goApp = () => {
    var img = new Image()
    img.src = `/redirect?url=2018vip_tobuy_${env}`
    img = null
    if (env === 'website') {
      location.hash = 'goapp'
      return
    }
    window.location.href = vipListPage
  }

  // 重做题
  refresh () {
    // this.props.refresh()
    var img = new Image()
    img.src = `/redirect?url=2018vip_replay_${env}`
    img = null
    location.reload()
  }

  // 端内分享按钮
  share = () => {
    var img = new Image()
    img.src = `/redirect?url=2018vip_nativeshare`
    img = null
    this.setState({
      hideOperate: true
    }, () => {
      setTimeout(() => {
        this.setState({
          hideOperate: false
        })
      }, 1500)
    })
    let shareUrl = `https://common.blued.com/?action=webshare&type=1&title=${'你是哪种深柜特务基'}&content=Blued 特务基档案被发现！你是哪种特务基，拥有何种技能？点击链接获取神技能加持。${encodeURIComponent(location.href)}`
    window.location.href = shareUrl
    return
  }

  render () {
    let {answers, name} = this.props.data
    answers = answers.join('')
    return (
      <div className='page swiper-no-swiping question result'>
        <div className='clip-area' id='view'>
          <img src={require('../../img/xbzh.jpg')} alt=""/>
          <div className='name'>{name}</div>
        </div>
        <div className={`oprate-area ${this.state.hideOperate ? 'hide' : ''}`}>
          <div className='replay' onClick={this.refresh}>
            <img src={require('../../img/onmore.png')} alt=""/>
          </div>
          <div className='goapp' onClick={this.goApp}>
            <img src={require('../../img/goapp.png')} alt=""/>
          </div>
          {
            env === 'native' ? (<div className='share' onClick={this.share}>
                        <img src={require('../../img/share.png')} alt=""/>
                      </div>) : null
          }
        </div>
        <div className='save-area'>
          <img src={this.state.saveImg} alt=""/>
        </div>
      </div>
    )
  }
}
