const knex = require('../../config/database');

module.exports = function (route) {

    route.get('/tag/', (req, res, next) => {
        const sqlCommand = `select 
                                t.id,
                                t.titulo, 
                                t.descricao, 
                                t.cor 
                              from 
                                tag t`;

        knex.raw(sqlCommand, [])
        .then((dados) => {
            return res.send(dados[0]);
        })
        .catch(function (error) {
            return res.status(500);
        }, next);
    });

    route.put('/tag/:id', (req, res, next) => {
        const id = req.params.id;
        const values = req.body;
        knex('tag')
            .where('id', id)
            .update(values)
            .then(() => {
                return res.status(200).send(true);
            })
            .catch(function (error) {}, next);
    });

    route.delete('/tag/:id', (req, res, next) => {
        const id = req.params.id;

        knex('tag')
        .where('id', id)
        .delete()
        .then((dados) => {
            return res.status(200).send(true);
        })
        .catch(function (error) {
            return res.status(500);
        }, next);
    });

    route.post('/tag/', (req, res, next) => {
        knex('tag')
        .insert(req.body)
        .then(() => {
            return res.status(200).send(true);
        })
        .catch(function (error) {
            return res.status(500);
        }, next);
    });
}