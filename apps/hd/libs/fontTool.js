
/**
 * fontTool rem根字体大小设置
 * @param {屏幕最大宽度} bodyMaxWidth 
 * @param {设计稿宽度} designWidth 
 * eg: 设计稿200px = 2rem
 */
let fontTool = (bodyMaxWidth, designWidth) => {
  // 设置屏幕最大宽度
  document.body.style.maxWidth = `${bodyMaxWidth}px`
  // 设计稿宽度
  if (designWidth) {
    // 屏幕可见区宽度
    let screenWidth = document.documentElement.clientWidth

    if (screenWidth > bodyMaxWidth) {
      screenWidth = bodyMaxWidth
    }

    document.documentElement.style.fontSize = `${screenWidth / designWidth * 100}px`
    // 字体
    let fz = document.documentElement.style.fontSize.replace('px', '')
    // 手机设置字体大小
    let realfz = ~~(+window.getComputedStyle(document.getElementsByTagName('html')[0]).fontSize.replace('px', '') * 10000) / 10000
    if (fz !== realfz) {
      document.getElementsByTagName('html')[0].style.cssText = 'font-size: ' + fz * (fz / realfz) + 'px'
    }
  }
}
module.exports = {
  fontTool
}
