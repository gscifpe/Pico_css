const sequelize = require('sequelize')
const Livro = require('./Livro.model')
const Categoria = require('./Categoria.model')

Livro.belongsToMany(Categoria, {
    through: 'LivroCategoria',
    foreignKey: 'livroId',
    as: 'categorias'
})

Categoria.belongsToMany(Livro, {
    through: 'LivroCategoria',
    foreignKey: 'categoriaId',
    as: 'livros'
})

module.exports = {
    Livro,
    Categoria
}