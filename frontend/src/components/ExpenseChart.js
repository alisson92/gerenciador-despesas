import React from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const ExpenseChart = ({ expenses }) => {
  // Processa os dados para gerar categorias
  const dataByCategory = expenses.reduce((acc, expense) => {
    const category = expense.categoria || 'Outros'; // Usa "Outros" se a categoria estiver vazia
    const index = acc.findIndex((item) => item.name === category);

    if (index !== -1) {
      acc[index].value += expense.valor; // Soma valores na mesma categoria
    } else {
      acc.push({ name: category, value: expense.valor }); // Adiciona nova categoria
    }

    return acc;
  }, []);

  // Define cores para o gráfico
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A020F0', '#FF0000'];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={dataByCategory}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label // Adiciona labels para cada fatia
        >
          {dataByCategory.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ExpenseChart;
