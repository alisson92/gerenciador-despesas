const { Op, fn, col } = require('sequelize');
const { Despesa } = require('../models');
const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit');

exports.getFilteredReport = async (req, res) => {
  const userId = req.user.id;
  const { dataInicial, dataFinal, categoria } = req.query;
  let filters = { userId };
  if (dataInicial && dataFinal) {
    filters.data = { [Op.between]: [dataInicial, dataFinal] };
  }
  if (categoria) {
    filters.categoria = categoria;
  }
  try {
    const despesas = await Despesa.findAll({ where: filters });
    res.status(200).json(despesas);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao gerar relatório.', error: err.message });
  }
};

exports.getAggregatedReport = async (req, res) => {
  const userId = req.user.id;
  const { dataInicial, dataFinal, categoria, agrupar } = req.query;
  let filters = { userId };
  if (dataInicial && dataFinal) {
    filters.data = { [Op.between]: [dataInicial, dataFinal] };
  }
  let attributes, group;
  if (agrupar === 'categoria') {
    if (categoria) {
      filters.categoria = categoria;
    }
    attributes = ['categoria', [fn('SUM', col('valor')), 'total']];
    group = ['categoria'];
  } else if (agrupar === 'mes') {
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
      attributes,
      group,
      raw: true,
      order: agrupar === 'mes' ? [[fn('DATE_TRUNC', 'month', col('data')), 'ASC']] : undefined,
    });
    res.status(200).json(dadosAgrupados);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao gerar relatório agrupado.', error: err.message });
  }
};

exports.exportToExcel = async (req, res) => {
  const userId = req.user.id;
  const { dataInicial, dataFinal, categoria } = req.query;
  let filters = { userId };
  if (dataInicial && dataFinal) {
    filters.data = { [Op.between]: [dataInicial, dataFinal] };
  }
  if (categoria) {
    filters.categoria = categoria;
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

exports.exportToPDF = async (req, res) => {
  const userId = req.user.id;
  const { dataInicial, dataFinal, categoria } = req.query;
  let filters = { userId };
  if (dataInicial && dataFinal) {
    filters.data = { [Op.between]: [dataInicial, dataFinal] };
  }
  if (categoria) {
    filters.categoria = categoria;
  }
  try {
    const despesas = await Despesa.findAll({ where: filters, raw: true });
    const doc = new PDFDocument({ margin: 30, size: 'A4' });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="relatorio_despesas.pdf"');
    doc.pipe(res);

    const PAGE_HEIGHT = 800, HEADER_Y = 60; // Ajuste conforme fonte/tamanho da página
    let y = 40;

    // Cabeçalho
    const desenhaCabecalho = () => {
      doc.fontSize(18).text('Relatório de Despesas', { align: 'center' }); 
      y = doc.y + 8;
      doc.fontSize(12);
      doc.text('Descrição', 40, y, { width: 170 });
      doc.text('Valor', 210, y, { width: 80, align: 'right' });
      doc.text('Data', 295, y, { width: 80, align: 'center' });
      doc.text('Categoria', 380, y, { width: 100, align: 'left' });
      y = doc.y + 5;
      doc.moveTo(40, y).lineTo(510, y).stroke();
      y += 5;
      doc.fontSize(11);
    };

    desenhaCabecalho();

    // Tabela de despesas (paginada se necessário)
    despesas.forEach(d => {
      if (y > PAGE_HEIGHT - 30) {
        doc.addPage();
        y = HEADER_Y;
        desenhaCabecalho();
      }
      doc.text(d.descricao, 40, y, { width: 170 });
      doc.text(
        Number(d.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        210, y, { width: 80, align: 'right' }
      );
      doc.text(
        new Date(d.data).toLocaleDateString('pt-BR'),
        295, y, { width: 80, align: 'center' }
      );
      doc.text(
        d.categoria, 380, y, { width: 100, align: 'left' }
      );
      y = doc.y + 3;
    });

    doc.end();
  } catch (err) {
    res.status(500).json({ message: "Erro ao exportar PDF.", error: err.message });
  }
};

// Novo endpoint: Detalhamento de despesas
exports.getDetalhe = async (req, res) => {
  const userId = req.user.id;
  const { ano, mes, categoria } = req.query;
  if (!ano || !mes || !categoria) {
    return res.status(400).json({ message: "Preencha ano, mês e categoria." });
  }
  const dataInicial = `${ano}-${mes}-01`;
  const dataFinal = new Date(ano, parseInt(mes, 10), 0).toISOString().split('T')[0];
  try {
    const despesas = await Despesa.findAll({
      where: {
        userId,
        categoria,
        data: { [Op.between]: [dataInicial, dataFinal] }
      },
      order: [['data', 'ASC']]
    });
    res.status(200).json(despesas);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar detalhes.', error: err.message });
  }
};
