/**
 * 将 CSS 文件单独打包提取出来
 *
 * Created by 刘谦 <qianliu> 112486391@qq.com
 * on 2017-02-27 16:05
 */

import ExtractTextPlugin from 'extract-text-webpack-plugin'

export const getVendorExtractTextPlugin = ({ project }) => new ExtractTextPlugin({
  filename: `${project}/css/vendor-[contenthash:8].css`,
  disable: false,
  allChunks: true
})

export const getExtractTextPlugin = ({ project }) => new ExtractTextPlugin({
  filename: `${project}/css/[name]-[contenthash:8].css`,
  disable: false,
  allChunks: true
})
