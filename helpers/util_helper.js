const crypto = require("crypto")
const Decimal = require('decimal.js');
const moment = require("moment/moment");

function getCurrentEpochTime() {
    // const unixEpoch = Math.floor(Date.now() / 1000);
    const unixEpoch = moment().utc().unix();
    return unixEpoch;
}

function loginHash(user) {
    const sha512 = crypto.createHash('sha3-512')
    sha512.update("!GRAFILAB! USER GAME START !GRAFILAB!")
    sha512.update(user.username.toString())
    sha512.update(user.user_telegram_id.toString())
    sha512.update(user.referral_code.toString())
    sha512.update(user.id.toString())
    return sha512.digest('hex')
}

const handleErrorMessageBot = async (ctx, error) => {
    const error_message =
        error.message || "Something went wrong, please contact support";
    console.log({
        user_id: ctx.from.id,
        error: error.message,
    });
    await ctx.reply(error_message, { parse_mode: "HTML" });
};

async function handleErrorMessageAPI(user_id, error) {
    const errorMessage =
        error.message || "Something went wrong, please try again.";
    console.log({
        user_id: user_id,
        error: error.message,
    });
    return errorMessage;
}

module.exports = {
    getCurrentEpochTime,
    loginHash,
    handleErrorMessageBot,
    handleErrorMessageAPI
}