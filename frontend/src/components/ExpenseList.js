import React from 'react';

// Exemplo de função auxiliar para deletar despesa na API
async function apiDeleteDespesa(token, id) {
  const res = await fetch(`http://localhost:3000/api/despesas/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // 204 = sucesso, resposta vazia
  if (res.status === 204) return true;
  const data = await res.json().catch(() => ({}));
  throw new Error(data.message || data.error || 'Erro ao excluir despesa');
}

const ExpenseList = ({ despesas, loading, refresh }) => {
  const token = localStorage.getItem('token');

  const deleteExpense = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta despesa?')) return;
    try {
      await apiDeleteDespesa(token, id);
      refresh && refresh();
    } catch (error) {
      alert(error.message || 'Erro ao excluir despesa.');
    }
  };

  if (loading) return <p>Carregando despesas...</p>;
  if (!despesas || despesas.length === 0) {
    return <p>Nenhuma despesa cadastrada.</p>;
  }

  return (
    <table className="table mt-4">
      <thead>
        <tr>
          <th>ID</th>
          <th>Descrição</th>
          <th>Valor</th>
          <th>Data</th>
          <th>Categoria</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {despesas.map((expense) => (
          <tr key={expense.id}>
            <td>{expense.id}</td>
            <td>{expense.descricao}</td>
            <td>{expense.valor}</td>
            <td>{new Date(expense.data).toLocaleDateString()}</td>
            <td>{expense.categoria}</td>
            <td>
              <button
                onClick={() => deleteExpense(expense.id)}
                className="btn btn-danger btn-sm"
              >
                Excluir
              </button>
              {/* Aqui pode adicionar botão de editar se implementar futuramente */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExpenseList;
