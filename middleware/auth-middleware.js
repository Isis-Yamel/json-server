const jwt = require('../security/jwt')
const delay = require('delay');

module.exports = (req, res, next) => {
    delay(500).then(() => {
        if (req.method === 'GET' && (req.path == '/db' || req.path == '/users')
        || (req.method === 'POST' && req.path == '/users')) {
            next();
            return true;
        }
        if (isLoggedIn(req)) {
            next();
        } else {
            res.status(401).send('Not logged in');
        }
    });
};

function isLoggedIn(req) {
    const token = req.get('token');

    console.log('Token: ', token);
    let session = jwt.verify(token);
    console.log('Session:\n', session);

    if (session) {
        req.usuario = session.email;
        return true;
    } else {
        return false;
    }
};