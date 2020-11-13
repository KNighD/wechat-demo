import React from 'react'
import { IMessageDataFromUser, IImageMessage, IUnknownMessage } from '../../data'
import { MessageTypes } from '../../constants'
import ImageMessage from './ImageMessage'
import TextMessage from './TextMessage'
import UnknownMessage from './UnknownMessage'

interface Props {
  data: IMessageDataFromUser & IImageMessage & IUnknownMessage
}

const MessageComponentsMap: {
  [key: string]: ({ data }: Props) => JSX.Element
} = {
  [MessageTypes.IMAGE]: ImageMessage,
  [MessageTypes.TEXT]: TextMessage,
  [MessageTypes.UNKNOWN]: UnknownMessage,
}

const UserMessageContent = ({ data }: Props) => {
  const MessageComponent = MessageComponentsMap[data.type]
  return (
    <div>
      <MessageComponent data={data} />
    </div>
  )
}

export default UserMessageContent
