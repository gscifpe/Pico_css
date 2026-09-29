const express = require('express');
const { engine } = require('express-handlebars');

const sequelize = require('./config/bd');
const { Filme, Artista, Diretor, FichaTecnica } = require('./models');

const app = express();

app.engine('handlebars', engine({
    defaultLayout: false
}));

app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('home');
});

/* FILMES */

app.get('/filmes', async (req, res) => {
    const filmes = await Filme.findAll({
        include: [
            { model: Diretor, as: 'diretor' }
        ]
    });

    res.render('filmes', { filmes });
});

app.get('/filmes/cadastrar', async (req, res) => {
    const diretores = await Diretor.findAll();
    res.render('cadastroFilme', { diretores });
});

app.post('/filmes/cadastrar', async (req, res) => {
    const { titulo, ano, diretorId } = req.body;

    await Filme.create({
        titulo,
        ano,
        diretorId
    });

    res.redirect('/filmes');
});

app.get('/filmes/:id', async (req, res) => {
    const filme = await Filme.findByPk(req.params.id, {
        include: [
            { model: Diretor, as: 'diretor' },
            { model: Artista, as: 'artistas' },
            { model: FichaTecnica, as: 'fichaTecnica' }
        ]
    });

    res.render('detalheFilme', { filme });
});

/* ARTISTAS */

app.get('/artistas', async (req, res) => {
    const artistas = await Artista.findAll({
        include: [
            { model: Filme, as: 'filme' }
        ]
    });

    res.render('artistas', { artistas });
});

app.get('/artistas/cadastrar', async (req, res) => {
    const filmes = await Filme.findAll();
    res.render('cadastroArtista', { filmes });
});

app.post('/artistas/cadastrar', async (req, res) => {
    const { nome, personagem, filmeId } = req.body;

    await Artista.create({
        nome,
        personagem,
        filmeId
    });

    res.redirect('/artistas');
});

app.get('/artistas/:id', async (req, res) => {
    const artista = await Artista.findByPk(req.params.id, {
        include: [
            { model: Filme, as: 'filme' }
        ]
    });

    res.render('detalheArtista', { artista });
});

/* DIRETORES */

app.get('/diretores', async (req, res) => {
    const diretores = await Diretor.findAll();
    res.render('diretores', { diretores });
});

app.get('/diretores/cadastrar', (req, res) => {
    res.render('cadastroDiretor');
});

app.post('/diretores/cadastrar', async (req, res) => {
    const { nome } = req.body;

    await Diretor.create({
        nome
    });

    res.redirect('/diretores');
});

app.get('/diretores/:id', async (req, res) => {
    const diretor = await Diretor.findByPk(req.params.id, {
        include: [
            { model: Filme, as: 'filmes' }
        ]
    });

    res.render('detalheDiretor', { diretor });
});

/* FICHAS TÉCNICAS */

app.get('/fichas', async (req, res) => {
    const fichas = await FichaTecnica.findAll({
        include: [
            { model: Filme, as: 'filme' }
        ]
    });

    res.render('fichas', { fichas });
});

app.get('/fichas/cadastrar', async (req, res) => {
    const filmes = await Filme.findAll();
    res.render('cadastroFicha', { filmes });
});

app.post('/fichas/cadastrar', async (req, res) => {
    const { duracao, genero, classificacao, filmeId } = req.body;

    await FichaTecnica.create({
        duracao,
        genero,
        classificacao,
        filmeId
    });

    res.redirect('/fichas');
});

app.get('/fichas/:id', async (req, res) => {
    const ficha = await FichaTecnica.findByPk(req.params.id, {
        include: [
            { model: Filme, as: 'filme' }
        ]
    });

    res.render('detalheFicha', { ficha });
});

sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Servidor rodando em http://localhost:3000');
    });
});