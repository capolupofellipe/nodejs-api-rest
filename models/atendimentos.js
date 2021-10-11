const conexao = require('../infraestrutura/conexao');
const moment = require('moment');

class Atendimento{
    adiciona(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');        
        
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteEhValido = atendimento.cliente.length >= 5;

        const validacoes = [
            {
                nome: 'data',
                mensagem: 'data deve ser maior que data atual',
                valido: dataEhValida
            },
            {
                nome: 'cliente',
                mensagem: 'cliente deve ter mais que 5 caracteres',
                valido: clienteEhValido
            },
        ];
        
        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length;

        if(existemErros){
            res.status(400).json(erros);
        }        
        
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