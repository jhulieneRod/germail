const bcrypt = require('bcrypt');
const knexCli = require('../../config/databaseCliente');
const emailRegex = /\S+@\S+\.\S+/
const { getIdUser } = require('../usuario/usuario');

module.exports = function (route) {

    // Rotas REST
    route.get('/situacoes', (req, res, next) => {

        const sqlCommand = ` select id,
                                    descricao_questor,
                                    descricao_veloxdp,
                                    tiposit,
                                    ativo
                               from situacao_questor
                           order by id asc`;

        knexCli(req).then((knex) => {
            if (knex)
                knex.raw(sqlCommand, [])
                    .then((dados) => {
                        return res.send(dados[0]);
                    })
                    .catch(function (error) {
                        return res.status(500).send({ errors: [error.sqlMessage] });
                    }, next);
            else
                return res.status(511).send({ errors: ['Acesso inválido'] });
        }, next);

    });
}