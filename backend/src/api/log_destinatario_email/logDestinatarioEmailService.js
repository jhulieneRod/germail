const knex = require('../../config/database');

module.exports = function (route) {

    route.get('/log_destinatario_email/:tipo', (req, res, next) => {
        let filtro = (req.params.tipo > 0) ? ` Where acao = ${req.params.tipo}` : '';
        const sqlCommand = `SELECT e.assunto as email,
                                    l.id as lead,
                                    l.nome as destinatario_nome,
                                    l.email as destinatario_email,
                                    CASE
                                    when lde.acao = 1
                                    then 'Enviado'
                                    else 'Aberto'
                                    end as acao
                              FROM log_destinatario_email lde
                              join lead l
                                on l.id = lde.id_lead
                              join email e
                                on e.id = lde.id_email
                                ${filtro}
                                order by datahora desc`;

        knex.raw(sqlCommand, [])
        .then((dados) => {
            return res.send(dados[0]);
        })
        .catch(function (error) {
            return res.status(500);
        }, next);
    });
}