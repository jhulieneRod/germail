const knex = require('../../config/database');
const format = require('date-fns');

const gravaAbriuEmail = (req, res, next) => {
    let dados = JSON.parse(atob(req.query.dados));
    let datahora = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    let values = {...dados, datahora, acao: 2}

    knex('log_destinatario_email')
    .insert(values)
    .then((dados) => {
        console.log('Log Incluido: ', values);
    })
    .catch(function (error) {
        console.log(error);
    });

    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': 43
    });
    const img = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/eq2dZQAAAAASUVORK5CYII=',
    'base64'
    );
    res.end(img);
};

module.exports = { gravaAbriuEmail };