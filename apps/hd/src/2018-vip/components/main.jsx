import React, {Component} from 'react'
import Carousel from '../../../components/Carousel/0.3.1'
// import FastClick from 'fastclick'
import {Page0, Question, Result, Name} from './'
// 处理数据
// import req from '../../../utils/req@0.2.0'

let config = window.CONFIG

let myswiper
export default class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      answers: [],
      name: '',
      initialSlide: 0
    }
    this.nextPage = this.nextPage.bind(this)
    this.prevPage = this.prevPage.bind(this)
    this.count = this.count.bind(this)
    this.refresh = this.refresh.bind(this)
  }

  refresh () {
    myswiper.swiper.slideTo(0)
  }
  // 点击下一题,并存储题目的分值
  nextPage (arg) {
    if (typeof arg === 'string') {
      this.setState({
        name: arg
      })
    } else if (typeof arg === 'object') {
      let ans = this.state.answers
      ans[arg.index] = arg.ans
    }
    myswiper.swiper.slideNext()
  }
  // 点击上一题
  prevPage () {
    myswiper.swiper.slidePrev()
  }

  count () {
    // 存储当前用户的数据
    // req({
    //   endpoint: '2017-smtest/answer',
    //   method: 'POST',
    //   data: {
    //     uid,
    //     m: re.m, // 原始答案 ABCD
    //     n: re.n, // 数字形式显示 1234
    //     s: re.s
    //   },
    //   callback: ({code}) => {
    //     // 当保存答案成功了 才跳入下一页
    //     if (code === 200) {
    //
    //     }
    //   }
    // })
  }

  componentDidMount () {
    // document.addEventListener('DOMContentLoaded', () => {
    //   FastClick.attach(document.body)
    // }, false)
    myswiper = document.querySelector('.swiper-container')
  }

  render () {
    let carouselProps = {
      fullScreen: true,
      animate: true,
      direction: 'horizontal',
      preventClicks: false,
      initialSlide: this.state.initialSlide
    }

    return (
      <Carousel {...carouselProps} >
        <div> <Page0 next={this.nextPage} /> </div>
        <Question prev={this.prevPage} next={this.nextPage} key={0} index={0}/>
        <Question prev={this.prevPage} next={this.nextPage} key={1} index={1}/>
        <Question prev={this.prevPage} next={this.nextPage} key={2} index={2}/>
        <Question prev={this.prevPage} next={this.nextPage} key={3} index={3}/>
        <Name prev={this.prevPage} next={this.nextPage}></Name>
       <div> <Result data={this.state} refresh={this.refresh} /> </div>
      </Carousel>
    )
  }
}
