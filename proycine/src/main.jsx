// main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client'; // Importa createRoot desde react-dom/client
import './index.css';
import AppRouter from './router/AppRouter';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
