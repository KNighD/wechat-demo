import React from 'react'
import { Waypoint } from 'react-waypoint'
import { IUnioMessageData, IIntersectionMessageData } from '../data'
import BaseMessage from './BaseMessage'

interface Props {
  messageList: IUnioMessageData[]
  total: number
  loadMore: () => void
}

const MessageList = ({ messageList, loadMore, total }: Props) => {
  const hasMore = messageList.length < total || messageList.length === 0
  const onReachTop = () => {
    if (hasMore) {
      loadMore()
    }
  }

  return (
    <div className="message-list-container">
      {messageList.map((message) => {
        return (
          <div key={message.id}>
            <BaseMessage data={message as IIntersectionMessageData} />
          </div>
        )
      })}
      <Waypoint onEnter={onReachTop}>
        <div className="loader" key={0}>
          {hasMore ? 'Loading...' : '没有更多了'}
        </div>
      </Waypoint>
    </div>
  )
}

export default MessageList
