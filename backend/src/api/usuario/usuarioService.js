const bcrypt = require('bcrypt');
const knex = require('../../config/database');
const knexCli = require('../../config/databaseCliente');
const emailRegex = /\S+@\S+\.\S+/
const { format } = require('date-fns');
const Email = require('../email/email');
const { insertUser, deleteUser, updateUser, getTipoUser } = require('./usuario');


function validaUsuarioCadastrado(dados, email) {

    for (usu in dados) {
        if (dados[usu].usuario === email) {
            return true;
        }
    }
    return false;
}

module.exports = function (route) {

    // Rotas REST
    route.get('/usuarios', (req, res, next) => {
        const sqlCommand = `       select us.id
                                        , us.empresa_id
                                        , us.nome
                                        , us.usuario
                                        , us.senha
                                        , us.tipo
                                        , us.ativo
                                        , us.email
                                        , us.data_cadastro
                                        , us.usuario_cadastro_id
                                        , us.funcionario_id
                                        , us.senha_hash
                                        , us.x_ativo
                                        
                                        , us.id as key_item
                                        
                                        , cl.id as cliente_id
                                        , cl.nome  as nome_cliente
                                        , concat(us.id, '_', uc.cliente_id) as key_cliente
                                        
                                    from usuario us
                               left join usuario_cliente uc on uc.usuario_id = us.id
                               left join cliente cl on cl.id = uc.cliente_id`;

        knexCli(req).then((knex) => {
            if (knex)
                knex.raw(sqlCommand, [])
                    .then((dados) => {

                        let result = [];
                        let itensList = [];
                        let list = dados[0];

                        for (const key in list) {

                            const itens = list[key];

                            if (!itensList[itens.key_item]) {
                                itensList[itens.key_item] = {
                                    id: itens.id,
                                    empresa_id: itens.empresa_id,
                                    nome: itens.nome,
                                    usuario: itens.usuario,
                                    senha: itens.senha,
                                    tipo: itens.tipo,
                                    ativo: itens.ativo,
                                    email: itens.email,
                                    data_cadastro: itens.data_cadastro,
                                    usuario_cadastro_id: itens.usuario_cadastro_id,
                                    funcionario_id: itens.funcionario_id,
                                    senha_hash: itens.senha_hash,
                                    x_ativo: itens.x_ativo,
                                    clientes: [],
                                }
                            }

                            if (itens.cliente_id) {
                                itensList[itens.key_item].clientes[itens.key_cliente] = {
                                    usuario_id: itens.id,
                                    cliente_id: itens.cliente_id,
                                    nome: itens.nome_cliente
                                }
                            }

                        }

                        for (const key in itensList) {
                            let clientesObj = itensList[key].clientes;

                            result.push(itensList[key])
                            result[result.length - 1].clientes = Object.keys(clientesObj).map(function (key) { return clientesObj[key]; });                       // converte obj para array
                        }

                        return res.send(result);
                    })
                    .catch(function (error) {
                        return res.status(500).send({ errors: [error.sqlMessage] });
                    }, next);
            else
                return res.status(511).send({ errors: ['Acesso inválido'] });
        }, next);
    });


    // cadastra o usuário
    route.post('/usuarios', (req, res, next) => {

        const name = req.body.nome || '';
        const email = req.body.usuario || '';
        const password = req.body.senha || '';
        const confirmPassword = req.body.confirmarSenha || '';

        let aux = [];
        let clientes = req.body.clientes || [];
        // let tipoUsuario = getTipoUser();


        if (!email.match(emailRegex)) {
            return res.status(500).send({ errors: ['O e-mail informado está inválido'] })
        }

        if ((parseInt(req.body.tipo) === 2) && (!clientes.length)) {
            return res.status(500).send({ errors: ['Não é possível salvar um usuário do tipo "Cliente", sem nenhum cliente relacionado.'] })
        }

        const salt = bcrypt.genSaltSync()
        const passwordHash = bcrypt.hashSync(password, salt)
        if (!bcrypt.compareSync(confirmPassword, passwordHash)) {
            return res.status(500).send({ errors: ['Senhas não conferem.'] })
        }

        knexCli(req).then((knex) => {
            knex('usuario').then(async (dados) => {

                let tipoUsuario = await getTipoUser(knex,req.decoded.usuario);

                let usuario = {
                    empresa_id: knex.appDB.idEmpresa,
                    nome: req.body.nome,
                    usuario: req.body.usuario,
                    senha: '',
                    tipo: (parseInt(tipoUsuario) === 2) ? 2 : req.body.tipo,
                    x_ativo: req.body.x_ativo || 1,
                    email: req.body.usuario,
                    data_cadastro: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
                    usuario_cadastro_id: req.decoded.cd_usuario,
                    funcionario_id: '',
                    senha_hash: passwordHash,
                }

                if (validaUsuarioCadastrado(dados, email)) {
                    return res.status(500).send({ errors: ['Usuário já cadastrado.'] });
                } else {
                    knex('usuario')
                        .insert(usuario)
                        .then((dados2) => {

                            if (clientes.length) {
                                for (const key in clientes) {

                                    aux.push({
                                        usuario_id: dados2[0],
                                        cliente_id: clientes[key].cliente_id,
                                    })
                                }

                                knex('usuario_cliente')
                                    .insert(aux)
                                    .onConflict(['usuario_id', 'cliente_id'])
                                    .merge()
                                    .then((dadosAux) => { })
                                    .catch(function (error) { });
                            }

                            let permissaoList = req.body.permissoes.map(field => ({
                                cd_tela: parseInt(field.cd_tela),
                                cd_usuario: parseInt(dados2[0]),// id do usuario
                                x_permissao: parseInt(field.x_permissao)
                            }));

                            knex('tela_permissao').insert(permissaoList)
                                .then(() => { })
                                .catch((e) => { })


                            if (dados2) {
                                // return res.status(200).send('Salvo com sucesso!');
                                insertUser(usuario)
                                    .then((result) => {
                                        if (result) {

                                            {/*
                                            Email.sendEmail({destino: req.body.usuario, assunto: 'Acesso VeloxDP', message:`
                                                <img src="https://veloxdp.com.br/image/logovelox.png" style="width: 300px;">
                                                <br> Olá <br><br> Seja bem-vindo ao VeloxDP 
                                                <br>
                                                <br> 
                                                <b>Esses são seus dados de acesso</b> <br> <b>Usuário</b>: ${req.body.usuario}  <br> <b>Senha</b>: ${req.body.senha}
                                           ` })// envia o e-mail para o cliente
*/}
                                            Email.sendEmail({
                                                destino: req.body.usuario, assunto: 'Acesso VeloxDP', message: `
                                                <!DOCTYPE html>
                                                <html lang="en">

                                                <head>
                                                    <meta charset="UTF-8">
                                                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                                                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                                    <title>Document</title>
                                                </head>

                                                <body style="margin: 0; padding: 20px 0px; background-color: #003f52; font-family: Helvetica;">
                                                    <table align="center" style="padding-bottom: 20px;">
                                                        <tr>
                                                            <td align="center">
                                                                <img src="https://veloxdp.com.br/image/logovelox.png" style="width: 300px;">
                                                            </td>
                                                        </tr>
                                                    </table>

                                                    <table width="800px" bgcolor="white" style="border-radius: 15px;" align="center">
                                                        <tr>
                                                            <td align="center">
                                                                <h1 style="text-align: center; display: inline-block;">
                                                                    <span style="font-size: 30px; font-family: sans-serif;">Bem-Vindo(a) - Seu Usuário Foi
                                                                        Cadastrado Com Sucesso!
                                                                    </span><br>
                                                                </h1>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="padding: 0px 30px; font-size: 18px;">
                                                                <p>Estamos muito felizes em tê-lo como nosso novo usuário. Com o VeloxDP, você poderá integrar todos os
                                                                    dados do departamento pessoal da sua empresa com o escritório contábil, de forma rápida e fácil.


                                                                </p>

                                                                <p style="font-weight: 700; display: inline;">
                                                                    Seguem abaixo as informações de acesso:
                                                                </p>

                                                                <ul style="list-style: none; padding: 0px;">
                                                                    <li><strong>Seu Login:</strong> ${req.body.usuario} </li>
                                                                    <li><strong>Sua Senha:</strong> ${req.body.senha} </li>
                                                                    <li><strong>Link Para Acesso da Plataforma:</strong> <a href="https://veloxdp.com.br/"
                                                                            target="_blank" style="text-decoration: none;">
                                                                            veloxdp.com.br </a> </li>
                                                                </ul>

                                                            </td>
                                                        <tr>
                                                            <td align="center" style="padding-top: 5px;">
                                                                <p style="color: #888888;"><i>E-mail automático, não responda a esta mensagem.</i></p>
                                                            </td>
                                                        </tr>
                                                        </tr>
                                                    </table>
                                                </body>
                                                </html>
                                            ` })// envia o e-mail para o cliente
                                                .then((resultSend) => {
                                                    if (resultSend.success) {
                                                        Email.insertLogEmail(knex, req.body)// insere o log na tabela de log_email
                                                            .then((resultInsert) => {
                                                                if (resultInsert.success) {
                                                                    return res.status(200).send('Rotina de e-mail executada com sucesso.');
                                                                } else {
                                                                    // return res.status(500).send('Falha ao executar rotina de e-mail. ', resultInsert.error);
                                                                    return res.status(500).send('Falha ao executar rotina de e-mail. ');
                                                                }
                                                            })
                                                            .catch((error) => {
                                                                return res.status(500).send({ errors: [error] });
                                                            }, next)
                                                    }
                                                })
                                                .catch((error) => {
                                                    return res.status(500).send({ errors: [error] });
                                                }, next)

                                            return res.status(200).send('Salvo com sucesso!');

                                        } else
                                            return res.status(500).send({ errors: ['Registro Gestor com Erro.'] });
                                    })
                                    .catch(function (error) {
                                        console.log(`[ERRO GESTOR] => ${error}`);
                                        return res.status(500).send({ errors: ['Registro Gestor com Erro.'] });
                                    }, next);
                            }
                        })
                        .catch(function (error) {
                            return res.status(500).send({ errors: [error.sqlMessage] });
                        }, next)
                }
            }, next)
        }, next);
    });

    route.put('/usuarios/:id', (req, res, next) => {

        const id = req.params.id;
        const name = req.body.nome || '';
        //const email = req.body.usuario || '';
        const ativo = req.body.x_ativo || 1;

        if ((parseInt(req.body.tipo) === 2) && (!req.body.clientes.length)) {
            return res.status(500).send({ errors: ['Não é possível salvar um usuário do tipo "Cliente", sem nenhum cliente relacionado.'] })
        }

        let permissaoList = req.body.permissoes.map(field => ({
            cd_tela: parseInt(field.cd_tela),
            cd_usuario: parseInt(id),
            x_permissao: parseInt(field.x_permissao)
        }));

        delete req.body.permissoes;

        knexCli(req).then((knex) => {
            knex('usuario')
                .where('id', id)
                .update({ nome: name, x_ativo: ativo, grupo_idgrupo: req.body.grupo_idgrupo, tipo: req.body.tipo })
                .then(async (dados) => {

                    if (!dados) {
                        return res.status(500).send(new errs.BadRequestError('nada foi encontrado'))
                    }

                    if (req.body.clientes.length) {
                        let cliente = [];

                        for (key in req.body.clientes) {
                            cliente.push({
                                usuario_id: id,
                                cliente_id: req.body.clientes[key].cliente_id
                            })
                        };

                        await knex('usuario_cliente')
                            .insert(cliente)
                            .onConflict(['usuario_id', 'cliente_id'])
                            .ignore()
                            .then((dadosAux) => {
                                // return res.status(200).send('Evento cliente cadastrado com sucesso');
                            })
                            .catch(function (error) {
                                // return res.status(500).send({ errors: [error.sqlMessage] });
                            });
                    }

                    await knex.transaction(async function (trx) {
                        for (const key in permissaoList) {
                            const permissao = permissaoList[key];
                            let sqlInsertUpdate = `insert into tela_permissao (cd_usuario, cd_tela, x_permissao) 
                                                   values(${permissao.cd_usuario}, ${permissao.cd_tela}, ${permissao.x_permissao}) on duplicate key update x_permissao = ${permissao.x_permissao}`;
                            await trx.raw(sqlInsertUpdate);
                        }
                    });

                    return res.status(200).send('Alterado com sucesso!');
                })
                .catch(function (error) {
                    return res.status(500).send({ errors: [(error.sqlMessage) ? error.sqlMessage : error] });
                }, next)
        }, next);
    });

    route.delete('/usuarios/:id', (req, res, next) => {
        const id = req.params.id;


        knexCli(req).then(async (knex) => {
            let deleteGestor = await deleteUser(knex, id);

            if (deleteGestor) {
                knex('usuario')
                    .where('id', id)
                    .delete()
                    .then(async (dados) => {
                        if (!dados) {
                            return res.status(500).send(new errs.BadRequestError('nada foi encontrado'))
                        }

                        return res.status(200).send('Dados excluídos');
                    })
                    .catch(function (error) {
                        if ((error.sqlMessage) && (error.sqlMessage.indexOf('FOREIGN KEY') > 0)) {
                            return res.status(500).send({ errors: ['Esse usuário tem movimentação e não pode ser excluído.'] });
                        }
                        return res.status(500).send({ errors: [error.sqlMessage] });
                    }, next)
            }
            else {
                return res.status(500).send(new errs.BadRequestError('Erro ao excluiro do banco principal'));
            }
        }, next)
    });


    route.delete('/usuarios/clientes/:cliente_id/:usuario_id', (req, res, next) => {

        const cliente_id = req.params.cliente_id;
        const usuario_id = req.params.usuario_id;

        knexCli(req).then((knex) => {
            knex('usuario_cliente')
                .where('cliente_id', cliente_id)
                .andWhere('usuario_id', usuario_id)
                .delete()
                .then((dados) => {
                    return res.status(200).send('Dados excluídos');
                })
                .catch(function (error) {
                    return res.status(500).send({ errors: ['Existe(m) lançamento(s) vinculado(s) nesse evento'] });
                }, next)
        }, next)
    });



    route.put('/usuarios/senha/alterar', (req, res, next) => {

        if (bcrypt.compareSync(req.body.senha_atual, req.decoded.senha_hash)) {
            let strUpdate = 'update usuario set senha_hash = ? where id = ? and usuario = ?';
            const salt = bcrypt.genSaltSync();
            const passwordHash = bcrypt.hashSync(req.body.senha_nova, salt);

            knex.raw(strUpdate, [passwordHash, req.decoded.id, req.decoded.usuario])
                .then((dados) => {
                    if (!dados) {
                        return res.status(500).send({ errors: ['Senha incorreta'] });
                    }
                    return res.status(200).send('Alterado com sucesso!');
                })
                .catch(function (error) {
                    return res.status(500).send({ errors: [error] });
                }, next)
        } else {
            return res.status(500).send({ errors: ['Senha atual incorreta'] });
        }
    });

    route.get('/usuarios/telas/:id', (req, res, next) => {

        const id = req.params.id;

        const sqlCommand = `select t.cd_tela
                                  ,t.ds_nome
                                  ,t.ds_descricao
                                  ,t.sub_menu_pai
                                  ,t.sub_menu
                                  ,ifnull(tp.x_permissao, 0) as x_permissao
                              from tela t
                              left join tela_permissao tp on tp.cd_tela = t.cd_tela
                                                             and tp.cd_usuario = ?
                             order by t.nr_ordem`;

        knexCli(req).then((knex) => {
            knex.raw(sqlCommand, [id])
                .then((dados) => {
                    return res.send(dados[0]);
                })
                .catch(function (error) {
                    return res.status(500).send({ errors: [error.sqlMessage] });
                }, next);
        }, next);
    });
}