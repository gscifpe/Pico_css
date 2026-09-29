const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

app.engine('handlebars', exphbs.engine({defaultLayout: false}) )
app.set('view engine', 'handlebars')

const sequelize = require('./config/bd')
const { Pessoa, Passaporte } = require('./models/index.js')

app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.get('/pessoas', async (req,res) => {
  const pessoas = await Pessoa.findAll({
        include: [{ model: Passaporte, as: 'passaporte'}]
    })
  res.render('listarPessoas', {
    pessoas: pessoas.map(pessoa => pessoa.toJSON())
  })
})

app.get('/pessoas/cadastrar', (req,res) => {
    res.render('cadastroPessoa')
})

app.post('/pessoas/cadastrar', async (req, res) => {
    const nome = req.body.nome
    await Pessoa.create({nome: nome})
    res.redirect('/pessoas')
})

app.get('/pessoas/:id/passaporte/cadastrar', async (req, res) => {
    const id = req.params.id
    const pessoa = await Pessoa.findByPk(id, {raw:true})
    res.render('cadastroPassaporte', { pessoa })
})

app.post('/pessoas/:id/passaporte/cadastrar', async (req, res) => {
    const id = req.params.id
    const numero = req.body.numero
    const validade = req.body.validade
    
    const pessoa = await Pessoa.findByPk(id)

    await pessoa.createPassaporte({
        numero: numero,
        validade: validade
    })

    res.redirect('/pessoas')
})

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