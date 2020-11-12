import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { IUnioMessageData, IIntersectionMessageData } from '../data'
import { MessageFrom } from '../constants'
import MyMessage from './MyMessage'
import OtherMessage from './OtherMessage'
import SystemMessage from './SystemMessage'

interface Props {
  messageList: IUnioMessageData[]
  total: number
  loadMore: () => void
}

const MessageComponentsMap = {
  [MessageFrom.ME]: MyMessage,
  [MessageFrom.OTHER]: OtherMessage,
  [MessageFrom.SYSTEM]: SystemMessage,
}

const MessageList = ({ messageList, loadMore, total }: Props) => {
  return (
    <div className="message-list-container">
      <InfiniteScroll
        pageStart={0}
        hasMore={messageList.length < total || messageList.length === 0}
        useWindow={false}
        loadMore={loadMore}
        loader={
          <div className="loader" key={0}>
            Loading...
          </div>
        }
        threshold={20}
        isReverse
      >
        {messageList.map((message) => {
          const MessageComponent = MessageComponentsMap[message.from]
          return (
            <MessageComponent
              key={message.id}
              data={message as IIntersectionMessageData}
            />
          )
        })}
      </InfiniteScroll>
    </div>
  )
}

export default MessageList
