import React, { useState } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, Button, Card, CardContent, Alert, Link as MuiLink } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [resetUrl, setResetUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setResetUrl('');
    try {
      const res = await axios.post('http://localhost:3000/api/auth/forgot-password', { email });
      setMessage(res.data.message || 'Se o e-mail estiver cadastrado, você receberá instruções para redefinir sua senha.');

      if (res.data.resetUrl) {
        setResetUrl(res.data.resetUrl);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setMessage('E-mail não encontrado. Por favor, tente novamente.');
      } else {
        setMessage('Erro ao solicitar redefinição de senha.');
      }
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
            Esqueci minha senha
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="E-mail"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Enviar
            </Button>
          </form>
          {message && (
            <Alert sx={{ mt: 2 }} severity={
              message.toLowerCase().includes('sucesso') ? "success"
                : message.toLowerCase().includes('não encontrado') ? "warning"
                : "error"
            }>
              {message}
            </Alert>
          )}
          {/* Botão para voltar ao login se o e-mail não for encontrado */}
          {message && message.toLowerCase().includes('não encontrado') && (
            <Button
              variant="text"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => navigate('/login')}
            >
              Voltar para login
            </Button>
          )}
          {resetUrl && (
            <Box mt={2}>
              <Typography variant="body2" fontWeight="bold">
                Link gerado para redefinir a senha (apenas testes):
              </Typography>
              <MuiLink href={resetUrl} target="_blank" rel="noopener">
                {resetUrl}
              </MuiLink>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
