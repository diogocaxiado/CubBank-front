import React from 'react';
import ReactDOM from 'react-dom/client';
import Rotas from './rotas';

import { BrowserRouter } from 'react-router-dom';
import { UsuarioProvedor } from './contexto/usuario';

import './global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UsuarioProvedor>
        <Rotas />
      </UsuarioProvedor>
    </BrowserRouter>
  </React.StrictMode>
)
