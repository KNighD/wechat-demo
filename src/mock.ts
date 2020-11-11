import Mock, { Random } from 'mockjs';

// 模拟接口延时
Mock.setup({
  timeout: '1000'
})

Mock.mock('/messages', function () {
  const list = new Array(20).fill('').map(() => Random.cparagraph(1, 3))
  return {
    list,
    // 假设一共 100 条
    total: 100
  }
})