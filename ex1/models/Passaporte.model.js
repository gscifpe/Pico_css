const { DataTypes } = require('sequelize')
const sequelize = require('../config/bd')

const Passaporte = sequelize.define('Passaporte', {
    numero:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    validade:{
        type: DataTypes.DATE,
        allowNull: false
    }
})

module.exports = Passaporte