const {
  calcularCustoTotal,
  calcularPrecoVenda,
  calcularResumo,
} = require('../src/burgcalcFuncoes');

const custosValidos = {
  pao: 1.20,
  carne: 5.50,
  queijo: 1.00,
  salada: 0.80,
  molho: 0.50,
  embalagem: 0.70,
};

describe('BURGCALC funcoes de calculo', () => {
  test('calcula o custo total do hamburguer', () => {
    expect(calcularCustoTotal(custosValidos)).toBe(9.7);
  });

  test('calcula preco de venda e lucro estimado', () => {
    expect(calcularPrecoVenda(9.7, 30)).toEqual({
      precoVenda: 13.86,
      lucroEstimado: 4.16,
    });
  });

  test('calcula resumo completo', () => {
    expect(calcularResumo({ ...custosValidos, margemLucro: 30 })).toEqual({
      custoTotal: 9.7,
      precoVenda: 13.86,
      lucroEstimado: 4.16,
    });
  });

  test('rejeita valores invalidos', () => {
    expect(() => calcularCustoTotal({ ...custosValidos, carne: -1 })).toThrow('Valores inválidos');
    expect(() => calcularPrecoVenda(9.7, 100)).toThrow('Valores inválidos');
  });
});
