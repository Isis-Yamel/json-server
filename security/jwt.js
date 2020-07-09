/** librería de encriptado */
const jwt = require('jsonwebtoken')

const secret = 'Globant/training'

exports.tokenGeneration = (user) => jwt.sign(user, secret, { expiresIn: '1h' })

exports.verify = (token) => {
    try { return jwt.verify(token, secret) }
    catch(err){ return false }
};