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

1. 一共有以下三个角色，每个角色又有不同的消息类型（后续可以继续拓展）

  1. 用户自己的消息：图片 / 文字类型 / ...

  2. 来自别人的消息：图片 / 文字类型 / ...

  3. 来自系统的消息：时间 / 撤销消息 / ...

  因此项目中使用了工厂 / 策略模式用于生成数据 / 渲染组件，方便将来拓展，这里用 axios + mockjs 来模拟接口请求，对于接口异常的情况暂时不做处理

2. 顺手做了点图片优化：

   1. 图片懒加载，这里不重复造轮子（如通过 IntersectionObserver），通过 react-lazyload 来实现

   2. 列表中的图片通常只展示预览图，点击后查看的才是实际大图

   3. 由于图片较多，为了提升用户体验添加 react-content-loader 实现骨架屏。

      第二点通常通过添加 cdn 裁剪参数来实现，这里简单处理成预览图最高不超过 100 px。

## TODOS

1. 发送消息功能：

  1. 由于存在用户输入，需要注意防范 xss 攻击
  
  2. 如果需要支持富文本可以通过 quilljs
  
2. 关于状态管理：这里仅是一个简单的组件，可以暂时不加如 mobx， redux 等状态管理，以免增加系统的复杂度。

3. 当出现性能瓶颈时可以考虑通过 React.memo / useCallback / useMemo 等优化消息组件

4. 这里实现的是 pc 端，如果移动端版本的话还需要考虑到屏幕适配，键盘, 1px等可能存在的问题。

5. 由于样式不做强要求，没有用 css modules，实际上大一点的项目最好还是采用 css modules / css in js。

6. 数据量大的时候通常应该需要考虑性能问题，比如通过 `react-virtualized` 来实现，但是由于：

   1. 逆序，初始化时需要定位在列表底部

   2. 列表项高度不确定

   3. 无限加载

   4. 过快滚动来不及渲染的情况下出现空白并不是很好的体验

      综合以上多个因素，本着不过早优化的原则，暂时不考虑虚拟列表，仅通过 `react-infinite-scroller` 来实现无限滚动。

## 问题

实际上在 `MessageList` 文件中

```
<MessageComponent
  key={message.id}
  data={message as IIntersectionMessageData}
/>
```

此处的 `as` 断言有点取巧，因为此时的 `message` 应该是 `IUnioMessageData` 而非 `IIntersectionMessageData`。
但是在这里做确切的类型断言并不优雅（容易），例如根据条件 `message.from === MessageFrom.ME` 断言 `IMessageDataFromUser` 类型。
这应该是比较常见的场景了，看来对 typescript 的类型系统还有待更深入研究 😂
