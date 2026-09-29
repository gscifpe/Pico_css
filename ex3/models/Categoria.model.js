const { DataTypes } = require('sequelize')
const sequelize = require('../config/bd')

const Categoria = sequelize.define('Categoria', {
    nome: {
        type: DataTypes.STRING
    }
})

module.exports = Categoria