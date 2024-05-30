// const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const knex = require('../../config/database');
const env = require('../../.env');
const sha1 = require('sha1');
const nodemailer = require('nodemailer');

const login = (req, res, next) => {
    const user = req.body.usuario || '';
    const password = req.body.senha || '';

    let sqlCommand = `
        SELECT u.id, u.nome, u.email, u.senha, u.usuario
        FROM usuario u
        WHERE u.ativo = 1
        AND u.usuario = ?`;

    knex.raw(sqlCommand, [user])
    .then((result) => {
        let dados = result[0][0];
        if (!dados) {
            return res.status(400).send({ errors: ['Usuário não encontrado'] });
        }
        if (password === dados.senha) {
            const token = jwt.sign({ id: dados.id, nome: dados.nome, email: dados.email }, env.authSecret, {
                expiresIn: "30 days"
            });
            const { nome, email } = dados;
            return res.send({ nome, email, token });
        } else {
            return res.status(400).send({ errors: ['Senha inválida'] });
        }
    })
    .catch(next);
}

const validateToken = (req, res, next) => {
    const token = req.body.token || ''

    jwt.verify(token, env.authSecret, function (err, decoded) {
        return res.status(200).send({ valid: !err })
    })
}

const getIdUser = async (usuario, senha) => {

    let result = 0;
    let sqlCommand = 'select id from usuario where usuario = ?'

    const req = {
        decoded: {
            usuario,
            senha
        }
    }

    await knexCli(req).then(async (knex) => {
        await knex.raw(sqlCommand, [usuario])
            .then((dados) => {
                result = dados[0][0].id;
            })
            .catch(function (error) {

            });
    });

    return result;
}

function generateString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

const esqueciSenha = (req, res, next) => {
    const email = req.body.email || '';
    knex('usuario')
        .where('ativo', '1')
        .then(async (dados) => {
            if (dados) {
                for (usu in dados) {
                    if (dados[usu].usuario === email) {
                        let usuario = 'veloxdp@veloxdp.com.br';
                        let senha = 'gtvelox2adp';
                        let host = 'mail.veloxdp.com.br';
                        let port = 465;
                        let ssl = true;
                        let senhaGerada = Math.random() * (9999 - 1000) + 1000;
                        senhaGerada = senhaGerada.toFixed(0) + '.' + generateString(5);
                        const transporter = nodemailer.createTransport({
                            pool: ssl,
                            host: host,
                            port: port,
                            secure: ssl,
                            auth: {
                                user: usuario,
                                pass: senha
                            },
                            tls: {
                                // irá rejeitar o TLS se ele não for autenticado e enviar
                                rejectUnauthorized: false
                            }
                        });

                        let mailOptions = {
                            from: usuario,
                            to: email,
                            subject: 'Velox DP - Recuperação de Senha',
                            html: `<!DOCTYPE html>
                            <html lang="pt-br">

                            <head>
                                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                                <title>Recuperar senha</title>
                                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                            </head>

                            <body>
                                <table border="0" cellpadding="0" cellspacing="0" width="600">
                                    <tr>
                                        <td>
                                            <h3>Olá,</h3>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 0px 0 10px 0; font-size:16px;">
                                            <p>Essa é sua nova senha: <b style="font-size:24px; color:DodgerBlue;" >${senhaGerada}</b></p>
                                            <p>Após logar altere sua senha.</p>
                                        </td>
                                    </tr>       
                                </table>
                            </body>

                            </html>`
                        };

                        // console.log('mailOptions',mailOptions);

                        await transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                // console.log('erro:',error);                                
                                return res.status(500).send({ errors: ['Não enviado ' + error] });
                            } else {
                                // console.log('Email enviado: ');

                                let strUpdate = 'update usuario set senha_hash = ? where usuario = ?';
                                const salt = bcrypt.genSaltSync();
                                const passwordHash = bcrypt.hashSync(senhaGerada, salt);

                                knex.raw(strUpdate, [passwordHash, email])
                                    .then((dados) => {
                                        if (!dados) {
                                            return res.status(500).send({ errors: ['E-mail incorreta'] });
                                        }
                                        return res.status(200).send('E-mail Enviado!');
                                    })
                                    .catch(function (error) {
                                        return res.status(500).send({ errors: [error] });
                                    }, next);
                            }
                        });
                    }
                }

            } else {
                return res.status(500).send({ errors: ['Nenhum usuário encontrado'] });
            }

        }, next);
}

module.exports = { login, /*signup,*/ validateToken, /*esqueciSenha*/ }