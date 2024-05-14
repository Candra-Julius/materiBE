const express = require('express')
const route = express.Router()
const controller = require('../controller')
const middlewere = require('../middlewere')

route.get('/panggilNama/:lastName', controller.panggilNama)
route.post('/registrasi', middlewere.validasiPassword, controller.registrasi)

module.exports = route