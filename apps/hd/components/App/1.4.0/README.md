# App 布局容器
`1.4.0`

## 何时使用
运营活动最外层容器。

- Hash Router (react-router-dom@4)
- Body Max Width
- Rem Layout
- Sticky Footer
- Return Top
- fetch
- Fastclick
- Viewport Fix ([Viewport Units Buggyfill](https://github.com/rodneyrehm/viewport-units-buggyfill))

## API
### App
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| bodyMaxWidth | body 最大宽度 (px) | Number | 425 |
| designWidth | 设计稿宽度 (px)，若需要 Rem Layout 请设置大于 0 | Number | 0 |
| homeBgStyle | 容器背景样式 | Object | {} |
| introBgStyle | 活动详情背景样式 | Object | {} |
| footerImgSrc | 页脚图片链接 | String | 无 |
| returnTop | 返回顶部 | Object | {} |

### App.returnTop
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| component | 返回顶部按钮 | React Node | 无 |
| visibilityHeight | 滚动高度达到此参考数值才显示 | Number | 300 |
| speed | 点击后，多少 ms 内滚动回顶部 | Number | 300 |
| right | 相对屏幕右边的距离 | String | "10px" |
| bottom | 相对屏幕底边的距离 | String | "10px" |
