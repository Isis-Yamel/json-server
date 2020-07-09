const jwt = require('../security/jwt');
const delay = require('delay');

module.exports = (userStorage) => {
    return function (req, res) {
        let user = req.body;
        delay(1000).then(() => {
            if(userStorage.registerUser(user)) {
                res.status(201).json('User signed in successfully');
            } else {
                res.status(401).send('User not signed in');
                res.send();
            }
        })
    };
};
