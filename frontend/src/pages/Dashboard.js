import React, { useEffect, useState } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseEditModal from '../components/ExpenseEditModal';
import ExpenseChart from '../components/ExpenseChart';
import {
  Container, Typography, Box, Card, CardHeader, CardContent, TextField, Button, List, ListItem,
  ListItemText, IconButton, Divider, LinearProgress, Alert, InputAdornment
} from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon, Delete as DeleteIcon, Logout as LogoutIcon } from '@mui/icons-material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import DoneIcon from '@mui/icons-material/Done';
import ErrorIcon from '@mui/icons-material/Error';
import { apiGetDespesas } from '../api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [reload, setReload] = useState(false);
  const [orcamento, setOrcamento] = useState(0); // orçamento mensal do usuário
  const [orcamentoInput, setOrcamentoInput] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [balance, setBalance] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Busca despesas
  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    const fetchExpenses = async () => {
      try {
        const response = await apiGetDespesas(token);
        setExpenses(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error('Erro ao buscar despesas:', error);
      }
    };
    fetchExpenses();
  }, [reload, token, navigate]);

  // Busca orçamento do usuário ao carregar/dashboard ou reload
  useEffect(() => {
    if (token) {
      axios.get(`${process.env.REACT_APP_API_URL}/users/me/orcamento`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => setOrcamento(response.data.orcamento || 0))
        .catch(err => {
          setOrcamento(0);
          console.error('Erro ao buscar orçamento:', err);
        });
    }
  }, [token, reload]);

  useEffect(() => {
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.valor, 0);
    setBalance(orcamento - totalExpenses);
  }, [expenses, orcamento]);

  const handleReload = () => setReload((r) => !r);

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Handlers para orçamento com integração backend
  const handleEditBudget = () => {
    setOrcamentoInput(orcamento);
    setIsEditing(true);
    setSaveMsg('');
  };

  const handleSaveBudget = () => {
    setSaveMsg('Salvando...');
    axios.put(`${process.env.REACT_APP_API_URL}/users/me/orcamento`,
      { orcamento: orcamentoInput },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(response => {
        setOrcamento(response.data.orcamento);
        setIsEditing(false);
        setSaveMsg(response.data.message || 'Orçamento salvo com sucesso!');
      })
      .catch(err => {
        setIsEditing(false);
        setSaveMsg('Erro ao salvar orçamento!');
        console.error('Erro ao salvar orçamento:', err);
      });
  };

  // Cálculos para alerta/progresso
  const totalDespesas = expenses.reduce((sum, expense) => sum + expense.valor, 0);

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

      {/* Orçamento Mensal, Saldo e Alerta */}
      <Card
        sx={{
          mb: 4,
          boxShadow: orcamento > 0 && totalDespesas >= orcamento
            ? '0 0 16px 2px #d32f2f'
            : orcamento > 0 && totalDespesas >= orcamento * 0.8
            ? '0 0 12px 2px #ff9800'
            : '0 0 6px 1px #388e3c'
        }}
      >
        <CardHeader
          title={(
            <Box display="flex" alignItems="center">
              <AttachMoneyIcon sx={{ mr: 1, color: '#388e3c' }} />
              <Typography variant="h6" component="div" sx={{ flex: 1 }}>
                Orçamento Mensal
              </Typography>
              {!isEditing && (
                <IconButton onClick={handleEditBudget} aria-label="Editar orçamento">
                  <EditIcon />
                </IconButton>
              )}
              {isEditing && (
                <IconButton onClick={handleSaveBudget} aria-label="Salvar orçamento">
                  <SaveIcon />
                </IconButton>
              )}
            </Box>
          )}
          style={{ backgroundColor: '#1976D2', color: 'white' }}
        />
        <CardContent>
          <Box mb={2}>
            <TextField
              label="Orçamento Mensal"
              type="number"
              variant="outlined"
              value={isEditing ? orcamentoInput : orcamento}
              onChange={e => setOrcamentoInput(parseFloat(e.target.value) || 0)}
              InputProps={{
                startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                readOnly: !isEditing,
              }}
              disabled={!isEditing}
              sx={{ width: 200 }}
              helperText="Defina seu limite de gastos neste mês"
            />
          </Box>
          {saveMsg && (
            <Alert severity={saveMsg.startsWith('Erro') ? "error" : "success"} sx={{ mb: 2 }}>{saveMsg}</Alert>
          )}
          {orcamento > 0 && (
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              {totalDespesas < orcamento * 0.8 && <DoneIcon color="success" />}
              {totalDespesas >= orcamento * 0.8 && totalDespesas < orcamento && <WarningAmberIcon sx={{ color: '#ff9800' }} />}
              {totalDespesas >= orcamento && <ErrorIcon color="error" />}
              <Typography
                variant="body2"
                color={
                  totalDespesas < orcamento * 0.8 ? "#388e3c"
                    : totalDespesas < orcamento ? "#ff9800"
                    : "#d32f2f"
                }
                fontWeight="bold"
              >
                {
                  totalDespesas < orcamento * 0.8 ? 'Confortável'
                    : totalDespesas < orcamento ? 'No Limite'
                    : 'Estourado!'
                }
              </Typography>
            </Box>
          )}
          <Typography variant="h6">
            Total de Despesas: {totalDespesas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </Typography>
          <Typography variant="h6">
            Saldo Atual: {(orcamento - totalDespesas).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </Typography>
          <Box mt={2}>
            <LinearProgress
              variant="determinate"
              value={orcamento > 0 ? Math.min((totalDespesas / orcamento) * 100, 100) : 0}
              sx={{
                height: 12,
                borderRadius: 4,
                bgcolor: '#e0e0e0',
                '& .MuiLinearProgress-bar': {
                  bgcolor:
                    totalDespesas < orcamento * 0.8
                      ? '#388e3c'
                      : totalDespesas < orcamento
                        ? '#ff9800'
                        : '#d32f2f'
                }
              }}
            />
            <Typography sx={{ mt: 1, textAlign: 'right', fontWeight: 'bold' }}>
              {orcamento > 0
                ? `${Math.min((totalDespesas / orcamento) * 100, 100).toFixed(1).replace('.', ',')}% usado`
                : "Defina seu orçamento"}
            </Typography>
          </Box>
          {/* Alertas de aproximação/estouro de orçamento */}
          {orcamento > 0 && totalDespesas >= orcamento * 0.8 && totalDespesas < orcamento && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              Atenção: você está atingindo seu limite de orçamento!
            </Alert>
          )}
          {orcamento > 0 && totalDespesas >= orcamento && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Orçamento ultrapassado! Reveja seus gastos.
            </Alert>
          )}
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
                      primary={`${expense.descricao} - ${expense.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}
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
