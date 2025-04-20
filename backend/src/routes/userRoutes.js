const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { User } = require('../models');
const authMiddleware = require('../middlewares/authMiddleware'); // ajuste o caminho conforme está seu projeto

router.post('/register', userController.register);
router.post('/login', userController.login);

// GET orçamento do usuário logado
router.get('/me/orcamento', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
    return res.json({ orcamento: user.orcamento });
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao buscar orçamento' });
  }
});

// PUT orçamento do usuário logado
router.put('/me/orcamento', authMiddleware, async (req, res) => {
  try {
    const { orcamento } = req.body;
    if (orcamento === undefined) return res.status(400).json({ message: 'Campo orçamento obrigatório' });

    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    user.orcamento = orcamento;
    await user.save();

    return res.json({ orcamento: user.orcamento, message: 'Orçamento atualizado com sucesso!' });
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao atualizar orçamento' });
  }
});

module.exports = router;
