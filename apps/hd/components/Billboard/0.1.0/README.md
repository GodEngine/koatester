# 排行榜
`0.1.0`

## 何时使用
当需要展示排行榜时。

## API
### Paster
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| list | 排行榜数据 | array[object] | [] |
| dividerColor | 分割线颜色 | string | '#000' |

### .list
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| avatar | 用户头像 | string | 无 |
| name | 用户名称 | string | 无 |
| nameStyle | 用户名称样式 | object | {} |
| counters | 计数组 | array[object] | [] |

### .list.counters
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| icon | 图标组件 | jsx | 无 |
| count | 数量 | number | 无 |
| countStyle | 计数元素样式 | object | {} |
