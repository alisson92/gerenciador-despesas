const Despesa = require('../models/Despesa');

exports.getDespesas = async (req, res) => {
  try {
    const despesas = await Despesa.findAll();
    res.json(despesas);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar despesas');
  }
};

exports.getDespesaById = async (req, res) => {
  try {
    const despesa = await Despesa.findByPk(req.params.id);
    if (despesa) {
      res.json(despesa);
    } else {
      res.status(404).send('Despesa não encontrada');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar despesa');
  }
};

exports.createDespesa = async (req, res) => {
  try {
    const { descricao, valor, data, categoria } = req.body;
    const novaDespesa = await Despesa.create({ descricao, valor, data, categoria });
    res.status(201).json(novaDespesa);
  } catch (error) {
    console.error('Erro ao criar despesas:', error);
    res.status(500).send('Erro ao criar despesa');
  }
};

exports.updateDespesa = async (req, res) => {
  try {
    const { descricao, valor, data, categoria } = req.body;
    const despesa = await Despesa.findByPk(req.params.id);

    if (despesa) {
      despesa.descricao = descricao;
      despesa.valor = valor;
      despesa.data = data;
      despesa.categoria = categoria;
      await despesa.save();
      res.json(despesa);
    } else {
      res.status(404).send('Despesa não encontrada');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao atualizar despesa');
  }
};

exports.deleteDespesa = async (req, res) => {
  try {
    const despesa = await Despesa.findByPk(req.params.id);

    if (despesa) {
      await despesa.destroy();
      res.status(204).send();
    } else {
      res.status(404).send('Despesa não encontrada');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao excluir despesa');
  }
};
