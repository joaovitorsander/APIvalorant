const express = require('express')
const app = express()
const port = 3000


app.use(express.json())
app.get('/', (req, res) => {res.send("Hello World!");})

require('./routes')(app)
require('./services/swagger')

app.use('v1/docs', express.static('src/views'))
app.use('/docs/swagger.yaml', express.static('src/docs/swagger.yaml'))

app.listen(port, () => {
    console.log(`Aplicação rodando na porta ${port}`)
})