import React, { useState, useContext } from 'react';
import { ChatContext } from './ChatContext';
import Sidebar from './Sidebar';
import ChatBox from './ChatBox';
import MessageInput from './MessageInput';
import './App.css';

function App() {
  const {
    socket, username, users, chat,
    typingUser, activeChat, setActiveChat
  } = useContext(ChatContext);

  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const sendMessage = () => {
    if (!socket || !message.trim()) return;
    const payload = {
      text: message,
      to: activeChat.type === 'private' ? activeChat.user : null
    };
    socket.emit('send_message', payload);
    socket.emit('stop_typing');
    setMessage('');
    setShowEmojiPicker(false);
  };

  return (
    <div className="app-container">
      <Sidebar
        users={users}
        username={username}
        activeChat={activeChat}
        onSelectChat={chat => {
          setActiveChat(chat);
          if (socket && chat.type === 'private') {
            socket.emit('start_private', { to: chat.user });
          }
        }}
      />

      <main className="chat-area">
        <header className="chat-header">
          <h2>
            {activeChat.type === 'global'
              ? '🌍 Globalni kanal'
              : `💬 Chat sa ${activeChat.user}`}
          </h2>
        </header>

        <ChatBox chat={chat} username={username} activeChat={activeChat} />

        {typingUser && typingUser !== username && (
          <div className="typing-indicator">
            {typingUser} piše...
          </div>
        )}

        <MessageInput
          message={message}
          onChange={setMessage}
          onSend={sendMessage}
          onShowEmoji={() => setShowEmojiPicker(p => !p)}
          showEmoji={showEmojiPicker}
        />
      </main>
    </div>
  );
}

export default App;
