const conexao = require('../infraestrutura/conexao');
const moment = require('moment');

class Atendimento{
    adiciona(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        const atendimentoDatado = {...atendimento, dataCriacao, data};
        
        
        const sql = 'INSERT INTO Atendimentos SET ?';

        conexao.query(sql, atendimentoDatado, (erro, resultado) => {
            if(erro){
                res.status(400).json(erro);
            } else {
                res.status(201).json(resultado);
            }
            
        })
    }
}

module.exports = new Atendimento;