const knex = require('../../config/database');

module.exports = function (route) {

    route.get('/lead/', (req, res, next) => {
        const sqlCommand = `select 
                                l.id,
                                l.nome, 
                                l.email, 
                                l.status, 
                                l.pontuacao,
                                case
                                    when l.status = 1
                                    then 'Ativo'
                                    else 'Desativo'
                                end as status_descricao,
                                concat(t.id, ':::', t.titulo, ':::', t.cor) as tag
                              from 
                                lead l
                              left join tag t
                              on t.id = l.id_tag`;

        knex.raw(sqlCommand, [])
        .then((dados) => {
            return res.send(dados[0]);
        })
        .catch(function (error) {
            return res.status(500);
        }, next);
    });

    route.put('/lead/:id', (req, res, next) => {
        const id = req.params.id;
        const values = req.body;
        knex('lead')
            .where('id', id)
            .update(values)
            .then(() => {
                return res.status(200).send(true);
            })
            .catch(function (error) {}, next);
    });

    route.delete('/lead/:id', (req, res, next) => {
        const id = req.params.id;

        knex('lead')
        .where('id', id)
        .delete()
        .then((dados) => {
            return res.status(200).send(true);
        })
        .catch(function (error) {
            return res.status(500);
        }, next);
    });

    route.post('/lead/', (req, res, next) => {
        knex('lead')
        .insert(req.body)
        .then(() => {
            return res.status(200).send(true);
        })
        .catch(function (error) {
            return res.status(500);
        }, next);
    });
}