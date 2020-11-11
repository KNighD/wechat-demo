import React from 'react'
import { ITextMessage } from '../data'

interface Props {
  data: ITextMessage
}

const TextMessage = ({ data }: Props) => {
  return <div>{data.content}</div>
}

export default TextMessage
