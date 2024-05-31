const nodemailer = require('nodemailer');

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

        let imgTrack = `<img src="http://77.37.69.246:14105/germail/abriu-email?dados={{dados_base64}}" alt="." style="display:none;">`;
        mailOptions.html = mailOptions.html.replace('</body>', `${imgTrack} </body>`);

        destinatarios.split(',').map(async (destinatario) => {

            let aDestinatario = destinatario.split(':::');

            let destinatarioEmail = aDestinatario[1];

            let dados = {
                id_lead: aDestinatario[0],
                id_email: json.id
            }

            let base64Dados = btoa(JSON.stringify(dados));
            
            mailOptions.to = destinatarioEmail;            
            mailOptions.html = mailOptions.html.replace('{{dados_base64}}', base64Dados);

            await transporter.sendMail(mailOptions)
            .then((result) => {
                console.log('Email enviado: ' + destinatarioEmail);
                resultSend.success = true;
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