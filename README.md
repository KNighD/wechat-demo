# 模拟微信信息流组件

## WorkFlow
项目通过 create-react-app 快速搭建
```
// 启动开发
yarn start
// 编译
yarn build
```

## 思路

1. 不同的消息组件通过策略模式，便于将来拓展
2. 数据量大的时候通常应该需要考虑性能问题，比如通过 `react-virtualized` 来实现，但是由于：
  1. 逆序，初始化时需要定位在列表底部
  2. 列表项高度不确定
  3. 无限加载
  4. 过快滚动来不及渲染的情况下出现空白并不是很好的体验
  综合以上多个因素，本着不过早优化的原则，暂时不考虑虚拟列表，仅通过 `react-infinite-scroller` 来实现无限滚动。
3. 除了使用虚拟列表来优化性能，还要考虑图片的优化：
  1. 图片懒加载
  2. 列表中的图片仅展示预览图，点击后查看的才是实际大图
  3. 列表中的图片质量压缩
  这两点比较容易实现，第二，三点通常通过添加 cdn 裁剪参数来实现。
4. 对于消息组件本身的实现上可以视情况通过 React.memo 防止无意义的 rerender
5. 关于状态管理：这里仅是一个简单的组件，可以暂时不加如 mobx， redux 等状态管理，以免增加系统的复杂度。
6. 发送消息：输入框支持纯文本（暂不支持富文本，后续可以通过 quilljs 实现），支持选择图片。
7. 由于存在用户输入，需要注意 xss 攻击。
8. 这里实现的是 pc 端，如果移动端版本的话还需要考虑到屏幕适配，键盘, 1px等可能存在的问题。
9. 消息分成以下几种（后续可以继续拓展）：
  1. 用户的消息：图片或者文字类型
  2. 来自别人的消息：图片或者文字类型
  3. 来自系统的消息：时间 / 撤销消息
  这里用 axios + mockjs 来模拟接收服务端数据，对于接口异常的情况暂时不做处理
10. 样式不做强要求，暂不用 css modules，简单写进 app.css 里。