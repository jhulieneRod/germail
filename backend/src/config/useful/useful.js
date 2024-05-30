const knex = require('../database');

module.exports.strFloat = (value) => {// converte string para um float válido, e conver um value pt-br para padrão do banco e do js
    let negativo = false;
    if (typeof value === "string") {
        if (value[0] === '-') {
            negativo = true;
            value = value.replace('-', '');
        }

        if (value.indexOf(',') >= 0)
            value = (value) ? parseFloat(('0' + value).toString().replace(/\./g, '').replace(',', '.')) : 0;
        else
            value = (value) ? parseFloat(('0' + value).toString()) : 0;
    }

    if (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(value))// valida float com decimal com erro tipo e+15 ou e-15
        return isNaN(value) ? 0 : ((negativo) ? (value === 0) ? 0 : value * -1 : value);

    return 0;
}

module.exports.getMaxId = async (tblName, fieldMax, strFilter) => {
    let maxId = 1;
    let sqlMax = `select max(${fieldMax}) as max_id
                        from ${tblName}
                    where ${strFilter}`;

    await knex.raw(sqlMax)
        .then((dados) => {
            maxId = (dados[0][0].max_id) ? parseInt(dados[0][0].max_id) + 1 : 1;
        })
        .catch(function (error) {
        });

    return maxId;
}

module.exports.calibraString = (texto, alinha, tipo, tamanho, negativo = 'N') => {
    let tipo_hora = ' ';
    if (tipo === '0') {
        if (texto < 0) {
            tipo_hora = '-';
        }
    }
    let result = texto.replace('-', '');
    texto = texto.replace('-', '');
    for (let i = 1; i <= (tamanho - texto.length); i++) {
        if (alinha === 'E') {
            result = result + tipo;
        } else {
            result = tipo + result;
        }
    }
    if (negativo === 'S') {
        result = tipo_hora + result;
    }
    return result;
}

module.exports.formatCompetenciaToData = (comp) => {
    return comp.substring(7, 3).concat('-').concat(comp.substring(0,2)).concat('-01')
}

