
const Atendimento = require('../models/atendimento')

module.exports = app => {
  app.get('/atendimentos', (req, res, next) => {
    Atendimento.lista(res);
  })

  app.get('/atendimentos/:id', (req, res, next) => {
    const id = +req.params.id;
    Atendimento.buscaAtendimentoPorId(res, id);
  })

  app.post('/atendimentos', (req, res, next) => {
    const atendimento = req.body;
    Atendimento.adiciona(atendimento, res);

  })





}