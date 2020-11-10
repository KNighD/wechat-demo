import React from 'react';
import MessageList from './components/MessageList'
import InputBox from './components/InputBox'
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">仿微信信息流</header>
      <MessageList />
      <InputBox />
    </div>
  );
}

export default App;
