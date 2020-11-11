import React from 'react'
import { IImageMessage, ITextMessage, IUnknownMessage } from '../data'
import UserMessageContent from './UserMessageContent'

interface Props {
  data: ITextMessage & IImageMessage & IUnknownMessage
}

// 来自别人的消息
const OtherMessage = ({ data }: Props) => {
  return (
    <div className="other-message-container">
      <img className="avatar" src={data.avatar} alt="avatar" />
      <div className="content-wrap">
        <UserMessageContent data={data} />
      </div>
    </div>
  )
}

export default OtherMessage
