const express = require('express')
const { createTeam, getTeamById } = require('../controllers/Team')
const TeamRouter = express.Router()
const Auth = require('../middlewares/auth')

TeamRouter.post('/', Auth, createTeam)
TeamRouter.get('/:id', Auth, getTeamById)

module.exports = TeamRouter