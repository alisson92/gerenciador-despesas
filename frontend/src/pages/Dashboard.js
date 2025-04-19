import React, { useEffect, useState } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseEditModal from '../components/ExpenseEditModal';
import ExpenseChart from '../components/ExpenseChart';
import { Container, Typography, Box, Card, CardHeader, CardContent, TextField, Button, List, ListItem, ListItemText, IconButton, Divider } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { apiGetDespesas } from '../api';
import axios from 'axios'; // Utilização ainda pode ser útil para update/delete
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [reload, setReload] = useState(false);
  const [income, setIncome] = useState(0);
  const [balance, setBalance] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    const fetchExpenses = async () => {
      try {
        // Atualize aqui para usar o token JWT!
        // Se já implementou apiGetDespesas(token), use-o!
        const response = await apiGetDespesas(token);
        setExpenses(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error('Erro ao buscar despesas:', error);
      }
    };

    fetchExpenses();
  }, [reload, token, navigate]);

  useEffect(() => {
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.valor, 0);
    setBalance(income - totalExpenses);
  }, [expenses, income]);

  const handleReload = () => setReload((r) => !r);

  // Ajuste para usar token no delete
  const deleteExpense = async (id) => {
    if (!token) return navigate('/login');
    const confirmDelete = window.confirm('Tem certeza que deseja excluir esta despesa?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/despesas/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      handleReload();
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

  // Atualize também para JWT na atualização!
  const updateExpense = async (updatedExpense) => {
    if (!token) return navigate('/login');
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/despesas/${expenseToEdit.id}`, updatedExpense, {
        headers: { Authorization: `Bearer ${token}` }
      });
      handleReload();
      closeEditModal();
    } catch (error) {
      console.error('Erro ao atualizar despesa:', error);
    }
  };

  // Use navegação do React Router para logout!
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          🎉 Gerenciador de Despesas 🎉
        </Typography>
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
        onEdit={updateExpense}
      />
    </Container>
  );
};

export default Dashboard;
