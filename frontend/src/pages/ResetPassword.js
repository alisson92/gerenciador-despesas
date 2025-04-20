import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Card, CardContent, Alert } from '@mui/material';

export default function ResetPassword() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');

  const [novaSenha, setNovaSenha] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await axios.post('http://localhost:3000/api/auth/reset-password', { token, novaSenha });
      setMessage('Senha redefinida com sucesso! Faça login novamente.');
    } catch (error) {
      setMessage('Não foi possível redefinir a senha. O link pode estar expirado ou inválido.');
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Card sx={{ width: 400 }}>
        <CardContent>
          <Typography variant="h5" textAlign="center" gutterBottom>
            Redefinir senha
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nova senha"
              type="password"
              fullWidth
              margin="normal"
              value={novaSenha}
              onChange={e => setNovaSenha(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Redefinir
            </Button>
          </form>
          {message && <Alert sx={{ mt: 2 }} severity={message.toLowerCase().includes('sucesso') ? "success" : "error"}>
            {message}
          </Alert>}
          {/* Botão para voltar ao login após sucesso */}
          {message && message.toLowerCase().includes('sucesso') && (
            <Button
              variant="text"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => navigate('/login')}
            >
              Ir para tela de login
            </Button>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
