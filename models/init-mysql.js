const config = require("../config.json")
const { Sequelize, DataTypes, Op, fn, col } = require("sequelize")
const sequelize = new Sequelize(config.database.mysql.dbName, config.database.mysql.dbUser, config.database.mysql.dbPassword, config.database.mysql)

const _user = require("../models/user")

function initMysql() {
    const user = _user(sequelize, DataTypes)

    //Example of association
    // user.hasMany(wallet, { foreignKey: 'user_id' });
    // wallet.belongsTo(user, { foreignKey: 'user_id' });

    return {
        models: {
            user
        },
        sequelize,
        Op,
        fn,
        col,
        SQF: Sequelize
    }
}

module.exports = initMysql
module.exports.initModels = initMysql
module.exports.default = initMysql