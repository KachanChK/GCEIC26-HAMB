const CAMPOS_CUSTO = ['pao', 'carne', 'queijo', 'salada', 'molho', 'embalagem'];

function arredondar(valor) {
  return Number(valor.toFixed(2));
}

function numeroValido(valor) {
  return typeof valor === 'number' && Number.isFinite(valor) && valor >= 0;
}

function validarCustos(dados) {
  return CAMPOS_CUSTO.every((campo) => numeroValido(dados[campo]));
}

function validarMargem(margemLucro) {
  return typeof margemLucro === 'number'
    && Number.isFinite(margemLucro)
    && margemLucro > 0
    && margemLucro < 100;
}

function calcularCustoTotal(dados) {
  if (!dados || !validarCustos(dados)) {
    throw new Error('Valores inválidos');
  }

  const total = CAMPOS_CUSTO.reduce((soma, campo) => soma + dados[campo], 0);
  return arredondar(total);
}

function calcularPrecoVenda(custoTotal, margemLucro) {
  if (!numeroValido(custoTotal) || !validarMargem(margemLucro)) {
    throw new Error('Valores inválidos');
  }

  const precoVenda = arredondar(custoTotal / (1 - margemLucro / 100));
  const lucroEstimado = arredondar(precoVenda - custoTotal);

  return {
    precoVenda,
    lucroEstimado,
  };
}

function calcularResumo(dados) {
  if (!dados || !validarMargem(dados.margemLucro)) {
    throw new Error('Valores inválidos');
  }

  const custoTotal = calcularCustoTotal(dados);
  const venda = calcularPrecoVenda(custoTotal, dados.margemLucro);

  return {
    custoTotal,
    precoVenda: venda.precoVenda,
    lucroEstimado: venda.lucroEstimado,
  };
}

module.exports = {
  calcularCustoTotal,
  calcularPrecoVenda,
  calcularResumo,
};
