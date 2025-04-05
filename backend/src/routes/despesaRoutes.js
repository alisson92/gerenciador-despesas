const express = require('express');
const router = express.Router();
const despesaController = require('../controllers/despesaController');

// Rotas para despesas
router.get('/despesas', despesaController.getDespesas);
router.get('/despesas/:id', despesaController.getDespesaById);
router.post('/despesas', despesaController.createDespesa);
router.put('/despesas/:id', despesaController.updateDespesa);
router.delete('/despesas/:id', despesaController.deleteDespesa);

module.exports = router;
