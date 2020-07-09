const delay = require('delay');

module.exports = (req, res, next) => {
    delay(500).then( () => {
        if(req.path === 'error') {
            res.status(400).send('Bad Request');
        } else {
            next();
        }
    });
};