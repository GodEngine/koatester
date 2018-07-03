import React, {Component} from 'react'
import './index.scss'
import ScratchCard from '../../components/ScratchCard'
import Modal from '../../../../components/Modal/0.2.0'

const {
  cardInfo,
  env,
  viperListUrl,
  isover
} = window.CONFIG
export default class Card extends Component {
  state = {
    show: isover
  }
  hideToast = () => {
    let flag = this.state.show
    this.setState({
      show: !flag
    })
  }
  // 跳转端内会员列表页
  toVipLiser = () => {
    // 端外走sharebar
    let scheme = 'blued://common.blued.com?action=webbrowse&weburl=' + encodeURIComponent(location.href)
    window.jump = new BluedShareBar({
      expose: true,
      zIndex: { tip: 10000 },
      scheme: {
        ios: scheme,
        android: scheme
      }
    })
    if (env === 'website') {
      window.jump()
      return
    }
    // 走会员中心列表页
    document.body.style.display = 'none'
    window.location.href = viperListUrl
  }

  render () {
    return (
      <section className='page-card'>
        <div className="banner">
          <img src={require('../../img/card-banner.png')} alt=""/>
        </div>
        <ScratchCard cardInfo={cardInfo} switchTost={this.hideToast}/>
        <div className="to-viperlist">
          <a onClick={this.toVipLiser}>查看会员特权</a>
        </div>
        <div className="page-content">
          <p>活动须知</p>
          <p>1、优惠券有效期为3天；</p>
          <p>2、本活动需用户将Blued APP升级至6.3.6及以上版本方可参与；</p>
          <p>3、本活动需Blued APP注册用户且收到“Blued会员中心”站内信活动邀请的用户才可参与；</p>
          <p>4、本活动中，成功购买预售会员的用户可在会员功能正式上线后，额外获得7天对应会员的有效时间；</p>
          <p>5、本活动中，额外赠送的7天会员时间，将在此次活动购买的会员有效期到期前三天下发。例：用户在6月2日预购了会员商品，会员的有效期至下月4日，则赠送的会员将在1日发放；</p>
          <p>6、在本活动中，成功购买预售会员的用户，需在会员功能上线后才可体验正式的会员功能；</p>
          <p>7、本活动在法律允许的范围内，解释权归主办方所有。</p>
        </div>
        <Modal visible={this.state.show}>
          <div className="toast">
            <p>活动已结束</p>
            <span onClick={this.hideToast}>知道了</span>
          </div>
        </Modal>
      </section>
    )
  }
}
