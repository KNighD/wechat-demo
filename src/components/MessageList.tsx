import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { IMessageData } from '../data'

interface Props {
  messageList: IMessageData[]
  total: number
  loadMore: () => void
  loading: boolean
}

const MessageList = ({ messageList, loadMore, total, loading }: Props) => {
  return (
    <div className="message-list-container">
      <InfiniteScroll
        pageStart={0}
        hasMore={messageList.length < total || messageList.length === 0}
        useWindow={false}
        loadMore={loadMore}
        loader={
          loading ? (
            <div className="loader" key={0}>
              Loading...
            </div>
          ) : <div />
        }
        threshold={20}
        isReverse
      >
        {messageList.map((v, i) => (
          <div style={{ margin: 12 }} key={v}>
            {v}
          </div>
        ))}
      </InfiniteScroll>
    </div>
  )
}

export default MessageList
