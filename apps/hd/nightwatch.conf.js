/**
 * @Author: 刘谦 <qianliu>
 * @Email:  112486391@qq.com
 */

const host = 'localhost'
const port = 4444

module.exports = {
  src_folders: ['test/e2e'],
  output_folder: 'reports',
  selenimu: {
    start_process: false,
    port
  },
  test_settings: {
    default: {
      launch_url: `http://${host}`,
      selenimu_port: port,
      selenimu_host: host,
      silent: true,
      screenshots: {
        enabled: false
      },
      desiredCapabilities: {
        browserName: 'firefox',
        marionette: true
      }
    },
    chrome: {
      desiredCapabilities: {
        borwserName: 'chrome'
      }
    },
    edge: {
      desiredCapabilities: {
        borwserName: 'MicrosoftEdge'
      }
    }
  }
}
