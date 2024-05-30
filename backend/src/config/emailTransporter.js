const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    pool: true,// default => false
    host: 'server11.mailgrid.com.br',
    port: 587,
    secure: false,
    maxConnections : 20,// só funciona se o pool estiver true
    auth: {
        user: 'veloxdp@veloxdp.com.br',
        pass: 'jTIaBTinK8'
    }
    // tls: {
    //     ciphers: 'SSLv3'
    // }
});

module.exports = transporter;