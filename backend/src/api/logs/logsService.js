const knexCli = require('../../config/databaseCliente');
// const { format, parseISO } = require('date-fns');

module.exports = function (route) {

    // Rotas REST
    route.post('/logs/avisos', (req, res, next) => {

        let dataLog = req.body.data_log;

        const sqlCommand = `select c.id as codigo_sistema 
                                  ,l.questor_empresa as empresa
                                  ,l.questor_filial as filial
                                  ,c.nome as cliente
                                  ,l.codigo_funcionario
                                  ,f.nome as funcionario
                                  ,date_format(l.data_log, '%d/%m/%Y') as data_log
                                  ,c.email
                              from log_email l
                              left join cliente c on c.erp_empresa = l.questor_empresa 
                                                 and c.erp_filial  = l.questor_filial
                              left join funcionario f on f.cliente_id = c.id 
                                                     and f.codigo_sistema = l.codigo_funcionario
                                                     and f.ativo = 1
                             where l.tipo_email = ${req.body.tipo} 
                               and l.data_log between concat(year(DATE_ADD(curdate(), INTERVAL -11 month)), '-', month(DATE_ADD(curdate(), INTERVAL -11 month)),'-01') 
                                            and LAST_DAY(curdate())
                            order by l.data_log desc, c.nome asc`;

        knexCli(req).then((knex) => {
            if (knex){
          
                knex.raw(sqlCommand, [])
                    .then((dados) => {     
                        return res.send(dados[0]);
                    })
                    .catch(function (error) {
                        return res.status(500).send({ errors: [error.sqlMessage] });
                    }, next);
            } else
                return res.status(511).send({ errors: ['Acesso inválido'] });
        }, next);

    });
}