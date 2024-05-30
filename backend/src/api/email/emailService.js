const knex = require('../../config/database');
const Email = require('./email');

module.exports = function (route) {

    route.get('/email/', (req, res, next) => {
        const sqlCommand = `select 
                                e.id,
                                e.assunto, 
                                e.conteudo, 
                                e.design, 
                                e.status, 
                                e.automatico,
                                case
                                    when e.status = 1
                                    then 'Ativo'
                                    else 'Desativo'
                                end as status_descricao
                              from 
                                email e`;

        knex.raw(sqlCommand, [])
        .then((dados) => {
            return res.send(dados[0]);
        })
        .catch(function (error) {
            return res.status(500);
        }, next);
    });

    route.get('/email_visualizar/:id', (req, res, next) => {
        const id = req.params.id;

        const sqlCommand = `select 
                                conteudo
                              from 
                                email
                             where id = ?`;

        knex.raw(sqlCommand, [id])
        .then((dados) => {
            return res.send(dados[0]);
        })
        .catch(function (error) {
            return res.status(500);
        }, next);
    });

    route.put('/email/:id', (req, res, next) => {
        const id = req.params.id;
        const values = req.body;
        knex('email')
            .where('id', id)
            .update(values)
            .then(() => {
                return res.status(200).send(true);
            })
            .catch(function (error) {
                return res.status(500).send(error);
            }, next);
    });

    route.delete('/email/:id', (req, res, next) => {
        const id = req.params.id;

        knex('email')
        .where('id', id)
        .delete()
        .then((dados) => {
            return res.status(200).send(true);
        })
        .catch(function (error) {
            return res.status(500);
        }, next);
    });

    route.post('/email/', (req, res, next) => {
        knex('email')
        .insert(req.body)
        .then(() => {
            return res.status(200).send(true);
        })
        .catch(function (error) {
            return res.status(500);
        }, next);
    });

    route.post('/envia_email/:id', (req, res, next) => {
        const id = req.params.id;

        const sqlCommand = `SELECT 
                                e.assunto, 
                                e.conteudo, 
                                GROUP_CONCAT(l.email) as email 
                            FROM destinatario_email de
                            JOIN email e
                              on de.id_email = e.id 
                             and de.status = 1 
                             and e.id = ? 
                            join tag t
                              on de.id_tag = t.id 
                            join lead l
                              on l.id_tag = t.id 
                             and l.status = 1
                           limit 1`;

        knex.raw(sqlCommand, [id])
        .then(async (dados) => {
            await Email.sendEmail(dados[0][0])
            .then((result) => {
                return res.status(200).send(result);
            }, next)
            .catch((error) => {
                return res.status(500).send(error);
            })
        })
        .catch(function (error) {
            return res.status(500);
        }, next);
    });

    route.get('/abriu-email/', (req, res, next) => {
        console.log('Email opened by:', req.query.email);
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': 43
        });
        const img = Buffer.from(
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/eq2dZQAAAAASUVORK5CYII=',
        'base64'
        );
        res.end(img);
    });
}