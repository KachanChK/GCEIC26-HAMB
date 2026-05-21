const request = require('supertest');
const app = require('../src/app');

const custosValidos = {
  pao: 1.20,
  carne: 5.50,
  queijo: 1.00,
  salada: 0.80,
  molho: 0.50,
  embalagem: 0.70,
};

describe('BURGCALC API', () => {
  test('GET /BURGCALC/health retorna status da API', async () => {
    const res = await request(app).get('/BURGCALC/health');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      success: true,
      message: 'API BURGCALC funcionando',
    });
  });

  test('POST /BURGCALC/resumo calcula custo, preco e lucro', async () => {
    const res = await request(app)
      .post('/BURGCALC/resumo')
      .send({ ...custosValidos, margemLucro: 30 });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      success: true,
      custoTotal: 9.7,
      precoVenda: 13.86,
      lucroEstimado: 4.16,
    });
  });

  test('POST /BURGCALC/custo retorna erro para valores invalidos', async () => {
    const res = await request(app)
      .post('/BURGCALC/custo')
      .send({ ...custosValidos, carne: -1 });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      success: false,
      message: 'Valores inválidos',
    });
  });
});
