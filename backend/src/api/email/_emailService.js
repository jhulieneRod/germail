const Email = require('./email');
const sha1 = require('sha1');
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

module.exports = (route) => {
    route.post('/email/envia', (req, res, next) => {     
        Email.sendEmail(req.body)
            .then((result) => {
                return res.status(200).send(result);
            }, next)
            .catch((error) => {
                return res.status(500).send(error);
            })
    })

    route.post('/email', (req, res, next) => {
        
        conexaoCliente.getConexao(req.body.usuario_velox, sha1(req.body.senha_velox))
            .then((knex) => {
                if (knex) {
                    knex.transaction(async function (trx) {
                        let bGravaLogEnvio = false;
                        let bErro = false;

                        await trx.raw(`select * 
                                     from log_email 
                                    where questor_empresa = ${req.body.cod_empresa} 
                                      and questor_filial = ${req.body.cod_filial}
                                      and codigo_funcionario = ${req.body.cod_funcionario}
                                      and tipo_email = ${tipo_email}
                                      and data_log = CURDATE() `)
                            .then(async (result) => {
                                // se o objeto retornar undefined significa que não encontrou nenhum registro na tabela e pode enviar o e-mail
                                if (result[0][0] == undefined) {
                                    await sleep(7500);// espera 7.5 segundos para não atingir o limite de 500 emails por hora. Isso só se for contrato experiência ou férias
                                    await Email.sendEmail(req.body)
                                        .then((result) => {
                                            bGravaLogEnvio = true;
                                        })
                                        // }, next)
                                        .catch((error) => {
                                            bErro = true;
                                        })
                                }
                            })
                            .catch((error) => {
                                bErro = true;
                                console.log("Erro ao executar consulta SQL de LOG: ", error);
                            });

                        if ((!bErro) && (bGravaLogEnvio)) {
                            let sqlInsert = `insert into log_email(questor_empresa
                                                                        , questor_filial
                                                                        , codigo_funcionario
                                                                        , tipo_email
                                                                        , data_log)
                                                                 values(?, ?, ?, ?, CURDATE());`;

                            await trx.raw(sqlInsert, [req.body.cod_empresa, req.body.cod_filial, req.body.cod_funcionario, tipo_email])
                                .then((result) => {
                                    bErro = result[0].affectedRows == 0;
                                    // console.log("Log de envio gravado com sucesso!");
                                })
                                .catch((error) => {
                                    console.log("Falha ao gravar log de envio de e-mail: ", error);
                                    bErro = true;
                                })
                        }

                        // knex.destroy();

                        if (!bErro) {
                            return res.status(200).send('Rotina de e-mail executada com sucesso.');
                        } else {
                            return res.status(500).send('Falha ao executar rotina de e-mail');
                        }
                    }, next);
                } else {
                    console.error('[email] Não foi possível conectar no banco de dados')
                    return res.status(200).send('Falha ao executar rotina de [email]');
                }
            }, next)
    })
}