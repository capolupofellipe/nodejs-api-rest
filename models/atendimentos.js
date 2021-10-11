const conexao = require('../infraestrutura/conexao');
const moment = require('moment');
const { isBuffer } = require('util');

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

    lista(res){
        const sql = 'select * from atendimentos'

        conexao.query(sql, (erro, resultados) => {
            if(erro){
            res.status(400).json(erro);
        } else {
            res.status(200).json(resultados);
        }

        })
    }

    obtem(res, id){
        const sql = `select * from atendimentos where id = ${id}`;
        
        conexao.query(sql, (erro, resultado) => {
            const atendimento = resultado[0];
            if(erro){
                res.status(400).json(erro);
            } else { 
                res.status(200).json(atendimento);
            }
        })
    }

    altera(res, id, valores){
        const sql = 'update atendimentos set ? where id =?'
        
        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss'); 
        }

        conexao.query(sql, [valores, id], (erro, resultado) => {
            if(erro){
                res.status(400).json(erro);
            } else {
                res.status(200).json(resultado);
            }
        });
    }

    delete(res, id){
        const sql = 'delete from atendimentos where id=?';

        conexao.query(sql, id, (erro, resultado) => {
            if(erro){
                res.status(400).json(erro);
            } else {
                res.status(200).json(resultado);
            }
        })
    }
}

module.exports = new Atendimento;