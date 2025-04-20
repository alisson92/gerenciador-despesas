import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Typography, TextField, Button, Card, CardContent, Alert } from '@mui/material';
import { apiLogin } from '../api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');

    const result = await apiLogin({ email, senha });

    if (result.token) {
      localStorage.setItem('token', result.token);
      // Você pode salvar também o usuário, se quiser
      // localStorage.setItem('user', JSON.stringify(result.user));
      navigate('/dashboard'); // Redirecionar para a dashboard
    } else {
      setErro(result.message || 'Falha no login.');
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
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <Box mt={1} textAlign="right">
              <Link to="/forgot-password" style={{ textDecoration: 'none', color: '#1976d2' }}>
                Esqueci minha senha?
              </Link>
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Entrar
            </Button>
            {erro && <Alert severity="error" sx={{ mt: 2 }}>{erro}</Alert>}
            <Box mt={2} textAlign="center">
              <Typography variant="body2">
                Não tem conta? <Link to="/register">Cadastre-se</Link>
              </Typography>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
