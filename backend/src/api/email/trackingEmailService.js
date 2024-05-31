
const gravaAbriuEmail = (req, res, next) => {
    let dados = JSON.parse(atob(req.query.dados));
    console.log('Email opened by:', dados);
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