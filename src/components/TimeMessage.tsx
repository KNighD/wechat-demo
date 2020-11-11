import React from 'react'
import { IMessageDataFromSystem } from '../data'

interface Props {
  data: IMessageDataFromSystem
}

const TimeMessage = ({ data }: Props) => {
  return <div className="time-content">{data.content}</div>
}

export default TimeMessage
