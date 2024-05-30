module.exports = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*, 77.37.69.246, previasite.com, www.previasite.com');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.set('X-Powered-By', 'PHP/7.1.7');// fake, é utilizado para não revelar ao cliente qual a linguagem do servidor
    next()
}