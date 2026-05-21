const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const API_URL = (process.env.API_URL || 'http://localhost:3001').replace(/\/$/, '');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function renderizar(req, res, view, dados = {}) {
  res.render(view, {
    currentPage: '',
    ...dados,
  });
}

function normalizarNumero(valor) {
  const numero = Number(valor);
  return Number.isFinite(numero) ? numero : valor;
}

app.get('/', (req, res) => {
  renderizar(req, res, 'burgcalc-splash', { currentPage: 'splash' });
});

app.get('/dashboard', (req, res) => {
  res.redirect('/calculo');
});

app.get('/login', (req, res) => {
  renderizar(req, res, 'login', { error: null, currentPage: 'login' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    return res.redirect('/calculo');
  }

  renderizar(req, res, 'login', {
    error: 'Usuario ou senha invalidos',
    currentPage: 'login',
  });
});

app.get('/sobre', (req, res) => {
  renderizar(req, res, 'burgcalc-sobre', { currentPage: 'sobre' });
});

app.get('/help', (req, res) => {
  renderizar(req, res, 'burgcalc-help', { currentPage: 'help' });
});

app.get('/calculo', (req, res) => {
  renderizar(req, res, 'calculo', { currentPage: 'calculo' });
});

app.post('/burgcalc/calcular', async (req, res) => {
  try {
    const fetch = (await import('node-fetch')).default;
    const payload = {
      pao: normalizarNumero(req.body.pao),
      carne: normalizarNumero(req.body.carne),
      queijo: normalizarNumero(req.body.queijo),
      salada: normalizarNumero(req.body.salada),
      molho: normalizarNumero(req.body.molho),
      embalagem: normalizarNumero(req.body.embalagem),
      margemLucro: normalizarNumero(req.body.margemLucro),
    };

    const response = await fetch(`${API_URL}/BURGCALC/resumo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

app.post('/calcular', async (req, res) => {
  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(`${API_URL}/api/calcular`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`App BURGCALC rodando em http://localhost:${PORT}`);
});

module.exports = app;
