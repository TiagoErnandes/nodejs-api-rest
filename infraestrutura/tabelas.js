class Tabelas {
  init(conexao) {
    this.conexao = conexao;
    this.criarAtendimento();
    console.log("Tabelas foram chamadas")
  }
  criarAtendimento() {
    const sql = `CREATE TABLE IF NOT EXISTS atendimentos 
    (id int NOT NULL AUTO_INCREMENT, cliente varchar(50)
    NOT NULL,pet varchar(20),servico varchar(20) NOT NULL,data datetime NOT NULL,dataCriacao datetime NOT NULL, status varchar(20) NOT NULL,
    observacoes text,PRIMARY KEY (id))`

    this.conexao.query(sql, (error) => {
      if (error) {
        console.log(error)
      } else {
        console.log("Atendimento criados com sucesso")
      }

    });
  }
}

module.exports = new Tabelas;