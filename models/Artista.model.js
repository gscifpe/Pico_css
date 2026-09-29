const { DataTypes } = require('sequelize');
const sequelize = require('../config/bd');

const Artista = sequelize.define('Artista', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    personagem: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Artista;