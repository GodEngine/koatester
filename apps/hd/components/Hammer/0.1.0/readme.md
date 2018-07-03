# Hammer 手势组件
`0.1.0`

## 何时使用
需要对目标元素进行手势处理

## 代码片段
```html
<Hammer target={target} />
```

## API
### Hammer
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| targets | 目标图片元素数组 | Array | 无 |
| maxWidth | 目标图片元素的最大宽度 | Number | 300 |
| minWidth | 目标图片元素的最小宽度 | Number | 40 |
| maxHeight | 目标图片元素的最大高度 | Number | 300 |
| minHeight | 目标图片元素的最小高度 | Number | 40 |
| canRemove | 是否支持移除图片 | Boolean | 无 |
| onClickRemove | 点击取消按钮的回调 | Function | 无 |
| gesture | 需要支持的手势操作 | Object | 默认支持 drag 、rotate 、zoom 三种手势 |
| gesture | 需要支持的手势操作 | Object | 默认支持 drag 、rotate 、zoom 三种手势 |
