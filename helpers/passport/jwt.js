const { Strategy, ExtractJwt } = require('passport-jwt');
const initMysql = require("../../models/init-mysql");
const { models } = initMysql()
const config = require("../../config.json");
const { loginHash } = require("../util_helper");
// const jwt = require("../jwt_helper");

module.exports = {
    "name": "jwt",
    "strategy": new Strategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.jwt_secret + "LOGIN"
    }, async function (payload, done) {
        try {
            const user = await models.user.findOne({ where: { id: payload.id, is_delete: false } })
            if (user) {
                const hash = loginHash(user)
                if (hash !== payload.hash) {
                    return done(null, false, { message: 'Old token, please login again' })
                }
                // const verified_jwt = jwt.verify(user.jwt_token, "LOGIN");
                // if (verified_jwt.access_token !== payload.access_token) {
                //     return done(null, false, { message: 'Invalid acccess token, please login again' })
                // }
                return done(null, user);
            }
            return done(null, false, { message: 'User not valid/found.' });
        } catch (error) {
            return done(error, false, { message: 'Error while authenticating user.' });
        }
    })
}