import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ChatProvider } from './ChatContext';
import './App.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ChatProvider>
      <App />
    </ChatProvider>
  </React.StrictMode>
);
