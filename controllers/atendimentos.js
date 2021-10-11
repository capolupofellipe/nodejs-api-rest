const Atendimento = require('../models/atendimentos');
module.exports = app => {
    app.get('/atendimentos', (req, res) => {
         Atendimento.lista(res);
        });

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        Atendimento.obtem(res, id);
    }) 


    app.post('/atendimentos', (req,res) => 
    {
        const atendimento = req.body;

        console.log(req.body);
        Atendimento.adiciona(atendimento, res);        
    });

    app.patch('/atendimentos/:id', (req, res) =>{
        const id = parseInt(req.params.id);
        const valores = req.body;

        Atendimento.altera(res, id, valores);
    });

    app.delete('/atendimentos/:id', (req, res) =>{
        
        const id = parseInt(req.params.id);
        
        Atendimento.delete(res, id);
    });
}