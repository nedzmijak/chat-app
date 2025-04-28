import React, { useRef, useEffect, useContext } from 'react';
import { ChatContext } from './ChatContext';

export default function ChatBox() {
  const { chat, username, activeChat } = useContext(ChatContext);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [chat]);

  const shouldShowMessage = (msg) => {
    if (msg.user === '📢 Sistem') {
      return activeChat.type === 'global'
        ? msg.to === null
        : msg.to === activeChat.user || msg.to === username;
    }
    if (activeChat.type === 'global') return msg.to === null;
    return (
      (msg.user === username && msg.to === activeChat.user) ||
      (msg.user === activeChat.user && msg.to === username)
    );
  };

  return (
    <div className="chat-box" ref={chatRef}>
      {chat.filter(shouldShowMessage).map((msg, i) => (
        <div key={i} className={`message ${msg.user === '📢 Sistem' ? 'system' : ''}`}>
          <span className="user">{msg.user}</span>
          <p>{msg.text}</p>
          {msg.timestamp && (
            <div className="timestamp">
              🕒 {new Date(msg.timestamp).toLocaleString('bs-BA', {
                day: '2-digit', month: '2-digit', year: 'numeric',
                hour: '2-digit', minute: '2-digit'
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
