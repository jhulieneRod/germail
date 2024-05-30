const knex = require('../../config/database');
// const crypto = require('crypto');
// const hash = crypto.createHash('sha1');

module.exports.insertUser = async function insertUser(usuario) {

    let result = false;
    delete usuario.tipo;
    delete usuario.data_cadastro;
    delete usuario.usuario_cadastro_id;
    delete usuario.funcionario_id;

    await knex('usuario')
        .insert(usuario)
        .then((dados) => {
            if (dados) {
                result = true;
            }
        })
        .catch(function (error) {
            console.log(`[ERRO GESTOR] => ${error}`);
            result = false;
        })

    return result;
}

module.exports.updateUser = async function updateUser(usuario) {

    let result = false;
    const ativo = usuario.x_ativo || 1;

    await knex('usuario')
        .where('empresa_id', usuario.empresa_id)
        .andWhere('usuario', usuario.usuario)
        .update({
            nome: usuario.nome,
            tipo: usuario.tipo,
            senha: usuario.senha,
            x_ativo: ativo
        })        
        .then((dados) => {
            if (!dados) {
                console.log(`[ERRO GESTOR] => nenhum registro encontrato`);
                result = false;
            }
            result = true;
        })
        .catch(function (error) {
            console.log(`[ERRO GESTOR] => ${error}`);
            result = false;
        });

    return result;
}

module.exports.deleteUser = async function deleteUser(knexCli, id) {

    let result = false;

    let sqlCommand = 'select usuario, senha_hash from usuario where id = ?'

    await knexCli.raw(sqlCommand, [id])
        .then(async (dados) => {
            usuario = dados[0][0].usuario;
            senha_hash = dados[0][0].senha_hash;

            await knex('usuario')
                .where('usuario', usuario)
                .andWhere('senha_hash', senha_hash)
                .delete()
                .then((dados) => {
                    if (dados) {
                        result = true;
                    }
                })
                .catch(function (error) {
                    console.log(`[ERRO GESTOR DELETE] => ${error}`);
                    result = false;
                })
        })
        .catch(function (error) {
            console.log(`[ERRO GESTOR - deleteUser] => ${error}`);
        });

    return result;
}

module.exports.getIdUser = async function insertUser(knexCli, usuario) {

    let result = 0;
    let sqlCommand = 'select id from usuario where usuario = ?'

    await knexCli.raw(sqlCommand, [usuario])
        .then((dados) => {
            result = dados[0][0].id;
        })
        .catch(function (error) {

        });

    return result;
}

module.exports.getTipoUser = async function insertUser(knexCli, usuario) {

    let result = 0;
    let sqlCommand = 'select tipo from usuario where usuario = ?'

    await knexCli.raw(sqlCommand, [usuario])
        .then((dados) => {
            result = dados[0][0].tipo;
        })
        .catch(function (error) {

        });

    return result;
}