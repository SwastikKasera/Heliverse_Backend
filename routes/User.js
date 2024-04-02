const express = require('express')
const Register = require('../controllers/Register')
const Login = require('../controllers/Login')
const Router = express.Router()

Router.post('/register', Register)
Router.post('/login', Login)

module.exports = Router