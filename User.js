const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db');

class User extends Model {}

User.init({
    username: {
        type: DataTypes.STRING
    },
    surname: {
        type: DataTypes.STRING
    },
    santafor: {
        type: DataTypes.STRING
    },
    info: {
        type: DataTypes.STRING
    },
    admin: {
        type: DataTypes.BOOLEAN
    }
}, {
    sequelize,
    modelName: 'user',
    timestamps: false
})

module.exports = User;