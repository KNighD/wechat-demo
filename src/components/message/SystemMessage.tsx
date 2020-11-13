import React from 'react'
import { IMessageDataFromSystem } from '../../data'
import { MessageTypes } from '../../constants'
import WithdrawMessage from './WithdrawMessage'
import TimeMessage from './TimeMessage'

interface Props {
  data: IMessageDataFromSystem
}

const MessageComponentsMap: {
  [key: string]: ({ data }: Props) => JSX.Element
} = {
  [MessageTypes.WITHDRAW]: WithdrawMessage,
  [MessageTypes.TIME]: TimeMessage,
}

// 来自系统的消息
const SystemMessage = ({ data }: Props) => {
  const MessageComponent = MessageComponentsMap[data.type]
  return (
    <div className="system-message-container">
      <MessageComponent data={data} />
    </div>
  )
}

export default SystemMessage
