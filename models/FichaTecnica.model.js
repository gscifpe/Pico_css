const { DataTypes } = require('sequelize');
const sequelize = require('../config/bd');

const FichaTecnica = sequelize.define('FichaTecnica', {
    duracao: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    genero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    classificacao: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = FichaTecnica;