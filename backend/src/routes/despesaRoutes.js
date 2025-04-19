const express = require('express');
const router = express.Router();
const despesaController = require('../controllers/despesaController');
const authMiddleware = require('../middlewares/authMiddleware'); // <<< Importa o middleware

/**
 * @swagger
 * tags:
 *   name: Despesas
 *   description: Gerenciamento de despesas
 */

// Todas as rotas abaixo exigem autenticação JWT
router.use(authMiddleware);

/**
 * @swagger
 * /api/despesas:
 *   get:
 *     summary: Lista todas as despesas
 *     tags: [Despesas]
 *     responses:
 *       200:
 *         description: Lista de despesas retornada com sucesso.
 */
router.get('/despesas', despesaController.getDespesas);

/**
 * @swagger
 * /api/despesas/{id}:
 *   get:
 *     summary: Busca uma despesa pelo ID
 *     tags: [Despesas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da despesa
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalhes da despesa retornados com sucesso.
 */
router.get('/despesas/:id', despesaController.getDespesaById);

/**
 * @swagger
 * /api/despesas:
 *   post:
 *     summary: Cria uma nova despesa
 *     tags: [Despesas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               valor:
 *                 type: number
 *               data:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Despesa criada com sucesso.
 */
router.post('/despesas', despesaController.createDespesa);

/**
 * @swagger
 * /api/despesas/{id}:
 *   put:
 *     summary: Atualiza uma despesa existente
 *     tags: [Despesas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da despesa
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               valor:
 *                 type: number
 *               data:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Despesa atualizada com sucesso.
 */
router.put('/despesas/:id', despesaController.updateDespesa);

/**
 * @swagger
 * /api/despesas/{id}:
 *   delete:
 *     summary: Remove uma despesa
 *     tags: [Despesas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da despesa
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Despesa removida com sucesso.
 */
router.delete('/despesas/:id', despesaController.deleteDespesa);

module.exports = router;
