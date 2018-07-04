/**
 * Preload img
 *
 * @param {String} src Img src

 */

export default (src) => {
  let img = new Image()
  img.onload = () => { img = null } // Avoid memory leak
  img.src = src
}
