const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const auth = require('../middlewares/authMiddleware');

router.get('/relatorio', auth, reportController.getFilteredReport);
router.get('/relatorio/agrupado', auth, reportController.getAggregatedReport);
router.get('/relatorio/exportar/excel', auth, reportController.exportToExcel);
router.get('/relatorio/exportar/pdf', auth, reportController.exportToPDF);
router.get('/relatorio/detalhe', auth, reportController.getDetalhe);

module.exports = router;
