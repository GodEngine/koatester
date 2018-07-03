import React, {Component, PropTypes} from 'react'

export default class Screen extends Component {
  static propTypes = {
    preLoadImages: PropTypes.array.isRequired,
    loadingComponent: PropTypes.element.isRequired,
    pageHash: PropTypes.string.isRequired,
    cls: PropTypes.string,
  }
  componentDidMount () {
    // 预加载图片数组
    let { preLoadImages, pageHash } = this.props
    let preLoadImagesLen = preLoadImages.length - 1
    let currentLoadImgCount = 0
    preLoadImages.map(imgSrc => {
      // 加载img
      let img = new Image()
      img.src = imgSrc
      img.onerror = img.onload = () => {
        ++currentLoadImgCount
        if (currentLoadImgCount > preLoadImagesLen) {
          window.location.hash = pageHash
        }
      }
      img = null // 回收,防止内存泄漏
    })
  }
  render () {
    let {loadingComponent, cls = ''} = this.props
    return (
      <div className={cls}>
        {loadingComponent}
      </div>
    )
  }
}
