const knex = require('../../config/database');

module.exports = function (route) {

    route.get('/configuracao/:tipo', (req, res, next) => {
        const tipo = req.params.tipo;

        const sqlCommand = `select 
                                c.id,
                                c.campo, 
                                c.valor 
                              from 
                                configuracao c 
                             where tipo = ?`;

        knex.raw(sqlCommand, [tipo])
        .then((dados) => {
            return res.send(dados[0]);
        })
        .catch(function (error) {
            return res.status(500);
        }, next);
    });

    route.put('/configuracao/', (req, res, next) => {
        const values = req.body;
        Object.keys(values).forEach(function(key) {
            let aChave = key.split('_');
            let valor = {valor: values[key]};
            knex('configuracao')
            .where('id', aChave[0])
            .update(valor)
            .then(() => {})
            .catch(function (error) {}, next); 
        });

        return res.status(200).send(true);
    });
}