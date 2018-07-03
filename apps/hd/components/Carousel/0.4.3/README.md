# Carousel 走马灯
`0.4.2`

## 何时使用
- 当有一组平级的内容
- 当内容空间不足时，可以用走马灯的形式进行收纳，进行轮播展现
- 常用于一组图片或卡片轮播或滑动翻页
- 支持动画

## 代码片段
```javascript
import Carousel from './index'

// 常规
<Carousel>
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
</Carousel>

// 动画
<Carousel>
  <div data-animate-effect="fadeInUp">Slide 1</div>
  <div data-animate-effect="fadeInLeft">Slide 2</div>
  <div data-animate-effect="fadeInRight">Slide 3</div>
</Carousel>
```

## API
### Carousel
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| fullscreen | 是否撑满全屏 | Boolean | false |
| animate | 是否开启 Slide 动画 | Boolean | false |
| params | <a href="https://github.com/nolimits4web/Swiper/blob/Swiper3/API.md" target="_blank">Swiper Parameters</a> | Object | { } |
| children | 卡片组 | React Node List | 无 |

### Animation
#### 通过在 DOM Node 上设定属性开启动画
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data-animate-effect | 对该 Node 开启动画同时指定动画类型<br /><a href="https://daneden.github.io/animate.css/" target="_blank">查看支持的动画类型</a> | String | 无 |
| data-animate-duration | 动画持续时间 | String | "1s" |
| data-animate-delay | 动画延迟多久后执行 | String | "0s" |
