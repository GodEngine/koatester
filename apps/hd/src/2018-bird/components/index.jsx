import React, {Component} from 'react'
import Modal from '../../../components/Modal/0.2.0'
// import videojs from 'video.js'
import { reqVote } from '../service'
import './index.scss'
// import { className } from 'classnames'

let { usersInfo, uid, isEnd, isStart, env } = window.CONFIG
const imgArr = [
  'https://os4ty6tab.qnssl.com/cblued/static/3 2.1cfhb1bp517echi.gif',
  'https://os4ty6tab.qnssl.com/cblued/static/banner.1cf78rnppt708l.jpg',
  'https://os4ty6tab.qnssl.com/cblued/static/play.1cf4o73gt1idesi.jpg',
  'https://os4ty6tab.qnssl.com/cblued/static/video.1cet46ipr2ev270.jpg',
  'https://os4ty6tab.qnssl.com/cblued/static/photo1.1cfeitt41qfq1j.png',
  'https://os4ty6tab.qnssl.com/cblued/static/photo2.1cfcvveca2cop8t.png',
  'https://os4ty6tab.qnssl.com/cblued/static/photo3.1cfeitrqt1kv2nf.png',
  'https://os4ty6tab.qnssl.com/cblued/static/ps4.1cfi1jvc49utua.png',
  'https://os4ty6tab.qnssl.com/cblued/static/photo5.1cfeitsppbv0if.png',
  'https://os4ty6tab.qnssl.com/cblued/static/photo6.1cfeitsf5blptp.png',
  'https://os4ty6tab.qnssl.com/cblued/static/photo7.1cfeitspq6sfpo.png',
  'https://os4ty6tab.qnssl.com/cblued/static/photo8.1cfeittc22e56f0.png',
  'https://os4ty6tab.qnssl.com/cblued/static/04_vote.1ceqkkof8ktdc7.jpg',
  'https://os4ty6tab.qnssl.com/cblued/static/05_rule.1ceqkknqb2qkdbi.jpg',
  'https://os4ty6tab.qnssl.com/cblued/static/07_Btn.1ceqkko082nfn00.png',
  'https://os4ty6tab.qnssl.com/cblued/static/start.1cer2517rf8hrl.png',
  'https://os4ty6tab.qnssl.com/cblued/static/stop.1cer2517l22il16.png',
  'https://os4ty6tab.qnssl.com/cblued/static/jump.1cf4oh4t61is6mo.png',
  'https://os4ty6tab.qnssl.com/cblued/static/v2.1cff7htn6eh5h7.gif',
  'https://os4ty6tab.qnssl.com/cblued/static/tu3.1cfet4nqr20oitk.gif',
  'https://os4ty6tab.qnssl.com/cblued/static/tu2.1cfckmc7ejpbtg.gif',
  'https://os4ty6tab.qnssl.com/cblued/static/tu4.1cfckmcf02hjp01.gif',
  'https://os4ty6tab.qnssl.com/cblued/static/share.1cfmt4dejeet12.jpg'
]

