const { DataTypes } = require('sequelize');
const sequelize = require('../config/bd');

const Diretor = sequelize.define('Diretor', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Diretor;