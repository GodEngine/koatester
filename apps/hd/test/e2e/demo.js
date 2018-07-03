/**
 * @Author: 刘谦 <qianliu>
 * @Email:  112486391@qq.com
 */

module.exports = {
  demo: (browser) => {
    browser
      .url('http://www.blued.com/cn')
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('img.store-icon', 1000)
      .click('img.store-icon')
      .pause(3000)
      .assert.title('Blued-全球同志直播交友软件：在 App Store 上的内容')
      .end()
  }
}
