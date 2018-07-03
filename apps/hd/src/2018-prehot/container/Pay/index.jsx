import React, {Component} from 'react'
// import Modal from 'components/Modal/0.2.0'
import './index.scss'
import Modal from '../../../../components/Modal/0.2.0'
const {cardInfo, userInfo, env} = window.CONFIG

export default class Pay extends Component {
  // 保存当前的选择
  state = {
    type: 'vip',
    toast: false,
    tip: ''
  }
  componentDidMount () {
    document.title = 'Blued会员预售'
  }
  // 返回当前用户抽中组内的面值
  getAward = () => {
    const awardMap = {
      'a': [{
        old: 40,
        now: 30
      }, {
        old: 60,
        now: 50
      }],
      'b': [{
        old: 40,
        now: 25
      }, {
        old: 60,
        now: 40
      }],
      'c': [{
        old: 40,
        now: 18
      }, {
        old: 60,
        now: 30
      }]
    }
    return awardMap[cardInfo.cardType || 'a']
  }
  // 切换购买类型
  changeType = (type) => {
    this.setState({
      type
    })
  }
  // 开始支付
  toPay = () => {
    if (this.state.flag) {
      this.setState({
        toast: true,
        tip: '请勿重复支付'
      })
      return
    }
    if (userInfo.isvip) {
      this.setState({
        toast: true,
        tip: '会员预售每人限购一次'
      })
      return
    }
    this.setState({
      flag: true
    })
    const payCode = cardInfo.payCode && cardInfo.payCode[this.state.type]
    window.location.href = `http://native.blued.cn/?action=vip_pay_direct&id=${payCode}`
  }
  hideToast = () => {
    this.setState({
      toast: false
    })
  }
  render () {
    const awards = this.getAward()
    return (
      <section className='page-pay'>
        <div className="banner">
          <img src={require('../../img/pay-banner.png')} alt=""/>
          <div className="userinfo">
            <a>
              <img src={userInfo.avatar} alt=""/>
            </a>
            <div>
              <span className="username">{userInfo.name}</span>
              <span className="user-status">{userInfo.stateText}</span>
            </div>
          </div>
        </div>
        <p>Blued会员</p>
        <p>以下价格已减去优惠金额</p>
        <div className={`coupon coupon-${this.state.type}`}>
          <div onClick={() => { this.changeType('vip') }}>
            <span className="type">一个月 VIP</span>
            <span className="now-price"><i>￥</i>{awards[0].now}</span>
            <span className="pre-price">原价￥{awards[0].old}</span>
          </div>
          <div onClick={() => { this.changeType('svip') }}>
            <span className="type">一个月 SVIP</span>
            <span className="now-price"><i>￥</i>{awards[1].now}</span>
            <span className="pre-price">原价￥{awards[1].old}</span>
          </div>
        </div>
        <div className="pay-tip">
          <p>购买会员须知</p>
          <p>1.购买会员需将 Blued APP 升级至 6.3.6 及以上版本方可支付成功;</p>
          <p>2.成功购买预售会员的用户,需在会员功能上线后才可体验正式的会员功能。</p>
        </div>
        <div className="pay-button" onClick={this.toPay}>
          立即支付
        </div>
        <Modal visible={this.state.toast}>
          <div className="toast">
            <p>{this.state.tip}</p>
            <span onClick={this.hideToast}>知道了</span>
          </div>
        </Modal>
      </section>
    )
  }
}
