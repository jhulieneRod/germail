const express = require('express');
const path = require('path');
const app = express();

// Servir arquivos estáticos do diretório 'build'
app.use(express.static(path.join(__dirname, 'build')));

// Rota para servir a página inicial estática
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

// Rota para servir a aplicação React em todas as outras rotas
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
