const Team = require("../models/Team")

const createTeam = async (req,res)=>{
    const {userId, teamMembers} = req.body
    try {
        if(teamMembers.length === 0){
            return res.status(400).json({
                msg:"Team must have atleast 1 member"
            })
        }
        const addedMemberInTeam = await Team.create({userId, teamMembers})
        if(!addedMemberInTeam){
            return res.status(400).json({
                msg:"Team cannot be created"
            })
        }
        return res.status(200).json({
            msg:"Team created success"
        })
    } catch (error) {
        return res.status(500).json({
            msg:"error in creating team"
        })
    }
}

const getTeamById = async (req,res)=>{
    const {id} = req.params
    const team = await Team.findOne({id})

    if(!team){
        return res.status(400).json({
            msg:"Team not found"
        })
    }
    return res.status(200).json({
        msg:"success"
    })
}

module.exports = {createTeam, getTeamById}