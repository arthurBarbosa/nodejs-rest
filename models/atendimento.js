const moment = require('moment')
const connection = require('../infrastructure/connection')

class Atendimento {
    adiciona(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const dataValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteValido = atendimento.cliente.length >= 3;

        const validacoes = [
            {
                nome: 'data',
                valido: dataValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteValido,
                mensagem: 'Nome do cliente deve ter pelo menos 5 caracteres'
            }
        ]

        const errors = validacoes.filter(campo => !campo.valido)
        const existemErros = errors.length

        if (existemErros) {
            res.status(400).json(errors)

        } else {
            const atendimentoData = { ...atendimento, dataCriacao, data }

            const sql = 'INSERT INTO Atendimentos SET ?'

            connection.query(sql, atendimentoData, (erro, result) => {
                if (erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(atendimento)
                }
            })
        }

    }

    lista(res) {
        const sql = 'SELECT * FROM Atendimentos'

        connection.query(sql, (erro, results) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(results)
            }
        })
    }

    findById(id, res) {
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`

        connection.query(sql, (erro, results) => {
            const atendimento = results[0]
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(atendimento)
            }
        })
    }

    update(id, values, res) {
        if (values.data) {
            values.data = moment(values.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }

        const sql = `UPDATE Atendimentos SET ? WHERE id=?`

        connection.query(sql, [values, id], (erro, results) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...values, id})
            }
        })
    }

    deleteById(id, res) {
        const sql = `DELETE FROM Atendimentos WHERE id=?`

        connection.query(sql, id, (erro, results) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json("Deletado com sucesso.")
            }
        })
    }
}

module.exports = new Atendimento