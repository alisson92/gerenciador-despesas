const express = require('express');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const { User } = require('../models');
const sendEmail = require('../utils/sendEmail');

const router = express.Router();

// Rota: POST /api/auth/forgot-password
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    const expires = new Date(Date.now() + 3600000); // 1 hora

    user.resetPasswordToken = token;
    user.resetPasswordExpires = expires;
    await user.save();

    const resetUrl = `http://localhost:3000/reset-password?token=${token}`;

    await sendEmail(
      user.email,
      'Recuperação de senha',
      `Olá, ${user.nome}!\n\nClique no link para redefinir sua senha:\n${resetUrl}\n\nEsse link é válido por 1 hora.`
    );

    res.status(200).json({ message: 'E-mail de recuperação enviado com sucesso!' });

  } catch (err) {
    console.error('Erro no forgot-password:', err);
    res.status(500).json({ message: 'Erro ao tentar recuperar a senha' });
  }
});

// Rota: POST /api/auth/reset-password
router.post('/reset-password', async (req, res) => {
  const { token, novaSenha } = req.body;

  try {
    const user = await User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: {
          [Op.gt]: new Date(), // Token ainda válido
        }
      }
    });

    if (!user) {
      return res.status(400).json({ message: 'Token inválido ou expirado' });
    }

    // Criptografa nova senha
    const hashedPassword = await bcrypt.hash(novaSenha, 10);

    // Atualiza a senha e limpa os campos de token
    user.senha = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    res.status(200).json({ message: 'Senha atualizada com sucesso!' });

  } catch (err) {
    console.error('Erro ao redefinir a senha:', err);
    res.status(500).json({ message: 'Erro ao redefinir a senha' });
  }
});

module.exports = router;

