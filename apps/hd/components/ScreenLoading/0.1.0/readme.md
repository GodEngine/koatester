# ScreenLoading 首屏加载处理
`0.1.0`

## 何时使用
当项目中有大量图片需要加载

## 代码片段
```javascript
const screenProps = {
  preLoadImages,
  pageHash,
  loadingComponent,
  cls
}

<ScreenLoading {...screenProps} />
```

## API
### ScreenLoading
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| preLoadImages | 预加载的图片 | Array | 无 |
| pageHash | 预加载结束之后，需要变更的hash值 | String | 无 |
| loadingComponent | 预加载页面组件 | Component | 无 |
| cls | className | String | 无 |
