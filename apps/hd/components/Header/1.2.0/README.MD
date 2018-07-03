# Header 页头

`1.2.0`

## 何时使用

顶部需要 Banner 图，首页 - 活动详情页跳转。

- 头图
- 支持 首页 - 活动详情页 跳转

  - `/` 首页（初始）
  - `/intro` 活动详情页

- 支持渲染子元素
- 支持为头部添加类名、样式以及自定义属性

## API

参数                   | 说明                          | 类型         | 默认值
-------------------- | --------------------------- | ---------- | ---
introBtnComponent    | 活动详情按钮                      | React Node | 无
introOnClick         | 点击 intro 时的回调函数，此时页面将不再进行跳转 | Function   | 无
backBtnComponent     | 活动详情返回首页按钮                  | React Node | 无
bannerComponent      | 头图组件                        | React Node | 无
introBannerComponent | 活动详情头图组件                    | React Node | 无
introComponent       | 活动详情组件                      | React Node | 无
headerClass          | 自定义组件类名                     | String     | 无
headerStyle          | 自定义组件CSS属性                  | Object     | 无
headerProps          | 自定义属性                       | Object     | 无
introClass           | 自定义组件类名 仅当页面位于活动详情页才添加此类名   | String     | 无
