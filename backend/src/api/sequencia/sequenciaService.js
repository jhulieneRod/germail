const knex = require('../../config/database');
const DateFormat = require('date-fns');

module.exports = function (route) {

    route.get('/sequencia/', (req, res, next) => {
        const sqlCommand = `select 
                                s.id,
                                s.nome, 
                                date_format(s.ultima_alteracao, '%d/%m/%Y %H:%mm') as ultima_alteracao
                              from 
                                sequencia s`;

        knex.raw(sqlCommand, [])
        .then((dados) => {
            return res.send(dados[0]);
        })
        .catch(function (error) {
            return res.status(500);
        }, next);
    });

    route.put('/sequencia/:id', (req, res, next) => {
        const id = req.params.id;
        const values = req.body;
        let datahora = DateFormat.format(new Date(), 'yyyy-MM-dd hh:mm:ss');
        req.body.ultima_alteracao = datahora;
        knex('sequencia')
            .where('id', id)
            .update(values)
            .then(() => {
                return res.status(200).send(true);
            })
            .catch(function (error) {}, next);
    });

    route.delete('/sequencia/:id', (req, res, next) => {
        const id = req.params.id;

        knex('sequencia')
        .where('id', id)
        .delete()
        .then((dados) => {
            return res.status(200).send(true);
        })
        .catch(function (error) {
            return res.status(500);
        }, next);
    });

    route.post('/sequencia/', (req, res, next) => {
        let datahora = DateFormat.format(new Date(), 'yyyy-MM-dd hh:mm:ss');
        req.body.ultima_alteracao = datahora;
        knex('sequencia')
        .insert(req.body)
        .then(() => {
            return res.status(200).send(true);
        })
        .catch(function (error) {
            return res.status(500);
        }, next);
    });
}