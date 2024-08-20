const passport = require("passport");
const jwt = require("./jwt_helper");
const config = require("../config.json")
const crypto = require('crypto');

function authenticateJWT(req, res, next) {
    return passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(403).json({
                "status": 403, "error": true, "msg": (info ? (info.message ? info.message : "Something went wrong") : "Something went wrong"), "data": {}
            })
        }
        req.user = user
        next()
    })(req, res, next)
}

function cryptographyHash(message, fe = false) { //fe as in front end
    const sign = crypto
        .createHmac('sha256', fe === true ? config.crypto.fe_secret : config.crypto.secret)
        .update(message)
        .digest('hex');

    return sign;
};

function cryptographyVerify(message, sign, fe = false) { //fe as in front end //re
    const expected_sign = crypto
        .createHmac('sha256', fe === true ? config.crypto.fe_secret : config.crypto.secret)
        .update(message)
        .digest('hex');

    return expected_sign === sign;
};

module.exports = {
    authenticateJWT,
    cryptographyHash,
    cryptographyVerify
}