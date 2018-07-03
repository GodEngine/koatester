/**
 * Upload@0.1.1
 * on 2017-03-08 09:38
 */

import React, { PropTypes } from 'react'

import './index.scss'

const ACCEPTS = new Map([
  ['img', 'image/*']
])

const Upload = ({
  multiple, accept, disabled, onChange, children
}) => (
    <label className="upload">
      <input
        type="file"
        multiple={multiple}
        accept={accept}
        disabled={disabled}
        onChange={({ currentTarget: input }) => {
          // console.log('onChange')
          // console.log('input.files', input.files)
          if (input.files && input.files.length) {
            const fileList = []
            // console.log('Array.from(input.files)', Array.from(input.files))
            Array.from(input.files).map(file => {
              const fileObj = { file }
              let url = window.URL || window.webkitURL
              let imgSrc

              // 如果是图片，生成缩略图
              // console.log(
              //   `accept === 'image/*' && url && 'createObjectURL' in url`,
              //   accept === 'image/*' && url && 'createObjectURL' in url
              // )
              if (accept === 'image/*' && url && 'createObjectURL' in url) {
                imgSrc = url.createObjectURL(file)
                console.log('imgSrc', imgSrc)
                const thumbnailProps = {
                  src: imgSrc,
                  maxSize: 100,
                  size: 20,
                  // 在每次调用 createObjectURL() 方法时，都会创建一个新的 URL 对象，
                  // 即使你已经用相同的对象作为参数创建过。当不再需要这些 URL 对象时，
                  // 每个对象必须通过调用 URL.revokeObjectURL() 方法来释放。
                  // 浏览器会在文档退出的时候自动释放它们，但是为了获得最佳性能和内存使用状况，
                  // 你应该在安全的时机主动释放掉它们。
                  onLoad: e => url.revokeObjectURL(e.target.src)
                }

                fileObj.thumbnail = <img {...thumbnailProps} />
                fileObj.imgSrc = imgSrc
                fileList.push(fileObj)
              }
            })
            // console.log('fileList', fileList)
            // console.log('onChange', onChange)
            onChange(fileList)
            // 置空 这样昂选择两个相同图片的时候 还可以触发onchange 事件
            input.value = null
          }
        }}
      />
      {children}
    </label>
  )

Upload.propTypes = {
  multiple: PropTypes.bool.isRequired,
  accept: PropTypes.oneOf(Array.from(ACCEPTS.values())).isRequired,
  disabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
}

Upload.defaultProps = {
  multiple: false,
  accept: ACCEPTS.get('img'),
  disabled: false,
  onChange: () => { }
}

export default Upload
