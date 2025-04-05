import React, { useState } from 'react';
import axios from 'axios';

const ExpenseForm = ({ onAdd }) => {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');
  const [categoria, setCategoria] = useState('Alimentação'); // Nova categoria com valor padrão

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newExpense = { descricao, valor: parseFloat(valor), data, categoria };

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/despesas`, newExpense);
      onAdd(); // Notifica o componente pai para atualizar a lista
      setDescricao('');
      setValor('');
      setData('');
      setCategoria('Alimentação'); // Reseta a categoria para o valor padrão
    } catch (error) {
      console.error('Erro ao adicionar despesa:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="form-group mb-3">
        <label>Descrição</label>
        <input
          type="text"
          className="form-control"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label>Valor</label>
        <input
          type="number"
          className="form-control"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label>Data</label>
        <input
          type="date"
          className="form-control"
          value={data}
          onChange={(e) => setData(e.target.value)}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label>Categoria</label>
        <select
          className="form-control"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Transporte">Transporte</option>
          <option value="Lazer">Lazer</option>
          <option value="Saúde">Saúde</option>
          <option value="Outros">Outros</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        Adicionar Despesa
      </button>
    </form>
  );
};

export default ExpenseForm;
