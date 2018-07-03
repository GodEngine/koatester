# Modal 对话框
`0.2.0`

## 何时使用
需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 Modal 在当前页面正中打开一个浮层，承载相应的操作。

- 黑色半透遮罩背景
- 子元素绝对居中

## 更新内容
增加onClick参数,可在父组件做隐藏处理

## API
### Modal
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| cls | 额外的 className | string | '' |
| visible | 对话框是否可见 | Boolean | false |
| onClick | 点击处理模态框 | function | |
