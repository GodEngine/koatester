import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import 'whatwg-fetch'
// import req from '../../../../utils/req@0.2.0'
import './index.scss'
import LuckyCard from './card'

const {
  cardInfo,
  userInfo,
  isover,
  env
} = window.CONFIG

export default class Card extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hideMask: cardInfo.hasScratched     // 是否已经刮开
    }
  }

  componentDidMount () {
    // 活动结束后不再初始化刮刮卡组件
    if (isover) {
      // alert('活动已结束，去看看别的活动吧')
      return
    }
    // 已经刮过的卡不在初始化刮刮卡组价
    if (cardInfo.hasScratched) {
      return
    }
    LuckyCard.case({
      ratio: 0.6,
      coverColor: '#e4e4e4'
    }, function () {
      this.clearCover()
      document.getElementById('cover').style.display = 'none'
      // req({
      //   endpoint: `2018-prehot/data/${uid}`,
      //   callback: () => {}
      // })
      let img = new Image()
      img.src = `/hd/2018-prehot/scratch/${window.CONFIG.uid}`
      img = null
    })
  }

  // 获取对应的奖品类型
  getAward = (type) => {
    let fragment = {
      'a': (
        <div className="awardtype typea">
          <span>10元通用券</span>
        </div>
      ),
      'b': (
        <div className="awardtype typeb">
          <span>15元VIP立减券</span>
          <span>20元SVIP立减券</span>
        </div>
      ),
      'c': (
        <div className="awardtype typeb">
          <span>22元VIP立减券</span>
          <span>30元SVIP立减券</span>
        </div>
      )
    }
    let hasNotUsed = cardInfo.hasNotUsed
    return (
      <div className="award-card" id="card">
        <div>
          {fragment[type || 'a']}
          <div className="award-tip">
            <span>购买Blued会员专享</span>
            <span>优惠券有效期3天</span>
          </div>
        </div>
        <div className="award-use">
          <span>惊喜专享</span>
          {
            hasNotUsed
            ? <Link to={'/pay'}>使用</Link>
            : <a className="hasUsed">已使用</a>
          }
        </div>
      </div>
    )
  }
  // 点击刮奖后隐藏蒙层
  startScratch = () => {
    if (isover) {
      this.props.switchTost()
      return
    }
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

    // 非白名单用户弹出活动
    if (!userInfo.inWhiteList) {
      alert('您未获得活动邀请，暂不能参与本活动')
      return
    }
    // 隐藏蒙层
    this.setState({
      hideMask: true
    })
    // 初始化刮刮卡
  }

  render () {
    return (
      <div id="scratch">
       {this.getAward(cardInfo.cardType)}
        {
          this.state.hideMask ? null : <div className="start-scratch">
            <span>动动手指刮开优惠券</span>
            <span onClick={this.startScratch}>点击刮奖</span>
          </div>
        }
      </div>
    )
  }
}