const fileObj = {
  banner: 'https://os4ty6tab.qnssl.com/cblued/static/banner.1cf78rnppt708l.jpg',
  icon_left: 'https://os4ty6tab.qnssl.com/cblued/static/02_left.1ceqkkn731biiv1.jpg',
  icon_right: 'https://os4ty6tab.qnssl.com/cblued/static/02_right.1ceqkkn7912bro3.jpg',
  vote: 'https://os4ty6tab.qnssl.com/cblued/static/04_vote.1ceqkkof8ktdc7.jpg',
  rule: 'https://os4ty6tab.qnssl.com/cblued/static/05_rule.1ceqkknqb2qkdbi.jpg',
  video_bg: 'https://os4ty6tab.qnssl.com/cblued/static/video.1cet46ipr2ev270.jpg',
  btn: 'https://os4ty6tab.qnssl.com/cblued/static/07_Btn.1ceqkko082nfn00.png',
  person: 'https://os4ty6tab.qnssl.com/cblued/static/person1.1ceqkkq2625palm.png',
  icon_start: 'https://os4ty6tab.qnssl.com/cblued/static/start.1cer2517rf8hrl.png',
  icon_stop: 'https://os4ty6tab.qnssl.com/cblued/static/stop.1cer2517l22il16.png',
  jump: 'https://os4ty6tab.qnssl.com/cblued/static/jump.1cf4oh4t61is6mo.png',
  link1: 'https://os4ty6tab.qnssl.com/cblued/static/v2.1cff7htn6eh5h7.gif',
  link2: 'https://os4ty6tab.qnssl.com/cblued/static/tu3.1cfet4nqr20oitk.gif',
  link3: 'https://os4ty6tab.qnssl.com/cblued/static/tu2.1cfckmc7ejpbtg.gif',
  link4: 'https://os4ty6tab.qnssl.com/cblued/static/tu4.1cfckmcf02hjp01.gif',
  share: 'https://os4ty6tab.qnssl.com/cblued/static/share.1cfmt4dejeet12.jpg',
  full_video: 'https://os4ty6tab.qnssl.com/cblued/static/1080x1920v1c_md.1cfa2c3hm1eqnn1.mp4',
  full_video_poster: 'https://os4ty6tab.qnssl.com/cblued/static/3 2.1cfhb1bp517echi.gif',
  inner_video: 'https://os4ty6tab.qnssl.com/cblued/static/WeChatSight33.1ceq7kiop1715sm.mp4',
  inner_video_poster: 'https://os4ty6tab.qnssl.com/cblued/static/play.1cf4o73gt1idesi.jpg'
}
const imgWrap = []
function imgLoad (arr, index) {
  if (index >= arr.length) return
  if (index >= 1) {
    arr.forEach((item, i) => {
      if (i === 0) return
      imgWrap[i] = new Image()
      imgWrap[i].src = item
    })
    return
  }
  imgWrap[index] = new Image()
  imgWrap[index].onload = () => {
    imgLoad(arr, ++index)
  }
  imgWrap[index].onerror = () => {
    imgLoad(arr, ++index)
  }
  imgWrap[index].src = arr[index]
}

