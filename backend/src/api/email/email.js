const nodemailer = require('nodemailer');

const sendEmail = async (json) => {

    let resultSend = {
        success: false,
        error: ''
    }

    let usuario = 'jhuliene.rodrigues@gmail.com';
    let senha = 'ceuu gjvb mnpm kqvi';

    if ((json.email != '') && (json.email != undefined)) {

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            logger: true,
            debug: true,
            secureConnection: false,
            ignoreTLS: true,
            auth: {
                user: usuario,
                pass: senha
            },
            tls: {
                rejectUnAuthorized: true,
            }
        });

        transporter.verify(function (error, success) {
            if (error) {
              console.log(error);
            } else {
              console.log("Server is ready to take our messages");
            }
        });

        let destinatarios = json.email;
        let mailOptions = {
            from: 'Germail - Gerenciamento de E-mails <'+usuario+'>',
            to: '',
            subject: json.assunto,
            html: json.conteudo,
        };

        destinatarios.split(',').map(async (destinatario) => {
            
            mailOptions.to = destinatario;

            await transporter.sendMail(mailOptions)
            .then((result) => {
                console.log('Email enviado: ' + destinatario);
                resultSend.success = true;
            })
            .catch((error) => {
                console.log('Não ENVIADO', error);
                console.log('Email COM ERRO: ', destinatario);
                resultSend.error = 'Não enviado:' + error
            });
        });
    } else {
        resultSend.error = 'Destino não informado:' + json;
    }

    return resultSend;
}

// const existLogEmail = async (knex, data) => {

//     let result = {
//         exist: true,
//         success: true,
//         error: ''
//     }

//     let sqlCommand = `select * 
//                         from log_email 
//                        where questor_empresa = ${data.erp_empresa} 
//                          and questor_filial = ${data.erp_filial}
//                          and codigo_funcionario = ${data.codigo_func}
//                          and tipo_email = ${data.tipo_email}
//                          and data_log = CURDATE() `

//     await knex.raw(sqlCommand)
//         .then((data) => {
//             // se o objeto retornar undefined significa que não encontrou nenhum registro na tabela e pode enviar o e-mail
//             result.exist = data[0].length > 0;
//         })
//         .catch((error) => {
//             result.success = false;
//             result.error = error;
//             console.log("Erro ao executar consulta SQL de LOG: ", error);
//         });

//     return result;
// }

// const insertLogEmail = async (knex, data) => {
//     let resultInsert = {
//         success: false,
//         error: ''
//     }

//     let sqlInsert = `insert into log_email(
//                         questor_empresa
//                        ,questor_filial
//                        ,codigo_funcionario
//                        ,tipo_email
//                        ,data_log
//                        ,erp_empresa
//                        ,erp_filial)
//                      values(?, ?, ?, ?, CURDATE(), ?, ?);`;

//     await knex.raw(sqlInsert, [data.erp_empresa, data.erp_filial, data.codigo_func, data.tipo_email, data.erp_empresa, data.erp_filial])
//         .then((result) => {
//             resultInsert.success = result[0].affectedRows > 0;
//             if (resultInsert.success)
//                 resultInsert.error = 'Não foi possível inserir o log de e-mail';
//         })
//         .catch((error) => {
//             resultInsert.error = error;
//         })

//     return resultInsert;
// }

// sendEmail(
//     {
//         destino: "giotone@gmail.com",
//         assunto: "Teste mailgrid",
//         message: "Isso é um Teste mailgrid",
//         email_porta: "",
//         email_usuario: "",
//         email_senha: "",
//         email_servidor: "",
//         email_ssl: "1",
//         usuario_velox: "gt2a@gt2a.com.br",
//         senha_velox: "090109",
//         cod_empresa: "1955",
//         cod_filial: "1",
//         cod_funcionario: "0",
//         tipo_email: "geral"
//      }
// )

module.exports = { sendEmail /*, existLogEmail, insertLogEmail*/ };