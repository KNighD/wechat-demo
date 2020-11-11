// 消息类型
export enum MessageTypes {
  UNKNOWN = 0,
  TEXT = 1,
  IMAGE = 2,
  WITHDRAW = 3,
  TIME = 4,
}

// 消息来源
export enum MessageFrom {
  // 当前用户发送的
  ME = 1,
  // 别人发送的
  OTHER = 2,
  // 系统发送的
  SYSTEM = 3
}
