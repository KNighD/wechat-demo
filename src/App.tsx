import React, { useState, useCallback } from 'react'
import MessageList from './components/MessageList'
import InputBox from './components/InputBox'
import { IUnioMessageData } from './data'
import { getMessages } from './service'
import './App.css'

function App() {
  const [messageList, setMessageList] = useState<IUnioMessageData[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const loadMore = useCallback(async () => {
    if (loading) {
      return
    }
    setLoading(true)
    const messagesRes = await getMessages()
    setMessageList([...messagesRes.list, ...messageList])
    setTotal(messagesRes.total)
    setLoading(false)
  }, [loading, messageList])

  return (
    <div className="app">
      <header className="app-header">MessageList</header>
      <MessageList
        messageList={messageList}
        total={total}
        loadMore={loadMore}
      />
      <InputBox />
    </div>
  )
}

export default App
