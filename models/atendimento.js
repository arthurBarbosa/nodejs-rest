const connection = require('../infrastructure/connection')
const moment = require('moment')

class Atendimento {
    adiciona(atendimento){
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        const atendimentoData = {...atendimento, dataCriacao, data}
        const sql = 'INSERT INTO Atendimentos SET ?'

        connection.query(sql, atendimentoData, (erro, res) => {
            if(erro){
                console.log(erro)
            } else {
                console.log(res)
            }
        })
    }
}

module.exports = new Atendimento