const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs.engine({defaultLayout: false}) )
app.set('view engine', 'handlebars')

const sequelize = require('./config/bd')
const { Autor, Livro } = require('./models/index.js')

app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.get('/autor', async (req, res) => {
  const autor = await Autor.findAll({ raw: true })
    res.render('autor', { autor })
})

app.get('/livro', async (req, res) => {
    const livro = await Livro.findAll({ raw: true })
    res.render('livro', { livro})
})

app.get('/autor/cadastrar', (req,res) => {
    res.render('cadastrarAutor')
})

app.post('/autor/cadastrar', async (req,res) => {
    const nome = req.body.nome
    await Autor.create({nome:nome})
    res.redirect('/autor')
})

app.get('/livro/cadastrar', async (req,res) => {
    const autor = await Autor.findAll({raw:true})
    res.render('cadastrarLivro', { autor })
})

app.post('/livro/cadastrar', async (req,res) => {
    const titulo = req.body.titulo
    const anoPublicacao = req.body.anoPublicacao
    const autorId = req.body.autorId

    await Livro.create({
        titulo: titulo,
        anoPublicacao: anoPublicacao,
        autorId: autorId
    })

    res.redirect('/livro')
})

app.get('/livro/:id', async (req, res) => {
  const id = req.params.id;

  const livro = await Livro.findByPk(id, {
    include: [{ model: Autor, as: 'autor' }]
  });

  res.render('detalharLivro', { livro: livro.toJSON() });
});

app.get('/autor/:id', async (req, res) => {
  const id = req.params.id;

  const autor = await Autor.findByPk(id, {
    include: [{ model: Livro, as: 'livros' }]
  });

  res.render('detalharAutor', { autor: autor.toJSON() });
});


async function conectarBD() {
  try {
    await sequelize.sync();
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  } catch (erro) {
    console.error('Erro ao conectar:', erro);
  }
}

conectarBD();

app.listen(3000, () => {

  console.log('Servidor executando em http://localhost:3000');

});