import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Card, CardContent } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulação de autenticação (credenciais fixas)
    if (email === 'admin@example.com' && password === '123456') {
      localStorage.setItem('isAuthenticated', 'true'); // Salva o estado de login
      navigate('/'); // Redireciona para a página principal
    } else {
      alert('Credenciais inválidas! Tente email: admin@example.com e senha: 123456');
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
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="E-mail"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Senha"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
