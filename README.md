# 模拟微信信息流组件 FOR PC

## WorkFlow
项目通过 create-react-app 快速搭建
```
// 启动开发
yarn start
// 编译
yarn build
// 发布
deploy
```

demo 预览地址：https://knighd.github.io/wechat-demo/

## 思路

1. 一共有以下三个角色，每个角色又有不同的消息类型（后续可以继续拓展）

   1. 用户自己的消息：图片 / 文字类型 / ...

   2. 来自别人的消息：图片 / 文字类型 / ...

   3. 来自系统的消息：时间 / 撤销消息 / ...

      因此项目中使用了工厂 / 策略模式用于生成数据 / 渲染组件，方便将来拓展，这里用 axios + mockjs 来模拟接口请求，对于接口异常的情况暂时不做处理（Mockjs 提供的图片地址似乎不稳定，有可能出现加载不出来的情况 ☠️）

2. 顺手做了点图片优化：

   1. 图片懒加载，这里不重复造轮子（如通过 IntersectionObserver），通过 react-lazyload 来实现

   2. 列表中的图片通常只展示预览图，点击后查看的才是实际大图

   3. 由于图片较多，为了提升用户体验添加 react-content-loader 实现骨架屏。

      第二点通常通过添加 cdn 裁剪参数来实现，这里简单处理成预览图最高不超过 100 px。

3. 倒序无限列表：原先是通过 `react-infinite-scroller` 来实现的，但是在发现滚动条的定位存在一些小问题：

   1. 在加载第一屏数据后并没有完全滚动到底部，会有一点点偏差

   2. 在加载最后一屏数据后，没有保持住当前滚动条的高度

   解决方案：自己来实现一个简单的倒序无限列表，这里用了 `react-waypoint` 实现下拉加载（同理这里可以用 IntersectionObserver 替代），用 flex 的 `flex-direction: column-reverse;` 实现列表的倒序。

## TODOS

1. 发送消息功能：

   1. 由于存在用户输入，需要注意防范 xss 攻击
  
   2. 如果需要支持富文本可以通过 quilljs

2. 状态管理：这里仅是一个简单的组件，可以暂时不加如 mobx， redux 等状态管理，以免增加系统的复杂度。

3. 组件性能优化：性能瓶颈时可以考虑通过 React.memo / useCallback / useMemo 等优化消息组件

4. 由于样式不做强要求，没有用 css modules，实际上大一点的项目最好还是采用 css modules / css in js。

5. 列表优化：数据量大的时候通常应该需要考虑性能问题，比如通过 `react-virtualized` 来实现，但是由于

   1. 逆序，初始化时需要定位在列表底部

   2. 列表项高度不确定

   3. 无限加载

   4. 过快滚动来不及渲染的情况下出现空白并不是很好的体验

      综合以上多个因素，本着不过早优化的原则，暂时不考虑虚拟列表。

## 存在的问题

1. 移动端：这里在是 pc 端实现的无限倒序滚动，而在移动端（ios 13.6 测试出现，最新的 14.x 版本未发现，安卓未测试）存在一些问题，体现在下拉加载更多时会滚动到顶部，而非固定在当前的位置，并且会不渲染列表，直至滚动时才渲染，应该是 ios 的 bug 了。
实际上如果是 RN 或者 Flutter 都对列表提供了良好的支持, 如 FLatList 的 `inverted`。
而如果移动端就是要用 web 去实现，应该可以考虑尝试以下方案：记录滚动条的定位，在加载完数据后，手动 scrollTo 到计算出的最新滚动条高度，或者依然采用 `react-infinite-scroller`。

2. 在 `MessageList` 文件中

```
<BaseMessage
  key={message.id}
  data={message as IIntersectionMessageData}
/>
```

此处的 `as` 断言有点取巧，因为此时的 `message` 应该是 `IUnioMessageData` 而非 `IIntersectionMessageData`。
但是在这里做确切的类型断言并不优雅（容易），例如根据条件 `message.from === MessageFrom.ME` 断言 `IMessageDataFromUser` 类型。
这应该是比较常见的场景了，看来对 typescript 的类型系统还有待更深入研究 😂