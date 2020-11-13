import React from 'react'
import { IMessageDataFromSystem } from '../../data'

interface Props {
  data: IMessageDataFromSystem
}

const WithdrawMessage = ({ data }: Props) => {
  return <div className="withraw-content">{data.content}</div>
}

export default WithdrawMessage
