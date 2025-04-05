import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Modal, MenuItem } from '@mui/material';

const ExpenseEditModal = ({ show, onClose, expenseToEdit, onEdit }) => {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');
  const [categoria, setCategoria] = useState(''); // Categoria editável

  // Preencher os valores do formulário ao abrir o modal
  useEffect(() => {
    if (expenseToEdit) {
      setDescricao(expenseToEdit.descricao || '');
      setValor(expenseToEdit.valor || '');
      setData(expenseToEdit.data || '');
      setCategoria(expenseToEdit.categoria || 'Outros'); // Garante um valor padrão para categoria
    }
  }, [expenseToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedExpense = {
      descricao,
      valor: parseFloat(valor),
      data,
      categoria,
    };

    console.log('Enviando edição: ', updatedExpense); // Log para depuração

    try {
      await onEdit(updatedExpense); // Envia as informações atualizadas para o App.js
      onClose(); // Fecha o modal após confirmar
    } catch (error) {
      console.error('Erro ao editar despesa:', error);
    }
  };

  if (!show) return null;

  return (
    <Modal open={show} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            label="Descrição"
            type="text"
            fullWidth
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            label="Valor"
            type="number"
            fullWidth
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            label="Data"
            type="date"
            fullWidth
            value={data}
            onChange={(e) => setData(e.target.value)}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          {/* Campo Categoria */}
          <TextField
            label="Categoria"
            select
            fullWidth
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            margin="normal"
            required
          >
            <MenuItem value="Alimentação">Alimentação</MenuItem>
            <MenuItem value="Transporte">Transporte</MenuItem>
            <MenuItem value="Lazer">Lazer</MenuItem>
            <MenuItem value="Saúde">Saúde</MenuItem>
            <MenuItem value="Outros">Outros</MenuItem>
          </TextField>
          <Box mt={2} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button onClick={onClose} color="secondary" variant="outlined">
              Cancelar
            </Button>
            <Button type="submit" color="primary" variant="contained">
              Salvar Alterações
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default ExpenseEditModal;
