const sequelize = require('../config/bd')
const Autor = require('./Autor.model')
const Livro = require('./Livro.model')

Autor.hasMany(Livro, {
    foreignKey: 'autorId',
    as: 'livros'
})

Livro.belongsTo(Autor, {
    foreignKey: 'autorId',
    as: 'autor'
})

module.exports = {
    Autor,
    Livro
}