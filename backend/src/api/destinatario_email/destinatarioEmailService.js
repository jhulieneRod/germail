const knex = require('../../config/database');

module.exports = function (route) {

    route.get('/destinatario_email/:id_email', (req, res, next) => {
        const sqlCommand = `select  null as id,
                                    null as id_tag,
                                    null as titulo,
                                    null as cor,
                                    null as id_email,
                                    null as status_descricao,
                                    null as status
                            UNION
                            select 
                                d.id,
                                d.id_tag,
                                t.titulo,
                                t.cor,
                                d.id_email,
                                case
                                    when d.status = 1
                                    then 'Ativo'
                                    else 'Desativo'
                                end as status_descricao,
                                d.status
                              from 
                                destinatario_email d
                              join tag t 
                                on t.id = d.id_tag
                             where d.id_email = ? 
                            `;

        knex.raw(sqlCommand, [req.params.id_email])
        .then((dados) => {
            return res.send(dados[0]);
        })
        .catch(function (error) {
            return res.status(500);
        }, next);
    });

    route.put('/destinatario_email/:id', (req, res, next) => {
        const id = req.params.id;
        const values = req.body;
        knex('destinatario_email')
            .where('id', id)
            .update(values)
            .then(() => {
                return res.status(200).send(true);
            })
            .catch(function (error) {}, next);
    });

    route.delete('/destinatario_email/:id', (req, res, next) => {
        const id = req.params.id;

        knex('destinatario_email')
        .where('id', id)
        .delete()
        .then((dados) => {
            return res.status(200).send(true);
        })
        .catch(function (error) {
            return res.status(500);
        }, next);
    });

    route.post('/destinatario_email/', (req, res, next) => {
        knex('destinatario_email')
        .insert(req.body)
        .then(() => {
            return res.status(200).send(true);
        })
        .catch(function (error) {
            return res.status(500);
        }, next);
    });
}