// frontend/src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-primary p-3 text-white text-center">
      <h1>Gerenciador de Despesas</h1>
      <nav style={{ marginTop: 16 }}>
        <Link to="/dashboard" style={{ color: "#fff", margin: "0 12px", textDecoration: "underline" }}>Dashboard</Link>
        <Link to="/relatorios" style={{ color: "#fff", margin: "0 12px", textDecoration: "underline" }}>Relatórios</Link>
        <Link to="/login" style={{ color: "#fff", margin: "0 12px", textDecoration: "underline" }}>Login</Link>
      </nav>
    </header>
  );
};

export default Header;
