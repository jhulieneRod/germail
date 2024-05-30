const knex = require('../../config/database');
const Email = require('../../api/email/email');

const getTotalAvisos = async (databaseName) => {

    let result = {
        data: {},
        success: false,
        error: null
    }

    const sqlCommand = `select max(gt.total_cliente) as total_cliente 
                              ,max(gt.total_funcionario) as total_funcionario
                              ,max(gt.total_exp) as total_exp
                              ,max(gt.total_ferias) as total_ferias
                              ,max(e.email_fechamento) as email_fechamento
                              ,date_format(curdate(), '%m/%Y') as competencia
                              ,max(e.nome) as nome_cliente
                          from (select  0 as total_cliente
                                      ,0 as total_funcionario
                                      ,IFNULL((case when tipo_email = 2 then count(*) end), 0) as total_exp
                                      ,IFNULL((case when tipo_email = 3 then count(*) end), 0) as total_ferias       
                                  from ${databaseName}.log_email l
                                  where l.tipo_email >= 2
                                  and l.data_log between concat(year(curdate()), '-', month(curdate()),'-01') 
                                                      and LAST_DAY(curdate())
                                  group by l.tipo_email
                                  
                              union
                                  
                              select count(*) as total_cliente
                                      ,0 as total_funcionario
                                      ,0 as total_exp
                                      ,0 as total_ferias      
                                  from ${databaseName}.cliente 
                              where (data_encerramento >= CURRENT_DATE() or data_encerramento is null)
                                  and (data_encerramento_veloxdp is null or data_encerramento_veloxdp = '0000-00-00')
                                  
                              union 
                              
                              select 0 as total_cliente
                                      ,count(*) as total_funcionario
                                      ,0 as total_exp
                                      ,0 as total_ferias
                                  from ${databaseName}.funcionario
                                  where ativo = 1
                                  and (data_demissao is null or data_demissao = '0000-00-00' or data_demissao >= CURRENT_DATE())) gt
                            inner join ${databaseName}.empresa e`;

    await knex.raw(sqlCommand, [])
        .then((dados) => {
            if (dados && dados[0].length) {
                result.data = dados[0][0];// recebe o objeto e não o array
                result.success = true;
            }
        })
        .catch(function (e) {
            // console.error('ListDataBase Error: ', e);
            result.error = e;
        });

    return result;
}

const sendEmailSemanalAvisos = async (databaseList) => {

    //console.log('[Auto Run] -> Iniciando envio de e-mail');
    for (const key in databaseList.data) {
        const database = databaseList.data[key];
        const totalAvisos = await getTotalAvisos(database.base_nome);

        //console.log('[Auto Run] -> ', database.base_nome,' totalAvisos:', totalAvisos);
        if (totalAvisos.success) {
            // console.log('TOTAL DA SEMANA = ', database.base_nome, ' total: ', totalAvisos);
            const assuntoEmail = `Velox DP - Resumo de Envios - ${totalAvisos.data.competencia}`;
            let msgHTML = getMSGTotalAvisosSemanal(totalAvisos.data);
            let destinoMail = totalAvisos.data.email_fechamento.replace(';', ',');
            // let destinoMail = 'giotone@gmail.com';
            console.log('[Auto Run] -> Enviando e-mail');
            await Email.sendEmail({ destino: destinoMail, assunto: assuntoEmail, message: msgHTML })// envia o e-mail para a contabilidade
                .then((resultSend) => {
                    //console.log('EMAIL ENVIADO!!!');
                })
                .catch((error) => {
                    console.log('error',error);
                })
        }
    }
    
    return true;
}

const getMSGTotalAvisosSemanal = (totalAvisos) => {

    return `<!DOCTYPE html>
    <html lang="pt-br">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    
        <style>
            p {
                margin: 0;
                padding: 0;
            }
    
            .card {
                border: solid 1px #dedfe3;
                border-top: solid 8px #0067b0;
                padding: 20px 10px;
                background-color: #fafafa;
            }
    
            .card_numero {
                color: #0067b0;
                font-size: 23px;
                margin-top: 20px;
            }
        </style>
    
    </head>
    
    <body style="margin: 0; padding: 20px 5px; color: black; ; background-color: #ffffff; font-family: Helvetica;">
        <table align="center" style="padding-bottom: 20px;">
            <tr>
                <td align="center">
                    <img src="https://veloxdp.com.br/image/Logo%20Nova%20Preta%20Horizontal.png"
                        style="max-width: 300px; max-height: 200px;">
                </td>
            </tr>
        </table>
    
        <table bgcolor="white"
            style="border-radius: 15px; border: solid 1px #bec0c4; padding: 0px 10px; max-width: 800px; font-size: 15px;"
            align="center">
            <tr>
                <td align="center">
                    <h1 style="text-align: center; display: inline-block; font-size: 33px;">
                        Confira seu resumo de envios
                    </h1>
                    <hr style="background-color: #bec0c4; height: 1px ; border: none;">
                </td>
            </tr>
            <tr>
                <td>
                    <p style="margin-top: 5px; padding: 0px 10px;">
                        <strong>Olá ${totalAvisos.nome_cliente}.</strong>
                    </p>
                    
                    <p style="padding: 10px;">Acompanhe de perto a movimentação dos avisos enviados para seus clientes. Esses números são acumulativos e por competência.<br>
                    </p>
                    
                    <p style="margin-top: 5px; padding: 0px 10px;">
                        <strong>Competência ${totalAvisos.competencia} </strong>
                    </p>
                </td>
    
            <tr>
                <td>
                    <table cellspacing="8">
                        <tr>
                            <td style="width: 45%; margin-left: 5px;" class="card">
                                <span>
                                    Total de Avisos de Férias:
                                </span>
                                <br>
                                <p class="card_numero">
                                    ${totalAvisos.total_ferias}
                                </p>
                            </td>
    
                            <td style="width: 45%;" class="card">
                                <span>
                                    Total de Avisos de Vencimento de Contrato de Experiência:
                                </span>
                                <br>
                                <p class="card_numero">
                                    ${totalAvisos.total_exp}
                                </p>
                            </td>
                        </tr>
    
                        <tr>
                            <td style="width: 45%; margin-left: 5px;" class="card">
                                <span>
                                    Total de Clientes Cadastrados:
                                </span>
                                <br>
                                <p class="card_numero">
                                    ${totalAvisos.total_cliente}
                                </p>
                            </td>
    
                            <td style="width: 45%;" class="card">
                                <span>
                                    Total de Funcionários ativos:
                                </span>
                                <br>
                                <p class="card_numero">
                                    ${totalAvisos.total_funcionario}
                                </p>
                            </td>
                        </tr>
                    </table>
    
                    <hr style="background-color: #bec0c4; height: 1px ; border: none;">
    
                </td>
            </tr>
    
            <tr align="center">
                <td>
                    <p style="padding: 10px; color: #393939;">O detalhamento das informações estão disponíveis no site
                        <a href="https://veloxdp.com.br/new/">veloxdp.com.br</a> no menu Dasboard</p>
                </td>
            </tr>
    
            <tr>
                <td align="center" style="padding: 10px 0; font-size: 16px;">
                    <p style="color: #888888;"><i>E-mail automático, não responda a esta mensagem.</i></p>
                </td>
            </tr>
            </tr>
        </table>
    
    </body>
    
    </html>`;
}

module.exports = { sendEmailSemanalAvisos }



