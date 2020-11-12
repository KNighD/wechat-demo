import React from 'react'
import {  IIntersectionMessageData } from '../data'
import { MessageFrom } from '../constants'
import MyMessage from './MyMessage'
import OtherMessage from './OtherMessage'
import SystemMessage from './SystemMessage'

interface Props {
  data: IIntersectionMessageData
}

const MessageComponentsMap = {
  [MessageFrom.ME]: MyMessage,
  [MessageFrom.OTHER]: OtherMessage,
  [MessageFrom.SYSTEM]: SystemMessage,
}

const BaseMessage = ({ data }: Props) => {
  const MessageComponent = MessageComponentsMap[data.from]
  return <MessageComponent data={data} />
}

export default BaseMessage
