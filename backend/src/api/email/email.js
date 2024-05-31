const nodemailer = require('nodemailer');
const knex = require('../../config/database');
const DateFormat = require('date-fns');

const sendEmail = async (json) => {

    let resultSend = {
        success: false,
        error: ''
    }

    let usuario = 'jhuliene.rodrigues@gmail.com';
    let senha = 'ceuu gjvb mnpm kqvi';

    if ((json.destinatario != '') && (json.destinatario != undefined)) {

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

        let destinatarios = json.destinatario;
        let mailOptions = {
            from: 'Germail - Gerenciamento de E-mails <'+usuario+'>',
            to: '',
            subject: json.assunto,
            html: json.conteudo,
        };

        await destinatarios.split(',').map(async (destinatario) => {

            let aDestinatario = destinatario.split(':::');
            let destinatarioEmail = aDestinatario[1];

            let dados = {
                id_lead: aDestinatario[0],
                id_email: json.id
            }

            let base64Dados = btoa(JSON.stringify(dados));

            let imgTrack = `<img src="http://77.37.69.246:14105/germail/abriu-email?dados=${base64Dados}" alt="." style="display:none;">`;
            mailOptions.html = json.conteudo.replace('</body>', `${imgTrack} </body>`);
            mailOptions.to = destinatarioEmail;
            let datahora = DateFormat.format(new Date(), 'yyyy-MM-dd HH:mm:ss');
            await transporter.sendMail(mailOptions)
            .then(async (result) => {                
                let values = {...dados, datahora, acao: 1}

                await knex('log_destinatario_email')
                .insert(values)
                .then( async (dados) => {
                    resultSend.success = true;
                    console.log('Email enviado: ' + destinatarioEmail);
                })
                .catch(function (error) {
                    resultSend.error = 'Não enviado:' + error
                });

            })
            .catch((error) => {
                console.log('Não ENVIADO', error);
                console.log('Email COM ERRO: ', destinatarioEmail);
                resultSend.error = 'Não enviado:' + error
            });
        });
    } else {
        resultSend.error = 'Destino não informado:' + json;
    }

    return resultSend;
}

module.exports = { sendEmail /*, existLogEmail, insertLogEmail*/ };