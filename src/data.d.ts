import { MessageTypes, MessageFrom } from './constants'

export interface IMessageData {
  // id
  id: string
  // 消息类型
  type: MessageTypes
  // 消息内容
  content: string
  // 消息来源
  from: MessageFrom
  // 创建时间
  createTime: string
}

// 来自用户的信息
export interface IMessageDataFromUser extends IMessageData {
  // 头像
  avatar: string
  // 用户名
  userName: string
}

// 来自系统的信息
export interface IMessageDataFromSystem extends IMessageData {
}

export type ICommonMessageData = IMessageDataFromUser | IMessageDataFromSystem
