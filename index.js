const yargs = require('yargs');
yargs.options({
    port: {
        alias: 'p',
        description: 'port',
        default: 8000
    },
    file: {
        alias: 'f',
        description: 'JSON File',
        default: './database/db.json'
    },
    authentication: {
        alias: 'a',
        description: 'Enable authenticaded routes',
        default: 'true'
    },
    delay: {
        alias: 'd',
        description: 'delay before response',
        default: '1500'
    }
});

console.log(yargs.argv);

const jsonServer = require('json-server');
const UserAuthenticator = require('./security/userAuthenticator');
const server = jsonServer.create();
const router = jsonServer.router(yargs.argv.file);
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser)

server.use(middlewares);

const userAuth = new UserAuthenticator();
server.post('/login', userAuth.login);

if (yargs.argv.authentication === 'true') {
    const authMiddleware = require('./middleware/auth-middleware');
    server.use(authMiddleware);
}

const delayMiddleware = require('./middleware/delay-middleware')(yargs.argv.delay);
server.use(delayMiddleware);

const errorMiddleware = require('./middleware/error-middleware');
server.use(errorMiddleware);

server.get('/verify', userAuth.verify);


server.use(router);
server.listen(yargs.argv.port, () => {
    console.log(`JSON Server is running on port ${yargs.argv.port} http://localhost:${yargs.argv.port}`)
});