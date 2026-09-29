const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs.engine({ defaultLayout: false }))
app.set('view engine', 'handlebars')

const sequelize = require('./config/bd')
const { Categoria, Livro } = require('./models/index.js')

app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.get('/categoria', async (req, res) => {
    const categoria = await Categoria.findAll({raw: true})
    res.render('categoria', { categoria})
})

app.get('/livro', async (req, res) => {
    const livro = await Livro.findAll({raw: true})
    res.render('livro', { livro })
})

app.get('/categoria/cadastrar', (req,res) => {
    res.render('cadastrarCategoria')
})

app.post('/categoria/cadastrar', async (req, res) => {
    const nome = req.body.nome
    await Categoria.create({nome: nome})
    res.redirect('/categoria')
})

app.get('/livro/cadastrar', async (req, res) => {
    const categoria = await Categoria.findAll({raw: true})
    res.render('cadastrarLivro', { categoria })
})

app.post('/livro/cadastrar', async (req, res) => {
    const titulo = req.body.titulo
    const anoPublicacao = req.body.anoPublicacao
    const categoria = req.body.categoria
    
    const livro = await Livro.create({
        titulo: titulo,
        anoPublicacao: anoPublicacao,

    })

    await livro.setCategorias(categoria) // Associa as categorias selecionadas ao livro

    res.redirect('/livro')
})

app.get('/livro/:id', async (req, res) => {
    const id = req.params.id
    const livro = await Livro.findByPk(id, {
        include: [{
            model: Categoria,
            as: 'categorias'
        }]
    })
    res.render('detalharLivro', { livro: livro.toJSON() })
})

app.get('/categoria/:id', async (req, res) => {
    const id = req.params.id
    const categoria = await Categoria.findByPk(id, {
        include: [{
            model: Livro,
            as: 'livros'
        }]
    })
    res.render('detalharCategoria', { categoria: categoria.toJSON() })
})

async function conectarBD() {
    try {
        await sequelize.sync()
        console.log('Conexão com o banco de dados estabelecida com sucesso!')
    } catch (erro) {
        console.error('Erro ao conectar:', erro)
    }
}

conectarBD()

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})