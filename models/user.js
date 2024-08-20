module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        hash_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        group_tag: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        referral_user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        referral_code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        user_telegram_id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        is_premium: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        twitter_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        twitter_username: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        jwt_token: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.INTEGER
        },
        updated_at: {
            type: DataTypes.INTEGER
        },
        is_delete: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        sequelize,
        tableName: 'user',
        timestamps: false,
    })
}