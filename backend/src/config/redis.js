const session = require('express-session');
const redis = require('redis');
const RedisStore = require("connect-redis").default;
// Initialize client.
const redisClient = redis.createClient();
redisClient.connect().catch(console.error);

const sessionInit = (server) => {    

    // Initialize store.
    let redisStore = new RedisStore({
        client: redisClient,
        prefix: 'veloxdp:',
    });

    // Initialize session storage.
    server.use(
        session({
            name: 'velox',
            // store: redisStore,
            secret: '1234',
            // secret: 'gt-velox-2a-netdp',
            resave: false, // required: force lightweight session keep alive (touch)
            saveUninitialized: false, // recommended: only save session when data exists        
            // cookie: { secure: false, maxAge: 86400000 } // validade de 24horas 
            cookie: { secure: false }
        }),
    );    
}

module.exports = {sessionInit, redisClient}
