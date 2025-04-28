import React, { useRef, useContext } from 'react';
import { ChatContext } from './ChatContext';
import EmojiPicker from 'emoji-picker-react';

export default function MessageInput({ message, onChange, onSend, onShowEmoji, showEmoji }) {
  const typingTimeoutRef = useRef(null);
  const { socket } = useContext(ChatContext);

  const handleTyping = (e) => {
    onChange(e.target.value);
    if (socket) {
      socket.emit('user_typing');
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => socket.emit('stop_typing'), 1000);
    }
  };

  const handleEmojiClick = (emojiData, _event) => {
    onChange(prev => prev + emojiData.emoji);
  };

  return (
    <div className="input-area">
      <button onClick={onShowEmoji}>😊</button>
      {showEmoji && (
        <div className="emoji-picker-wrapper">
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            height={350}
            width="100%"
            lazyLoadEmojis
          />
        </div>
      )}
      <input
        type="text"
        value={message}
        placeholder="Napiši poruku..."
        onChange={handleTyping}
        onKeyDown={e => e.key === 'Enter' && onSend()}
      />
      <button onClick={onSend}>➤</button>
    </div>
  );
}
