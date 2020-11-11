import React from 'react'
import { IImageMessage, ITextMessage, IUnknownMessage } from '../data'
import UserMessageContent from './UserMessageContent'

interface Props {
  data: ITextMessage & IImageMessage & IUnknownMessage
}

// 来自自己的消息
const MyMessage = ({ data }: Props) => {
  return (
    <div className="my-message-container">
      <img className="avatar" src={data.avatar} alt="avatar" />
      <div className="content-wrap">
        <UserMessageContent data={data} />
      </div>
    </div>
  )
}

export default MyMessage
