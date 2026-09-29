const { DataTypes } = require('sequelize')
const sequelize = require('../config/bd')

const Livro = sequelize.define('Livro', {
    titulo: {
        type: DataTypes.STRING
    },
    anoPublicacao: {
        type: DataTypes.INTEGER
    }
})

module.exports = Livro