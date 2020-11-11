import React from 'react'
import { IMessageDataFromUser } from '../data'

interface Props {
  data: IMessageDataFromUser
}

const UnknownMessage = ({ data }: Props) => {
  return <div>{data.content}</div>
}

export default UnknownMessage
