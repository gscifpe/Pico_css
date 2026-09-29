const { DataTypes } = require('sequelize');
const sequelize = require('../config/bd');

const Filme = sequelize.define('Filme', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ano: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Filme;