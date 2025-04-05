import React, { useState } from 'react';
import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';

const Dashboard = () => {
  const [reload, setReload] = useState(false);

  const refreshExpenses = () => setReload(!reload);

  return (
    <div className="container">
      {/* Cabeçalho */}
      <Header />

      {/* Formulário para adicionar despesas */}
      <ExpenseForm onAdd={refreshExpenses} />

      {/* Lista de despesas */}
      <ExpenseList key={reload} />
    </div>
  );
};

export default Dashboard;
