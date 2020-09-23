

module.exports = app => {
    app.get('/atendimentos', (req, res) => res.send('Servidor rodando tudo certo'))
    app.post('/atendimentos', (req, res) => {
        console.log(req.body)
        res.send('Metodo post')
    })
}