import React, {Component} from 'react'
import './index.scss'
export default class Question extends Component {
  constructor (props) {
    super(props)
    this.prev = this.prev.bind(this)
    this.next = this.next.bind(this)
  }
  next (e) {
    let ans = e.currentTarget.getAttribute('data-ans')
    let index = this.props.index

    let re = {
      index,
      ans
    }
    this.props.next(re)
  }

  prev () {
    this.props.prev()
  }

  render () {
    let index = this.props.index
    const backImgMap = ['first', 'second', 'third', 'fourth']
    return (
      <div className='page swiper-no-swiping'>
        <img src={require(`../../img/${backImgMap[index]}-page.jpg`)} />
        <div className='answers'>
          <span className="ans1">
            <img src={require(`../../img/ans${index + 1}a.png`)} alt="" onClick={(e) => this.next(e)} data-ans='a'/>
          </span>
          <span className="ans2">
            <img src={require(`../../img/ans${index + 1}b.png`)} alt="" onClick={(e) => this.next(e)} data-ans='b'/>
          </span>
        </div>
      </div>
    )
  }
}
