const knex = require('../../config/database');

module.exports = function (route) {
    route.get('/dashboard/widgets', (req, res, next) => {

        const sqlCommand = `select (select 
                                        count(id)
                                    from
                                        log_destinatario_email
                                    where acao = 1) as emails_enviados,
                                    (select 
                                        count(id)
                                    from
                                        log_destinatario_email
                                    where acao = 2) as emails_abertos`;

        knex.raw(sqlCommand, [])
        .then((dados) => {
            return res.send(dados[0][0]);

        })
        .catch(function (error) {
            return res.status(500).send({ errors: [error.sqlMessage] });
        }, next);

    });
}