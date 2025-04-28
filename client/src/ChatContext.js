import React, { createContext, useState, useEffect } from 'react';
import io from 'socket.io-client';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [socket, setSocket]       = useState(null);
  const [username, setUsername]   = useState('');
  const [users, setUsers]         = useState([]);
  const [chat, setChat]           = useState([]);
  const [typingUser, setTypingUser] = useState(null);
  const [activeChat, setActiveChat] = useState({ type: 'global', user: null });

  // Connect to server
  useEffect(() => {
    const s = io('http://localhost:5000');
    setSocket(s);
    return () => s.disconnect();
  }, []);

  // Register events i load_history
  useEffect(() => {
    if (!socket) return;

    // Old messages from global chat
    socket.emit('load_history');
    socket.on('history', msgs => {
      setChat(msgs);
    });

    // Ostali events
    socket.on('your_username', setUsername);
    socket.on('user_list', setUsers);
    socket.on('receive_message', data =>
      setChat(prev => [...prev, data])
    );
    socket.on('user_typing', setTypingUser);

    // Notifications for private chat
    socket.on('user_joined_private', ({ from }) =>
      setChat(prev => [
        ...prev,
        { user: '🔒 Sistem', text: `${from} je započeo privatni razgovor.`, to: from }
      ])
    );

    return () => {
      socket.removeAllListeners();
    };
  }, [socket]);

  return (
    <ChatContext.Provider
      value={{
        socket,
        username,
        users,
        chat,
        typingUser,
        activeChat,
        setActiveChat,
        setChat
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
