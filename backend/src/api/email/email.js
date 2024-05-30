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

module.exports = { sendEmail /*, existLogEmail, insertLogEmail*/ };