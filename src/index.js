const express = require('express')
const app = express()
app.use(express.json())
require('./services/swagger')
const port = 3000

app.get('/', (req, res) => {res.send("Hello World!");})

require('./routes')(app)

app.listen(port, () => {
    console.log(`Aplicação rodando na porta ${port}`)
})