let raf = require('raf')
export default ({
  imgSrc,
  width = 425,
  height = 300,
  size = 50,
  startTime = 1000,
  step = 2,
  changeSize = typeof changeSize === 'string' ? changeSize : Math.random() * 0.04
}) => {
  //  如果没有传递src  则直接返回
  if (!imgSrc) return null
  let canvas = document.getElementById('canvas')

  // 如果当前浏览器不支持 canvas 直接返回
  if (!canvas.getContext) return '您的浏览器不支持canvas'
  let ctx = canvas.getContext('2d')

  let img = new Image()
  img.src = imgSrc

  img.onload = () => {
    // 开启定时器进行实例位置变化
    raf(function tick () {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.ary.map((item) => item.erase().draw())
      raf(tick)
    })
  }

  // 随机位置产生实例
  ctx.ary = []// 保存数组 存入实例
  class Bubble {
    constructor () {
      this.x = Math.random() * width // x 方向
      this.y = Math.random() * height // y 方向
      this.cX = this.cY = Math.random() * step // 每次实例位置变动
      this.size = Math.random() * size
      ctx.ary.push(this)
      // 如果数组长度大于10个 为了防止产生过多实例 从数组中删掉最开始的
      if (ctx.ary.length > 10) ctx.ary.shift()
    }
    erase () {
      // 擦除幕布
      if (changeSize) {
        this.size -= changeSize
        if (this.size < 0) {
          ctx.ary.splice(ctx.ary.indexOf(this), 1)
        }
      }

      this.x += this.cX
      this.y += this.cY
      return this
    }
    draw () {
      // 绘制图案
      ctx.drawImage(img, this.x, this.y, this.size, this.size)
    }
  }

  // 开启定时器产生实例
  setInterval(() => new Bubble(), startTime)
}
