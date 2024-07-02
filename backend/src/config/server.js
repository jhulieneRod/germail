const port = 14105
const express = require('express');
const server = express();
const allowCors = require('./cors');
const helmet = require('helmet');
const fs = require('fs');
const https = require('https');

server.use(express.urlencoded({ limit: '50mb', extended: true }))
server.use(express.json({ limit: '50mb' }))
server.use(allowCors);
server.use(helmet());// protege o backend contra ataques feito através do cabeçalho 

https.createServer({
    cert: fs.readFileSync('src/ssl/ssl.cert'),
    key: fs.readFileSync('src/ssl/ssl.key')
}, server).listen(port, function () {
    console.log(`[SSL Auto] Api da 'GerMail' rodando na porta ${port}.`)
})

module.exports = server