import React, { useState } from 'react';
import { apiCreateDespesa } from '../api';

// Lista de categorias padronizadas
const CATEGORIAS = [
  { slug: 'alimentacao', label: 'Alimentação' },
  { slug: 'transporte', label: 'Transporte' },
  { slug: 'lazer', label: 'Lazer' },
  { slug: 'saude', label: 'Saúde' },
  { slug: 'outros', label: 'Outros' }
];

const ExpenseForm = ({ onAdd }) => {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');
  const [categoria, setCategoria] = useState('alimentacao');
  const [erro, setErro] = useState('');

  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    if (!token) {
      setErro('Você precisa estar logado para adicionar despesas.');
      return;
    }

    const newExpense = { descricao, valor: parseFloat(valor), data, categoria };

    try {
      const resultado = await apiCreateDespesa(token, newExpense);
      if (resultado && resultado.id) {
        onAdd && onAdd();
        setDescricao('');
        setValor('');
        setData('');
        setCategoria('alimentacao'); // volta ao valor padrão
      } else {
        setErro(resultado.message || resultado.error || 'Erro ao adicionar despesa.');
      }
    } catch (error) {
      setErro('Erro ao adicionar despesa. Tente novamente.');
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
          placeholder="Digite o valor"
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
          {CATEGORIAS.map(cat => (
            <option key={cat.slug} value={cat.slug}>{cat.label}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        Adicionar Despesa
      </button>
      {erro && (
        <div className="alert alert-danger mt-2" role="alert">
          {erro}
        </div>
      )}
    </form>
  );
};

export default ExpenseForm;
