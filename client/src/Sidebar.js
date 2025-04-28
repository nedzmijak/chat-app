import React, { useContext } from 'react';
import { ChatContext } from './ChatContext';

export default function Sidebar() {
  const { users, username, activeChat, setActiveChat, socket } = useContext(ChatContext);

  return (
    <aside className="sidebar">
      <h3>Aktivni</h3>
      <ul>
        <li
          className={activeChat.type === 'global' ? 'active-user' : ''}
          onClick={() => {
            setActiveChat({ type: 'global', user: null });
          }}
        >
          🌍 Globalni chat
        </li>
        {users.filter(u => u.name !== username).map(u => (
          <li
            key={u.id}
            className={activeChat.user === u.name ? 'active-user' : ''}
            onClick={() => {
              setActiveChat({ type: 'private', user: u.name });
              socket.emit('start_private', { to: u.name });
            }}
          >
            💬 {u.name}
          </li>
        ))}
      </ul>
    </aside>
  );
}