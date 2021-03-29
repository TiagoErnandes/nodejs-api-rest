const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class Atendimento {
  adiciona(atendimento, res) {
    const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
    const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
    const atendimentoDatado = { ...atendimento, dataCriacao, data }

    const dataehValida = moment(data).isSameOrAfter(dataCriacao);
    const clienteehValido = atendimento.cliente.length >= 5;

    const validacoes = [
      {
        nome: data,
        valido: dataehValida,
        mensagem: 'Data deve ser maior ou igual a data Atual'
      },
      {
        nome: 'cliente',
        valido: clienteehValido,
        mensagem: 'Cliente deve ter pelo menos cinco caracteres'
      }
    ]
    const erros = validacoes.filter(campo => !campo.valido);
    const existemErros = erros.length;

    if (existemErros) {
      res.status(400).json(erros)
    } else {
      const sql = 'INSERT INTO atendimentos SET ?'

      conexao.query(sql, atendimentoDatado, (erro, resultado) => {
        if (erro) {
          res.status(400).json(erro)
        } else {
          res.status(201).json(resultado)
        }

      })
    }


  }

  lista(res) {
    const sql = 'select * from atendimentos'
    conexao.query(sql, (erro, resultado) => {
      if (erro) {
        res.status(400).json(erro)
      } else {
        res.status(200).json(resultado)
      }
    })
  }
  buscaAtendimentoPorId(res, id) {
    const sql = `select * from atendimentos where id = ${id}`
    conexao.query(sql, (erro, resultado) => {
      if (erro) {
        res.status(400).json(erro)
      } else {
        res.status(200).json(resultado)
      }
    })
  }



}

module.exports = new Atendimento;