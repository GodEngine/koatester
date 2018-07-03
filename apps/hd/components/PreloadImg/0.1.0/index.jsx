import React, { PropTypes, Component } from 'react'

export default class PreImg extends Component {
  state = { isImg: false }

  static propTypes = {
    imgSrc: PropTypes.string.isRequired,
    cls: PropTypes.string
  }

  componentDidMount () {
    let { imgSrc } = this.props
    let img = new Image()
    img.src = imgSrc
    img.onload = () => {
      this.setState({isImg: true})
    }
  }
  render () {
    let { imgSrc, cls } = this.props
    let { isImg } = this.state
    return <img className={cls} src={isImg ? imgSrc : require('./avatar.png')} />
  }
}
