/**
 * Webpack.resolve
 *
 * Created by 刘谦 <qianliu> 112486391@qq.com
 * on 2017-02-27 16:09
 */

import path from 'path'

export default ({ isProd, needReact }) => ({
  extensions: [
    '.jsx', '.js', 
    '.web.ts', '.web.tsx', '.web.js', '.web.jsx',
    '.ts', '.tsx',
    '.json'
  ],
  modules: [
    // 减少构建搜索或编译路径，可以获得显著的性能提升
    path.resolve(__dirname, '../src/'),
    'node_modules'
  ],
  // http://webpack.github.io/docs/configuration.html#resolve-alias
  alias: {
    'babel-polyfill': path.resolve(__dirname, '../node_modules/babel-polyfill/dist/polyfill.min.js'),
    'whatwg-fetch': path.resolve(__dirname, '../node_modules/whatwg-fetch/fetch.js'),
    'fastclick': path.resolve(__dirname, '../node_modules/fastclick/lib/fastclick.js'),
    'react': needReact
        ? path.resolve(__dirname, `../node_modules/react/dist/react${isProd ? '.min' : ''}.js`)
        : path.resolve(__dirname, `../node_modules/preact-compat/dist/preact-compat${isProd ? '.min' : ''}.js`),
    'react-dom': needReact
        ? path.resolve(__dirname, `../node_modules/react-dom/dist/react-dom${isProd ? '.min' : ''}.js`)
        : path.resolve(__dirname, `../node_modules/preact-compat/dist/preact-compat${isProd ? '.min' : ''}.js`),
    'react-router': path.resolve(__dirname, `../node_modules/react-router/umd/react-router${isProd ? '.min' : ''}.js`),
    'react-router-dom': path.resolve(__dirname, `../node_modules/react-router-dom/umd/react-router-dom${isProd ? '.min' : ''}.js`),
    'react-lazyload': path.resolve(__dirname, '../node_modules/react-lazyload/'),
    'classnames': path.resolve(__dirname, '../node_modules/classnames/index.js'),
    'lodash.debounce': path.resolve(__dirname, '../node_modules/lodash.debounce/index.js'),
    'antd-mobile': path.resolve(__dirname, '../node_modules/antd-mobile/'),

    // 添加几个 /hd 下的目录便于引用
    'components': path.resolve(__dirname, '../components'),
    'libs': path.resolve(__dirname, '../libs'),
    'utils': path.resolve(__dirname, '../utils')
  }
})
