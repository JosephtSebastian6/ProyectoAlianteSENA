// Importaciones necesarias
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Importa el enrutador de React
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App.jsx';

// Renderiza la aplicación en el contenedor raíz
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Envolvemos toda la app con BrowserRouter para habilitar rutas */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
