const { Despesa } = require('../models');

// Listar todas as despesas do usuário autenticado
exports.getDespesas = async (req, res) => {
  try {
    const despesas = await Despesa.findAll({
      where: { userId: req.user.id }
    });
    res.json(despesas);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar despesas');
  }
};

// Buscar uma despesa específica do usuário autenticado
exports.getDespesaById = async (req, res) => {
  try {
    const despesa = await Despesa.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });
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

// Criar despesa vinculada ao usuário autenticado
exports.createDespesa = async (req, res) => {
  try {
    const { descricao, valor, data, categoria } = req.body;
    // categoria já chega slug do frontend!
    const novaDespesa = await Despesa.create({
      descricao,
      valor,
      data,
      categoria,
      userId: req.user.id
    });
    res.status(201).json(novaDespesa);
  } catch (error) {
    console.error('Erro ao criar despesa:', error);
    res.status(500).send('Erro ao criar despesa');
  }
};

// Atualizar uma despesa só se pertencer ao usuário logado
exports.updateDespesa = async (req, res) => {
  try {
    const { descricao, valor, data, categoria } = req.body;
    const despesa = await Despesa.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });

    if (despesa) {
      despesa.descricao = descricao;
      despesa.valor = valor;
      despesa.data = data;
      despesa.categoria = categoria; // já normalizada!
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

// Excluir uma despesa só se pertencer ao usuário logado
exports.deleteDespesa = async (req, res) => {
  try {
    const despesa = await Despesa.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });

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
