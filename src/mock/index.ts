import Mock, { Random } from 'mockjs'
import RandomMessage from './RandomMessage'

// 模拟接口延时
Mock.setup({
  timeout: '1000',
})

Mock.mock('/messages', function () {
  // 随机生成不同类型的 20 条消息
  const list = new Array(20).fill('').map(() => {
    const randomMessage = new RandomMessage()
    return randomMessage
  })
  return {
    list,
    // 假设一共 100 条
    total: 100,
  }
})
