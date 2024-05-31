const express = require('express')
const auth = require('./auth')

module.exports = function (server) {    
    const protectedApi = express.Router();    
    
    server.use('/api', protectedApi)

    protectedApi.use(auth);

    const Dashboard         = require('../api/dashboard/dashboardService')(protectedApi);
    const Configuracao      = require('../api/configuracao/configuracaoService')(protectedApi);
    const Tag               = require('../api/tag/tagService')(protectedApi);
    const Lead              = require('../api/lead/leadService')(protectedApi);
    const Email             = require('../api/email/emailService')(protectedApi);
    const DestinatarioEmail = require('../api/destinatario_email/destinatarioEmailService')(protectedApi);
    const LogDestinatarioEmail = require('../api/log_destinatario_email/logDestinatarioEmailService')(protectedApi);

    const openApi = express.Router();
    server.use('/germail', openApi);
    
    const AuthService = require('../api/user/authService');
    openApi.post('/login', AuthService.login);
    openApi.post('/validateToken', AuthService.validateToken);

    const TrackingEmailService = require('../api/email/trackingEmailService');
    openApi.get('/abriu-email', TrackingEmailService.gravaAbriuEmail);
}