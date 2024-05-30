const port = 14105
const express = require('express');
const server = express();
const allowCors = require('./cors');
const helmet = require('helmet');

server.use(express.urlencoded({ limit: '50mb', extended: true }))
server.use(express.json({ limit: '50mb' }))
server.use(allowCors);
server.use(helmet());// protege o backend contra ataques feito através do cabeçalho 

/******* USADO SÓ OFF-LINE ********/
server.listen(port, function () {
    console.log(`[SSL Auto] Api da 'GerMail' rodando na porta ${port}.`)
});

module.exports = server