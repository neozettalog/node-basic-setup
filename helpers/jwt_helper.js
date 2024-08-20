const jwt = require('jsonwebtoken');
const config = require('../config.json')

module.exports = {
    sign: (payload, keyExtra = '') => {
        return jwt.sign(payload, config.jwt_secret + keyExtra, { algorithm: 'HS256' }, null);
    },
    verify: (payload, keyExtra = '') => {
        return jwt.verify(payload, config.jwt_secret + keyExtra, { algorithm: 'HS256' }, null);
    }
}