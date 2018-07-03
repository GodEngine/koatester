# Tabs 标签页
`0.1.0`

## 何时使用
提供平级的区域将大块内容进行收纳和展现，保持界面整洁。

## 代码片段
```javascript
import Tabs, { TabPane } from './index'

<Tabs>
  <TabPane order="0" tab="Tab 1">第一个 Tab 里的内容</TabPane>
  <TabPane order="1" tab="Tab 2">第二个 Tab 里的内容</TabPane>
  <TabPane order="2" tab="Tab 3">第三个 Tab 里的内容</TabPane>
</Tabs>
```

## API
### Tabs
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 根节点样式名 | String | 无 |
| classPrefix | 样式名前缀 | String | "tabs" |
| defaultActiveIndex | 默认的激活索引，tab 内部自控 | Number | 0 |
| activeIndex | 激活索引，外部控制 tab | Number | 无 |
| onChange | 切换 tab 时的回调函数 | Function | noop |
| children | tab pane | React Node / React Node List | 无 |

### TabPane
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| order | 标签顺序 | String | 无 |
| tab | 标签头 | String / React Node | 无 |
| disabled | 是否禁用 | Boolean | 无 |
| isActive | 是否激活 | Boolean | 无 |
