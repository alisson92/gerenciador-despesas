// backend/src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_segura';

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Token mal formatado.' });
  }

  const token = parts[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Opcional: consulta o usuário no banco
    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(401).json({ message: 'Usuário não encontrado.' });

    req.user = user; // Disponibiliza o usuário para os próximos middlewares/controllers
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
};
