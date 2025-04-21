// backend/src/controllers/reportController.js
const { Op, fn, col } = require('sequelize');
const { Despesa } = require('../models');
const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit');

// Função utilitária para checagem segura dos filtros de valor
function isValorFiltroValido(valorMin, valorMax) {
  return (
    valorMin !== undefined && valorMax !== undefined &&
    valorMin !== "" && valorMax !== "" &&
    !isNaN(parseFloat(valorMin)) && !isNaN(parseFloat(valorMax))
  );
}

// Lista detalhada de despesas filtradas
exports.getFilteredReport = async (req, res) => {
  const userId = req.user.id;
  const { dataInicial, dataFinal, categoria, valorMin, valorMax } = req.query;

  let filters = { userId };

  if (dataInicial && dataFinal) {
    filters.data = { [Op.between]: [dataInicial, dataFinal] };
  }
  if (categoria) {
    filters.categoria = categoria;
  }
  if (isValorFiltroValido(valorMin, valorMax)) {
    filters.valor = { [Op.between]: [parseFloat(valorMin), parseFloat(valorMax)] };
  }

  try {
    const despesas = await Despesa.findAll({ where: filters });
    res.status(200).json(despesas);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao gerar relatório.', error: err.message });
  }
};

// Relatório agrupado por categoria ou por mês
exports.getAggregatedReport = async (req, res) => {
  const userId = req.user.id;
  const { dataInicial, dataFinal, categoria, valorMin, valorMax, agrupar } = req.query;

  let filters = { userId };

  if (dataInicial && dataFinal) {
    filters.data = { [Op.between]: [dataInicial, dataFinal] };
  }
  if (categoria) {
    filters.categoria = categoria;
  }
  if (isValorFiltroValido(valorMin, valorMax)) {
    filters.valor = { [Op.between]: [parseFloat(valorMin), parseFloat(valorMax)] };
  }

  let attributes, group;

  if (agrupar === 'categoria') {
    attributes = ['categoria', [fn('SUM', col('valor')), 'total']];
    group = ['categoria'];
  } else if (agrupar === 'mes') {
    // Para PostgreSQL: use DATE_TRUNC para agrupar por mês!
    attributes = [
      [fn('DATE_TRUNC', 'month', col('data')), 'mes'],
      [fn('SUM', col('valor')), 'total']
    ];
    group = [[fn('DATE_TRUNC', 'month', col('data'))]];
  } else {
    return res.status(400).json({ message: 'Parâmetro de agrupamento inválido.' });
  }

  try {
    const dadosAgrupados = await Despesa.findAll({
      where: filters,
      attributes: attributes,
      group: group,
      raw: true,
      order: agrupar === 'mes' ? [[fn('DATE_TRUNC', 'month', col('data')), 'ASC']] : undefined,
    });
    res.status(200).json(dadosAgrupados);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao gerar relatório agrupado.', error: err.message });
  }
};

// Exportação para Excel
exports.exportToExcel = async (req, res) => {
  const userId = req.user.id;
  const { dataInicial, dataFinal, categoria, valorMin, valorMax } = req.query;
  let filters = { userId };

  if (dataInicial && dataFinal) {
    filters.data = { [Op.between]: [dataInicial, dataFinal] };
  }
  if (categoria) {
    filters.categoria = categoria;
  }
  if (isValorFiltroValido(valorMin, valorMax)) {
    filters.valor = { [Op.between]: [parseFloat(valorMin), parseFloat(valorMax)] };
  }

  try {
    const despesas = await Despesa.findAll({ where: filters, raw: true });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Relatório de Despesas');

    worksheet.columns = [
      { header: 'Descrição', key: 'descricao', width: 30 },
      { header: 'Valor', key: 'valor', width: 15 },
      { header: 'Data', key: 'data', width: 18 },
      { header: 'Categoria', key: 'categoria', width: 18 },
    ];
    despesas.forEach(despesa => worksheet.addRow(despesa));

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="relatorio_despesas.xlsx"'
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    res.status(500).json({ message: "Erro ao exportar Excel.", error: err.message });
  }
};

// Exportação para PDF
exports.exportToPDF = async (req, res) => {
  const userId = req.user.id;
  const { dataInicial, dataFinal, categoria, valorMin, valorMax } = req.query;
  let filters = { userId };

  if (dataInicial && dataFinal) {
    filters.data = { [Op.between]: [dataInicial, dataFinal] };
  }
  if (categoria) {
    filters.categoria = categoria;
  }
  if (isValorFiltroValido(valorMin, valorMax)) {
    filters.valor = { [Op.between]: [parseFloat(valorMin), parseFloat(valorMax)] };
  }

  try {
    const despesas = await Despesa.findAll({ where: filters, raw: true });

    const doc = new PDFDocument({ margin: 30, size: 'A4' });

    // Configura os headers da resposta
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="relatorio_despesas.pdf"');

    doc.pipe(res);

    // Título
    doc.fontSize(18).text('Relatório de Despesas', { align: 'center' }).moveDown();

    // Cabeçalho da tabela
    doc.fontSize(12)
      .text('Descrição', 30, doc.y, { width: 200 })
      .text('Valor', 240, doc.y, { width: 65 })
      .text('Data', 305, doc.y, { width: 85 })
      .text('Categoria', 390, doc.y, { width: 100 });
    doc.moveDown(0.5);
    // Linha separadora
    doc.moveTo(30, doc.y).lineTo(550, doc.y).stroke();

    // Conteúdo
    despesas.forEach(d => {
      doc.text(d.descricao, 30, doc.y, { width: 200 })
        .text(d.valor.toFixed(2), 240, doc.y, { width: 65 })
        .text(new Date(d.data).toLocaleDateString(), 305, doc.y, { width: 85 })
        .text(d.categoria, 390, doc.y, { width: 100 });
      doc.moveDown(0.5);
    });

    doc.end();

  } catch (err) {
    res.status(500).json({ message: "Erro ao exportar PDF.", error: err.message });
  }
};
