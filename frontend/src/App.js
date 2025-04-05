import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExpenseForm from './components/ExpenseForm';
import ExpenseEditModal from './components/ExpenseEditModal';
import ExpenseChart from './components/ExpenseChart'; // Import do gráfico
// Importações do Material-UI
import { Container, Typography, Box, Card, CardHeader, CardContent, TextField, Button, List, ListItem, ListItemText, IconButton, Divider } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Logout as LogoutIcon } from '@mui/icons-material';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [reload, setReload] = useState(false); // Controle de atualizações automáticas
  const [income, setIncome] = useState(0); // Define a renda mensal inicial
  const [balance, setBalance] = useState(0); // Calcula o saldo atual

  const [showEditModal, setShowEditModal] = useState(false); // Controla o modal de edição
  const [expenseToEdit, setExpenseToEdit] = useState(null); // Despesa que será editada

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/despesas`);
        setExpenses(response.data);
      } catch (error) {
        console.error('Erro ao buscar despesas:', error);
      }
    };

    fetchExpenses();
  }, [reload]);

  useEffect(() => {
    // Atualiza o saldo automaticamente sempre que despesas ou renda mudarem
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.valor, 0);
    setBalance(income - totalExpenses); // Saldo = renda - despesas
  }, [expenses, income]);

  const handleReload = () => {
    setReload(!reload);
  };

  const deleteExpense = async (id) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir esta despesa?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/despesas/${id}`);
      handleReload(); // Atualiza a lista após exclusão
    } catch (error) {
      console.error('Erro ao excluir despesa:', error);
    }
  };

  const openEditModal = (expense) => {
    setExpenseToEdit(expense);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setExpenseToEdit(null);
    setShowEditModal(false);
  };

  const updateExpense = async (updatedExpense) => {
    // Função para atualizar despesa no backend
    try {
      console.log('Atualizando despesa:', updatedExpense); // Para depuração
      await axios.put(`${process.env.REACT_APP_API_URL}/despesas/${expenseToEdit.id}`, updatedExpense); // Envia os dados atualizados para o backend
      handleReload(); // Atualiza a lista de despesas
      closeEditModal(); // Fecha o modal
    } catch (error) {
      console.error('Erro ao atualizar despesa:', error); // Log de erro
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated'); // Remove a autenticação do usuário
    window.location.href = '/login'; // Redireciona para a página de login
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {/* Barra Superior com Logout */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          🎉 Gerenciador de Despesas 🎉
        </Typography>
        {/* Botão de Logout */}
        <Button
          variant="contained"
          color="secondary"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
        >
          Sair
        </Button>
      </Box>

      {/* Renda Mensal e Saldo */}
      <Card sx={{ mb: 4 }}>
        <CardHeader title="Resumo Financeiro" style={{ backgroundColor: '#1976D2', color: 'white' }} />
        <CardContent>
          <Box mb={2}>
            <TextField
              label="Minha Renda Mensal"
              type="number"
              variant="outlined"
              fullWidth
              value={income}
              onChange={(e) => setIncome(parseFloat(e.target.value) || 0)}
              placeholder="Exemplo: 5000"
            />
          </Box>
          <Typography variant="h6">Total de Despesas: R$ {expenses.reduce((sum, expense) => sum + expense.valor, 0).toFixed(2)}</Typography>
          <Typography variant="h6">Saldo Atual: R$ {balance.toFixed(2)}</Typography>
        </CardContent>
      </Card>

      {/* Gráfico de Despesas */}
      <Card sx={{ mb: 4 }}>
        <CardHeader title="Despesas por Categoria" style={{ backgroundColor: '#FFBB28', color: 'black' }} />
        <CardContent>
          <ExpenseChart expenses={expenses} />
        </CardContent>
      </Card>

      {/* Formulário para Adicionar Despesas */}
      <Card sx={{ mb: 4 }}>
        <CardHeader title="Adicionar Despesa" style={{ backgroundColor: '#4CAF50', color: 'white' }} />
        <CardContent>
          <ExpenseForm onAdd={handleReload} />
        </CardContent>
      </Card>

      {/* Lista de Despesas */}
      <Card>
        <CardHeader title="Lista de Despesas" style={{ backgroundColor: '#9E9E9E', color: 'white' }} />
        <CardContent>
          {expenses.length > 0 ? (
            <List>
              {expenses.map((expense) => (
                <React.Fragment key={expense.id}>
                  <ListItem
                    secondaryAction={
                      <Box>
                        <IconButton
                          edge="end"
                          aria-label="edit"
                          onClick={() => openEditModal(expense)}
                          sx={{ color: '#FFC107' }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => deleteExpense(expense.id)}
                          sx={{ color: '#F44336' }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemText
                      primary={`${expense.descricao} - R$ ${expense.valor.toFixed(2)}`}
                      secondary={`Data: ${new Date(expense.data).toLocaleDateString()}`}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          ) : (
            <Typography variant="body1" color="text.secondary">Nenhuma despesa encontrada.</Typography>
          )}
        </CardContent>
      </Card>

      {/* Modal para Editar Despesa */}
      <ExpenseEditModal
        show={showEditModal}
        onClose={closeEditModal}
        expenseToEdit={expenseToEdit}
        onEdit={updateExpense} // Passa a função correta para o modal
      />
    </Container>
  );
};

export default App;
