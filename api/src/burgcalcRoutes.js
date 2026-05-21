const express = require('express');
const {
  calcularCustoTotal,
  calcularPrecoVenda,
  calcularResumo,
} = require('./burgcalcFuncoes');

const router = express.Router();

function erroValidacao(res) {
  return res.status(400).json({
    success: false,
    message: 'Valores inválidos',
  });
}

router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API BURGCALC funcionando',
  });
});

router.post('/custo', (req, res) => {
  try {
    const custoTotal = calcularCustoTotal(req.body);
    res.json({
      success: true,
      custoTotal,
    });
  } catch (err) {
    erroValidacao(res);
  }
});

router.post('/preco-venda', (req, res) => {
  try {
    const { custoTotal, margemLucro } = req.body;
    const resultado = calcularPrecoVenda(custoTotal, margemLucro);
    res.json({
      success: true,
      ...resultado,
    });
  } catch (err) {
    erroValidacao(res);
  }
});

router.post('/resumo', (req, res) => {
  try {
    const resumo = calcularResumo(req.body);
    res.json({
      success: true,
      ...resumo,
    });
  } catch (err) {
    erroValidacao(res);
  }
});

module.exports = router;
