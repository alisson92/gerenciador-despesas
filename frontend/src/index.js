import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa a nova API de renderização
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import App from './App';
import Login from './pages/Login';

// Componente para rotas privadas
const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated'); // Verifica autenticação
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Renderiza o aplicativo usando a nova API do ReactDOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Página de login */}
        <Route path="/login" element={<Login />} />

        {/* Rota protegida (acessível somente após login) */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <App />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  </React.StrictMode>
);
