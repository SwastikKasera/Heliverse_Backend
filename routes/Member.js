const express = require('express')
const Auth = require('../middlewares/auth')
const { getAllMember, getMemberById, createMember, updateMember, deleteMember, searchMembers, filterMembers } = require('../controllers/Member')
const MemberRouter = express.Router()

MemberRouter.get('/', Auth, getAllMember)
MemberRouter.get('/:id', Auth, getMemberById)
MemberRouter.post('/', Auth, createMember)
MemberRouter.put('/:id', Auth, updateMember)
MemberRouter.delete('/:id', Auth, deleteMember)
MemberRouter.post('/search', Auth, searchMembers)
MemberRouter.post('/filter', Auth, filterMembers)

module.exports = MemberRouter