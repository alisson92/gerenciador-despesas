import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Typography, TextField, Button, Card, CardContent, Alert } from '@mui/material';
import { apiRegister } from '../api';

const Register = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [feedback, setFeedback] = useState('');
  const [sucesso, setSucesso] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setFeedback('');
    setSucesso(false);
    const result = await apiRegister({ nome, email, senha });

    if (result.message && result.message.startsWith("Usuário")) {
      setFeedback(result.message);
      setSucesso(true);
      setTimeout(() => navigate("/login"), 1500); // Redireciona após sucesso
    } else {
      setFeedback(result.message || result.error || "Erro ao cadastrar.");
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
            Cadastro
          </Typography>
          <form onSubmit={handleRegister}>
            <TextField
              label="Nome"
              type="text"
              fullWidth
              margin="normal"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Cadastrar
            </Button>
            {/* Botão para voltar ao login */}
            <Button
              variant="text"
              color="primary"
              fullWidth
              sx={{ mt: 1 }}
              onClick={() => navigate('/login')}
            >
              Voltar para login
            </Button>
            {feedback && (
              <Alert severity={sucesso ? "success" : "error"} sx={{ mt: 2 }}>
                {feedback}
              </Alert>
            )}
            <Box mt={2} textAlign="center">
              <Typography variant="body2">
                Já tem conta? <Link to="/login">Entrar</Link>
              </Typography>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;
