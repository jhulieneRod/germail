const express = require('express')
const auth = require('./auth')

module.exports = function (server) {    
    const protectedApi = express.Router();    
    
    server.use('/api', protectedApi)

    protectedApi.use(auth);

    const Configuracao      = require('../api/configuracao/configuracaoService')(protectedApi);
    const Tag               = require('../api/tag/tagService')(protectedApi);
    const Lead              = require('../api/lead/leadService')(protectedApi);
    const Email             = require('../api/email/emailService')(protectedApi);
    const DestinatarioEmail = require('../api/destinatario_email/destinatarioEmailService')(protectedApi);

    const openApi = express.Router();
    server.use('/germail', openApi);
    
    const AuthService = require('../api/user/authService');
    openApi.post('/login', AuthService.login);
    openApi.post('/validateToken', AuthService.validateToken);
    // openApi.post('/esqueciSenha', AuthService.esqueciSenha);
}