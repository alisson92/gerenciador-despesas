import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/despesas`);
      setExpenses(response.data);
    } catch (error) {
      console.error('Erro ao buscar despesas:', error);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/despesas/${id}`);
      fetchExpenses(); // Recarrega a lista após excluir
    } catch (error) {
      console.error('Erro ao excluir despesa:', error);
    }
  };

  return (
    <table className="table mt-4">
      <thead>
        <tr>
          <th>ID</th>
          <th>Descrição</th>
          <th>Valor</th>
          <th>Data</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <tr key={expense.id}>
            <td>{expense.id}</td>
            <td>{expense.descricao}</td>
            <td>{expense.valor}</td>
            <td>{new Date(expense.data).toLocaleDateString()}</td>
            <td>
              <button
                onClick={() => deleteExpense(expense.id)}
                className="btn btn-danger btn-sm"
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExpenseList;
