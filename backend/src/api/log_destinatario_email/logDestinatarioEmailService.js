const knex = require('../../config/database');

module.exports = function (route) {

    route.get('/log_destinatario_email/', (req, res, next) => {
        const sqlCommand = `SELECT e.assunto as email,
                                    l.nome as destinatario,
                                    CASE
                                    when lde.acao = 1
                                    then 'Enviado'
                                    else 'Aberto'
                                    end as acao
                              FROM log_destinatario_email lde
                              join lead l
                                on l.id = lde.id_lead
                              join email e
                                on e.id = lde.id_email`;

        knex.raw(sqlCommand, [])
        .then((dados) => {
            return res.send(dados[0]);
        })
        .catch(function (error) {
            return res.status(500);
        }, next);
    });
}