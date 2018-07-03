# Upload 上传
`0.1.1`

## 何时使用
当需要上传一个文件或一些文件时。（暂不支持上传到 CDN）

- 单个或多个文件上传
- 接受上传文件的类型
- 如果是图片，返回缩略图

## 代码片段
```javascript
<Upload>
  <a href="javascript:;">点击上传</a>
</Upload>
```

## API
### Upload
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| multiple | 是否支持多选文件 | Boolean | false |
| maxSize | 设定上传文件的最大size 以kb为单位 | Number | false |
| accept | 接受上传的文件类型，详见 [input accept Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept) | String | "image/*" |
| disabled | 是否禁用上传功能 | Boolean | false |
| onChange | 选择上传文件后的回调，如果是图片则附带缩略图 thumbnail (React Node) | Function ([{ file, imgSrc, thumbnail? }]) {} | noop |
