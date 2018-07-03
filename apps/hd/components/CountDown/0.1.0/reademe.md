# CountDown 图片倒计时
`0.1.0`

## 何时使用
倒计时翻牌

```javascript
<Countdown isEnd={false} stop={new Date(Number(1515139200000))} />
```


## API
### PreloadImg
| 参数 | 说明 | 类型 | 默认值 | 是否必须 |
| --- | --- | --- | --- |
| stop | 某一个时间点 | timestamp  | 无 | 是 |
| isEnd | 倒计时是否结束 | Boolean | false | 是 |