let u = window.navigator.userAgent
// android微信端
let isAndroidWeixin = (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) && u.indexOf('MicroMessenger') > -1
export default class Main extends Component {
  constructor (props) {
    super()
    this.state = {
      visible: false,
      jumpShow: false,
      playShow: false,
      playPause: false,
      usersInfo: usersInfo,
      modalText: '',
      modalVisible: false,
      modalHorizontal: false,
      fullvideo: false
    }
    this.first = true
    this.onVote = this.onVote.bind(this)
    this.onPlay = this.onPlay.bind(this)
    this.onFullPlay = this.onFullPlay.bind(this)
    this.onJumpFull = this.onJumpFull.bind(this)
    this.onFullEnded = this.onFullEnded.bind(this)
    this.onJumpAnchor = this.onJumpAnchor.bind(this)
    this.onOpenVideo = this.onOpenVideo.bind(this)
    this.checkStatus = this.checkStatus.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.showModal = this.showModal.bind(this)
    this.checkHorizontal = this.checkHorizontal.bind(this)
  }
  showModal (text) {
    // console.log(text)
    this.setState({
      modalVisible: true,
      modalText: text
    })
  }
  hideModal (e) {
    e.stopPropagation()
    e.preventDefault()
    this.setState({
      modalVisible: false,
      modalText: ''
    })
  }
  playOne (uid) {
    let other = window.CONFIG.videos
    // 将 此uid 之外的视频全部强制暂停
    if (other && other.length) {
      other.map((video) => {
        if (uid === video) return
        window[video].pause()
      })
    }
  }
   // 用户投票
  onVote (tid) {
    let isVote = true
    let count = 0
    // 是否是在端内打开 否则跳转到下载或唤起app
    if (env === 'website') {
      window.jump()
      return
    }
    if (!uid) {
      // alert('用户未登录')
      window.jump()
      return
    }
    // 是否在活动期间
    if (isEnd) {
      this.showModal('活动已结束')
      return
    }
    if (!isStart) {
      this.showModal('活动未开始')
      return
    }
    // 判断当前主播是否可投票
    this.state.usersInfo.forEach((item) => {
      if (item.uid === tid) {
        isVote = item.isVote
        // console.log(item.uid, tid)
      }
      if (item.isVote) {
        count++
      }
    })
    // 设置主播投票按钮不可点击
    if (isVote) return
    // 判断投票次数是否已用完
    if (count >= 3) {
      this.showModal('今日投票次数已用完')
      return
    }
    if (this.isVoting) {
      this.showModal('请勿重复投票')
      return
    }
    this.isVoting = true
    let data = {
      from: uid,
      to: tid
    }
    reqVote(data, env)
      .then((res) => {
        this.isVoting = false
        if (res.code === 200) {
          // 投票成功设置当前主播不可投票
          let _usersInfo = this.state.usersInfo.map((item) => {
            if (item.uid === tid) {
              item.ballot = (item.ballot + 1)
              item.isVote = true
            }
            return item
          })
          this.setState({
            usersInfo: _usersInfo
          })
        } else {
          this.showModal(res.msg)
        }
      })
      .catch((err) => {
        this.isVoting = false
        // console.log(err)
      })
  }
  // 初始化活动信息
  componentDidMount () {
    imgLoad(imgArr, 0)
    if (this.checkHorizontal()) {
      this.setState({
        modalHorizontal: true,
        visible: false
      })
    } else {
      this.setState({
        modalHorizontal: false
      })
    }
    // this.checkHorizontal()
    window.onresize = () => {
      if (this.checkHorizontal()) {
        this.fullNode.pause()
        this.setState({
          modalHorizontal: true
        })
      } else {
        this.setState({
          modalHorizontal: false
        })
        if (!this.state.visible) {
          // 微信
          // this.fullNode.play()
        }
      }
    }
  }
  checkHorizontal () {
    if (window.innerWidth > window.innerHeight) {
      // 横屏模式
      return true
    } else {
      // 竖屏模式
      return false
    }
  }
  componentWillUnmount () {
    if (this.videoNode) {
      this.videoNode.dispose()
    }
    if (this.fullNode) {
      this.fullNode.dispose()
    }
  }
  onPlay (e) {
    e.preventDefault()
    if (this.videoNode.paused) {
      this.videoNode.play()
      this.setState({
        playPause: false,
        playShow: true
      }, () => {
        setTimeout(() => {
          if (this.state.playPause) return
          this.setState({
            playShow: false
          })
        }, 300)
      })
    } else {
      this.videoNode.pause()
      this.setState({
        playPause: true,
        playShow: true
      })
    }
  }
  onFullPlay (e) {
    e.preventDefault()
    this.setState({
      fullvideo: true
    })
    this.fullNode.play()
    // console.log('全屏播放')
    setTimeout(() => {
      this.setState({jumpShow: true})
    }, 3000)
  }
  checkStatus () {
    this.first = false
    // 检测活动时间
    if (isEnd) {
      this.showModal('投票已结束！')
    }
    if (!isStart) {
      this.showModal('活动未开始')
    }
  }
  onJumpFull (e) {
    e.preventDefault()
    // console.log('退出全屏播放')
    this.fullNode.pause()
    this.setState({visible: true, jumpShow: false}, () => {
      if (!this.first) return
      setTimeout(() => {
        this.checkStatus()
      }, 200)
    })
  }
  onFullEnded () {
    this.fullNode.pause()
    this.setState({visible: true, jumpShow: false}, () => {
      if (!this.first) return
      setTimeout(() => {
        this.checkStatus()
      }, 200)
    })
  }
  onJumpAnchor (userLink) {
    // 是否是在端内打开 否则跳转到下载或唤起app
    if (env === 'website') {
      window.jump()
    } else {
      window.location.href = userLink
    }
  }
  onOpenVideo (e) {
    e.preventDefault()
    e.stopPropagation()
    // console.log('打开全屏并播放')
    if (this.checkHorizontal()) {
      this.showModal('请在竖屏模式下观看视频！')
      return
    }
    this.fullNode.currentTime = 0
    this.fullNode.play()
    this.setState({visible: false}, () => {
      setTimeout(() => {
        this.setState({jumpShow: true})
      }, 3000)
    })
  }
  render () {
    let { visible, usersInfo, modalText, modalVisible, modalHorizontal, jumpShow, fullvideo } = this.state
    // let { visible, playShow, playPause, usersInfo } = this.state
    // let playStyle = 'bird-video-icon '
    // if (playShow) {
    //   if (playPause) {
    //     playStyle += 'bird-video-pause'
    //   } else {
    //     playStyle += 'bird-video-play'
    //   }
    // }
    return (
      <div className='libratone'>
        <div visible='false' className={ (modalHorizontal && !visible) ? 'modal Horizontal-box is-show' : 'modal'}>
          <div className='libratone-box'>
            <div className='libratone-box-text'>请在竖屏模式下观看视频</div>
          </div>
        </div>
        <Modal visible={modalVisible}>
          <div className='libratone-box'>
            <div className='libratone-box-text'>{modalText}</div>
            <div onClick={this.hideModal} className='libratone-box-btn'>确定</div>
          </div>
        </Modal>
        <div className={visible ? 'contenthide' : 'full-video'} >
          <video className={fullvideo ? 'fullvideo' : 'fullvideohide' }
            onEnded={this.onFullEnded}
            x-webkit-airplay="allow"
            x5-video-player-type='h5'
            x5-video-player-fullscreen='true'
            x5-playsinline="true"
            webkit-playsinline="true"
            playsinline="true"
            ref={(node) => (this.fullNode = node) }
            poster={fileObj.full_video_poster}
            >
            <source src={fileObj.full_video} type="video/mp4" />
          </video>
          <img onClick={this.onFullPlay} className={fullvideo ? 'fullvideohide ' : 'fullvideo' } src={fileObj.full_video_poster} />
          { jumpShow ? (<img className={isAndroidWeixin ? 'full-jump' : 'full-jump-ios' } onClick={this.onJumpFull} src={fileObj.jump} />) : ''}
        </div>
        {visible ? (
          <div className={visible ? 'contentshow' : 'contenthide'}>
          <div className='bird-banner-wrap'>
            <img className='bird-banner' src={fileObj.banner} alt="小鸟音响"/>
            <div className='bird-stroy'>
              <p className='bird-stroy-p'>LIBRATONE，2009年诞生于丹麦，继承了丹麦优质声学传统和北欧优秀的设计理念，致力于打造自由、灵活的音频产品，其Logo上的小鸟标识源自丹麦作家安徒生的童话《夜莺》，在中国被亲切地称为“小鸟音响”。</p>
              {/* <img className='bird-stroy-icon-left' src={fileObj.icon_left} alt=""/> */}
              {/* <img className='bird-stroy-icon-right' src={fileObj.icon_right} alt=""/> */}
            </div>
          </div>
          <div className='bird-video-wrap'>
              <div className="bird-video-box">
                {/* <i className={playStyle} onClick={this.onPlay} ></i> */}
                {/* <video className="bird-video" onClick={this.onPlay} x5-video-player-type="h5" x5-video-player-fullscreen="true" x-webkit-airplay="allow" webkit-playsinline playsinline ref={(node) => (this.videoNode = node) } poster={fileObj.inner_video_poster} >
                  <source src={fileObj.inner_video} type="video/mp4" />>
                </video> */}
                <img className="bird-video" onClick={this.onOpenVideo} src={fileObj.inner_video_poster} />
              </div>
              <div className='bird-video-tit'>（风格参考视频）</div>
              <p className='bird-video-des'>LIBRATONE小鸟音响首度联手Blued平台，为年度旗舰新品TRACK+无线智能降噪耳机寻找有颜、有范儿、有内涵的男神代言人！</p>
          </div>
          <div className='bird-vote-wrap'>
            <p className='bird-vote-tit'>全民在线点赞投票参与活动，每人每天3次票选权利，由大家Pick出的C位天菜将佩戴TRACK+无线智能降噪耳机登上6月狂欢节封面，快来为你的天菜投票助力吧！</p>
            <div className='anchor-list'>

              <div className='anchor-group'>
                <div className='anchor-item'>
                  <img className='anchor-item-avator' src={usersInfo[0].avatar} onClick={() => this.onJumpAnchor(usersInfo[0].userLink)}/>
                  <p className='anchor-item-name'>{usersInfo[0].name}<span>{usersInfo[0].ballot}票</span></p>
                  <p className='anchor-item-des'>{usersInfo[0].declaration}</p>
                  <div className={ (isEnd || !isStart || usersInfo[0].isVote) ? 'anchor-item-btn disabled' : 'anchor-item-btn' } onClick={() => this.onVote(usersInfo[0].uid)} >{ usersInfo[0].isVote ? '已投' : '投票'}</div>
                </div>
                <div className='anchor-item anchor-item-r'>
                  <img className='anchor-item-avator' src={usersInfo[1].avatar} onClick={() => this.onJumpAnchor(usersInfo[1].userLink)}/>
                  <p className='anchor-item-name'>{usersInfo[1].name}&nbsp;&nbsp;<span>{usersInfo[1].ballot}票</span></p>
                  <p className='anchor-item-des'>{usersInfo[1].declaration}</p>
                  <div className={(isEnd || !isStart || usersInfo[1].isVote) ? 'anchor-item-btn disabled' : 'anchor-item-btn'} onClick={() => this.onVote(usersInfo[1].uid)} >{ usersInfo[1].isVote ? '已投' : '投票'}</div>
                </div>
              </div>

              <div className='anchor-group'>
                <div className='anchor-item'>
                  <img className='anchor-item-avator' src={usersInfo[2].avatar} onClick={() => this.onJumpAnchor(usersInfo[2].userLink)}/>
                  <p className='anchor-item-name'>{usersInfo[2].name}<span>{usersInfo[2].ballot}票</span></p>
                  <p className='anchor-item-des'>{usersInfo[2].declaration}</p>
                  <div className={(isEnd || !isStart || usersInfo[2].isVote) ? 'anchor-item-btn disabled' : 'anchor-item-btn'} onClick={() => this.onVote(usersInfo[2].uid)} >{usersInfo[2].isVote ? '已投' : '投票'}</div>
                </div>
                <div className='anchor-item anchor-item-r'>
                  <img className='anchor-item-avator' src={usersInfo[3].avatar} onClick={() => this.onJumpAnchor(usersInfo[3].userLink)}/>
                  <p className='anchor-item-name'>{usersInfo[3].name}&nbsp;&nbsp;<span>{usersInfo[3].ballot}票</span></p>
                  <p className='anchor-item-des'>{usersInfo[3].declaration}</p>
                  <div className={(isEnd || !isStart || usersInfo[3].isVote) ? 'anchor-item-btn disabled' : 'anchor-item-btn'} onClick={() => this.onVote(usersInfo[3].uid)} >{usersInfo[3].isVote ? '已投' : '投票'}</div>
                </div>
              </div>
              <div className='anchor-group'>
                <div className='anchor-item'>
                  <img className='anchor-item-avator' src={usersInfo[4].avatar} onClick={() => this.onJumpAnchor(usersInfo[4].userLink)}/>
                  <p className='anchor-item-name'>{usersInfo[4].name}<span>{usersInfo[4].ballot}票</span></p>
                  <p className='anchor-item-des'>{usersInfo[4].declaration}</p>
                  <div className={(isEnd || !isStart || usersInfo[4].isVote) ? 'anchor-item-btn disabled' : 'anchor-item-btn'} onClick={() => this.onVote(usersInfo[4].uid)} >{usersInfo[4].isVote ? '已投' : '投票'}</div>
                </div>
                <div className='anchor-item anchor-item-r'>
                  <img className='anchor-item-avator' src={usersInfo[5].avatar} onClick={() => this.onJumpAnchor(usersInfo[5].userLink)}/>
                  <p className='anchor-item-name'>{usersInfo[5].name}&nbsp;&nbsp;<span>{usersInfo[5].ballot}票</span></p>
                  <p className='anchor-item-des'>{usersInfo[5].declaration}</p>
                  <div className={(isEnd || !isStart || usersInfo[5].isVote) ? 'anchor-item-btn disabled' : 'anchor-item-btn'} onClick={() => this.onVote(usersInfo[5].uid)} >{usersInfo[5].isVote ? '已投' : '投票'}</div>
                </div>
              </div>
              <div className='anchor-group'>
                <div className='anchor-item'>
                  <img className='anchor-item-avator' src={usersInfo[6].avatar} onClick={() => this.onJumpAnchor(usersInfo[6].userLink)}/>
                  <p className='anchor-item-name'>{usersInfo[6].name}<span>{usersInfo[6].ballot}票</span></p>
                  <p className='anchor-item-des'>{usersInfo[6].declaration}</p>
                  <div className={(isEnd || !isStart || usersInfo[6].isVote) ? 'anchor-item-btn disabled' : 'anchor-item-btn'} onClick={() => this.onVote(usersInfo[6].uid)} >{usersInfo[6].isVote ? '已投' : '投票'}</div>
                </div>
                <div className='anchor-item anchor-item-r'>
                  <img className='anchor-item-avator' src={usersInfo[7].avatar} onClick={() => this.onJumpAnchor(usersInfo[7].userLink)}/>
                  <p className='anchor-item-name'>{usersInfo[7].name}&nbsp;&nbsp;<span>{usersInfo[7].ballot}票</span></p>
                  <p className='anchor-item-des'>{usersInfo[7].declaration}</p>
                  <div className={(isEnd || !isStart || usersInfo[7].isVote) ? 'anchor-item-btn disabled' : 'anchor-item-btn'} onClick={() => this.onVote(usersInfo[7].uid)} >{usersInfo[7].isVote ? '已投' : '投票'}</div>
                </div>
              </div>
            </div>
            <div className='bird-vote-prize'>
              <div className='bird-vote-prize-tit'>活动奖励</div>
              <div className='bird-vote-prize-p'>
                <p>活动结束后，将有6位幸运儿获得</p>
                <p>小鸟音响特别提供的的奖品</p>
              </div>
            </div>
          </div>
          <div className='bird-prize-wrap'>
            <a className='bird-prize-item' href="https://item.m.jd.com/product/7323107.html">
              <img className='bird-prize-img' src={fileObj.link1}/>
            </a>
            <a className='bird-prize-item' href="https://item.m.jd.com/product/3799206.html">
              <img className='bird-prize-img' src={fileObj.link2}/>
            </a>
            <a className='bird-prize-item' href="https://item.m.jd.com/product/2074481.html">
              <img className='bird-prize-img' src={fileObj.link3}/>
            </a>
            <a className='bird-prize-item' href="https://item.m.jd.com/product/2903067.html">
              <img className='bird-prize-img' src={fileObj.link4}/>
            </a>
          </div>
          <div className='bird-btm'>活动最终解释权归Blued官方平台所有</div>
        </div>
        ) : ''}

      </div>
    )
  }
}
