// backend/app.js
require('dotenv').config(); // Carrega as variáveis do .env

const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/docs/swaggerConfig');

const despesaRoutes = require('./src/routes/despesaRoutes');
const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/auth'); // Importando as rotas de autenticação

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rota da documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas de autenticação - PREFIXO /api/auth
app.use('/api/auth', authRoutes);

// Rotas do usuário - PREFIXO /api/users
app.use('/api/users', userRoutes);

// Rotas de despesas - PREFIXO /api
app.use('/api', despesaRoutes);

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Documentação Swagger disponível em http://localhost:${PORT}/api-docs`);
});
