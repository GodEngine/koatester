import React, {Component} from 'react'
import Modal from '../../../../components/Modal/0.2.0'
import req from '../../../../utils/req@0.2.0'
// import {findDOMNode} from 'react-dom'
import './index.scss'

export default class Name extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false
    }
  }
  componentDidMount () {
    let height = document.body.scrollHeight
    this.setState({
      height
    })
  }
  next = () => {
    let inpuText = this.refs.inputs.value
    inpuText = String(inpuText).trim()
    if (!inpuText) {
      return
    }
    if (inpuText.length > 12) {
      alert('名字长度请小于12')
      return
    }
    this.setState({
      loading: true
    })
    window.setName = inpuText
    this.props.next(inpuText)
    // req({
    //   endpoint: `2018-vip/`,
    //   callback: (res) => {
    //     this.setState({
    //       loading: false
    //     }, () => {
    //       if (res.status === 200) {
    //       } else {
    //       }
    //     })
    //   }
    // })
  }
  // focus = (e) => {
  //   alert('click')
  //   let inputNode = this.refs.inputs
  //   inputNode.focus()
  //   e.prevenDefault()
  //   e.stopPropagation()
  // }
  render () {
    return (
      <div className='page swiper-no-swiping' style={{'height': this.state.height}}>
        <img src={require('../../img/name-page.jpg')} alt=""/>
        <div className="name-input">
          <img src={require('../../img/name-input.png')} alt=""/>
          <input type="text" ref='inputs' placeholder='长按输入'/>
        </div>
        <div className="result-button">
          <img src={require('../../img/result-button.png')} alt="" onClick={this.next}/>
        </div>
        <Modal visible={this.state.loading}>
          <div className="loading">
            <img src={require('../../img/loading.png')} alt=""/>
            <span>100%</span>
            <span>档案生成中.....</span>
          </div>
        </Modal>
      </div>
    )
  }
}
