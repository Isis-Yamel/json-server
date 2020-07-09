const delay = require('delay');

module.exports = function (req, res) {
    delay(1000).then(() => {
        res.status(201).json({
            msg: 'Verified',
            email: req.usuario
        });
    });
};
