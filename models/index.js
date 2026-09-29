const Filme = require('./Filme.model');
const Artista = require('./Artista.model');
const Diretor = require('./Diretor.model');
const FichaTecnica = require('./FichaTecnica.model');

Diretor.hasMany(Filme, {
    foreignKey: 'diretorId',
    as: 'filmes'
});

Filme.belongsTo(Diretor, {
    foreignKey: 'diretorId',
    as: 'diretor'
});

Filme.hasMany(Artista, {
    foreignKey: 'filmeId',
    as: 'artistas'
});

Artista.belongsTo(Filme, {
    foreignKey: 'filmeId',
    as: 'filme'
});

Filme.hasOne(FichaTecnica, {
    foreignKey: 'filmeId',
    as: 'fichaTecnica'
});

FichaTecnica.belongsTo(Filme, {
    foreignKey: 'filmeId',
    as: 'filme'
});

module.exports = {
    Filme,
    Artista,
    Diretor,
    FichaTecnica
};