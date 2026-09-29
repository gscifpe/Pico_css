const Pessoa = require('./Pessoa.model')
const Passaporte = require('./Passaporte.model')

Pessoa.hasOne(Passaporte, {
    foreignKey: 'pessoaId',
    as: 'passaporte'
})

Passaporte.belongsTo(Pessoa,{
    foreignKey: 'pessoaId',
    as: 'pessoa'
})

module.exports = {
    Pessoa,
    Passaporte
}