const express = require('express')
const route = express.Router()
const controller = require('../controller')
const middlewere = require('../middlewere')

route.get('/panggilNama/:lastName', controller.panggilNama)
route.post('/registrasi', middlewere.validasiPassword, controller.registrasi)
route.get('/user/:id_user', controller.getUser);

module.exports = route