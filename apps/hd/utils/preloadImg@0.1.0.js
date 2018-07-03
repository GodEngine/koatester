/**
 * Preload img
 *
 * @param {String} src Img src
 *
 * @Author: 刘谦 <qianliu>
 * @Email:  112486391@qq.com
 */

export default (src) => {
  let img = new Image()
  img.onload = () => { img = null } // Avoid memory leak
  img.src = src
}
