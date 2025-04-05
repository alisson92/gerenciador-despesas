const express = require('express');
const cors = require('cors');
const despesaRoutes = require('./src/routes/despesaRoutes'); // Importa o arquivo de rotas

const app = express();
const PORT = 3000;

// Configuração de middlewares
app.use(cors());
app.use(express.json()); // Permite o processamento de JSON no corpo das requisições

// Configuração de rotas
app.use('/api', despesaRoutes);

// Inicializador do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
