// backend/src/controllers/userController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_segura';

exports.register = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ message: 'Nome, e-mail e senha são obrigatórios.' });
    }

    const userExists = await User.findOne({ where: { email } });
    if (userExists) return res.status(400).json({ message: 'Usuário já cadastrado.' });

    const hash = await bcrypt.hash(senha, 10);
    const user = await User.create({ nome, email, senha: hash });

    res.status(201).json({
      message: 'Usuário criado com sucesso!',
      user: { id: user.id, nome: user.nome, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar o usuário.', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Usuário não encontrado.' });

    const match = await bcrypt.compare(senha, user.senha);
    if (!match) return res.status(401).json({ message: 'Senha incorreta.' });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: { id: user.id, nome: user.nome, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro no login.', error: error.message });
  }
};
