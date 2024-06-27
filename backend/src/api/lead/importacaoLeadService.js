const knex = require('../../config/database');

const importaLead = (req, res, next) => {
    const nome = req.body?.nome;
    const email = req.body?.email;

    knex('lead')
    .insert({nome, email, importado: 1})
    .then((dados) => {
        res.send(`Lead Incluído com Sucesso! (id:${dados[0]})`);
    })
    .catch(function (error) {
        console.log(error);
        res.send('Erro ao incluir o lead: ' + error);
    });
};

module.exports = { importaLead };