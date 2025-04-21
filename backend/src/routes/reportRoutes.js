// backend/src/routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const auth = require('../middlewares/authMiddleware');

// Lista detalhada de despesas filtradas
router.get('/relatorio', auth, reportController.getFilteredReport);

// Relatório agrupado por categoria ou mês
router.get('/relatorio/agrupado', auth, reportController.getAggregatedReport);

// Exportação para Excel
router.get('/relatorio/exportar/excel', auth, reportController.exportToExcel);

// Exportação para PDF
router.get('/relatorio/exportar/pdf', auth, reportController.exportToPDF);

module.exports = router;
