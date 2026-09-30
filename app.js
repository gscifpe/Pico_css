const express = require('express');
const { engine } = require('express-handlebars');
const  sequelize = require('./config/bd')


const { Filme, Diretor, Artista, FichaTecnica } = require('./models');

const app = express();

app.engine('handlebars', engine({ defaultLayout: false }));
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const plano = (dados) => dados.map((d) => d.get({ plain: true }));


app.get('/', (req, res) => {
    res.render('home');
});

app.get('/filmes', async (req, res) => {
    const filmes = await Filme.findAll({
        include: [{ model: Diretor, as: 'diretor' }]
    });
    res.render('filmes', { filmes: plano(filmes) });
});

app.get('/filmes/cadastrar', async (req, res) => {
    const diretores = await Diretor.findAll();
    res.render('cadastroFilme', { diretores: plano(diretores) });
});

app.post('/filmes/cadastrar', async (req, res) => {
    try {
        await Filme.create({
            titulo: req.body.titulo,
            ano: req.body.ano,
            diretorId: req.body.diretorId || null
        });
        res.redirect('/filmes');
    } catch (erro) {
        console.error('Erro ao cadastrar filme:', erro);
        res.status(500).send('Erro ao cadastrar filme: ' + erro.message);
    }
});

app.get('/filmes/:id', async (req, res) => {
    const filme = await Filme.findByPk(req.params.id, {
        include: [
            { model: Diretor, as: 'diretor' },
            { model: Artista, as: 'artistas' },
            { model: FichaTecnica, as: 'fichaTecnica' }
        ]
    });
    if (!filme) return res.status(404).send('Filme não encontrado');
    res.render('detalheFilme', { filme: filme.get({ plain: true }) });
});


app.get('/artistas', async (req, res) => {
    const artistas = await Artista.findAll({
        include: [{ model: Filme, as: 'filme' }]
    });
    res.render('artistas', { artistas: plano(artistas) });
});

app.get('/artistas/cadastrar', async (req, res) => {
    const filmes = await Filme.findAll();
    res.render('cadastroArtista', { filmes: plano(filmes) });
});

app.post('/artistas/cadastrar', async (req, res) => {
    try {
        await Artista.create({
            nome: req.body.nome,
            personagem: req.body.personagem,
            filmeId: req.body.filmeId || null
        });
        res.redirect('/artistas');
    } catch (erro) {
        console.error('Erro ao cadastrar artista:', erro);
        res.status(500).send('Erro ao cadastrar artista: ' + erro.message);
    }
});

app.get('/artistas/:id', async (req, res) => {
    const artista = await Artista.findByPk(req.params.id, {
        include: [{ model: Filme, as: 'filme' }]
    });
    if (!artista) return res.status(404).send('Artista não encontrado');
    res.render('detalheArtista', { artista: artista.get({ plain: true }) });
});


app.get('/diretores', async (req, res) => {
    const diretores = await Diretor.findAll();
    res.render('diretores', { diretores: plano(diretores) });
});

app.get('/diretores/cadastrar', (req, res) => {
    res.render('cadastroDiretor');
});

app.post('/diretores/cadastrar', async (req, res) => {
    try {
        await Diretor.create({ nome: req.body.nome });
        res.redirect('/diretores');
    } catch (erro) {
        console.error('Erro ao cadastrar diretor:', erro);
        res.status(500).send('Erro ao cadastrar diretor: ' + erro.message);
    }
});

app.get('/diretores/:id', async (req, res) => {
    const diretor = await Diretor.findByPk(req.params.id, {
        include: [{ model: Filme, as: 'filmes' }]
    });
    if (!diretor) return res.status(404).send('Diretor não encontrado');
    res.render('detalheDiretor', { diretor: diretor.get({ plain: true }) });
});


app.get('/fichas', async (req, res) => {
    const fichas = await FichaTecnica.findAll({
        include: [{ model: Filme, as: 'filme' }]
    });
    res.render('fichas', { fichas: plano(fichas) });
});

app.get('/fichas/cadastrar', async (req, res) => {
    const filmes = await Filme.findAll();
    res.render('cadastroFicha', { filmes: plano(filmes) });
});

app.post('/fichas/cadastrar', async (req, res) => {
    try {
        await FichaTecnica.create({
            duracao: req.body.duracao,
            genero: req.body.genero,
            classificacao: req.body.classificacao,
            filmeId: req.body.filmeId || null
        });
        res.redirect('/fichas');
    } catch (erro) {
        console.error('Erro ao cadastrar ficha:', erro);
        res.status(500).send('Erro ao cadastrar ficha: ' + erro.message);
    }
});

app.get('/fichas/:id', async (req, res) => {
    const ficha = await FichaTecnica.findByPk(req.params.id, {
        include: [{ model: Filme, as: 'filme' }]
    });
    if (!ficha) return res.status(404).send('Ficha não encontrada');
    res.render('detalheFicha', { ficha: ficha.get({ plain: true }) });
});

async function inicializarBanco() {
  try {
    
    await sequelize.sync({ alter: true });
    console.log('Banco de dados SQLite sincronizado com sucesso.');
    
    
  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error);
  }
}

inicializarBanco();

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});