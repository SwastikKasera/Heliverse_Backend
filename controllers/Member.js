const MemberModel = require("../models/Member");

const createMember = async (req, res) => {
    try {
        const { first_name, last_name, email, gender, avatar, domain, available } = req.body;

        if (!first_name || !last_name || !email || !gender || !avatar || !domain || !available ) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        const existingMember = await MemberModel.findOne({ email });
        if (existingMember) {
            return res.status(400).json({ message: "Member with this email already exists" });
        }
        const lastMember = await MemberModel.findOne({}, {}, { sort: { 'id': -1 } });
        const lastId = lastMember ? lastMember.id : 0
        
        const newMember = new MemberModel({
            id:lastId+1,
            first_name,
            last_name,
            email,
            gender,
            avatar,
            domain,
            available
        });

        await newMember.save();

        res.status(200).json({ msg: "Member created successfully" });
    } catch (error) {
        console.error("Error creating member:", error);
        res.status(500).json({ msg: "Server error" });
    }
};

const getAllMember = async (req, res) => {
    let { startIndex, endIndex } = req.query.page;
    console.log("req query", startIndex, endIndex);

    startIndex = parseInt(startIndex);
    endIndex = parseInt(endIndex);

    try {
        const members = await MemberModel.find()
            .skip(startIndex)
            .limit(endIndex - startIndex);

        return res.status(200).json({
            members,
            msg:"success"
        });
    } catch (error) {
        console.error("Error fetching members:", error);
        res.status(500).json({ msg: "Server error" });
    }
};

const getMemberById = async (req,res)=>{
    const {id} = req.params

    const memberInfo = await MemberModel.findOne({id})
    if(!memberInfo){
        return res.status(400).json({
            msg:"User not found"
        })
    }
    return res.status(200).json({
        userInfo:memberInfo,
        msg:"success"
    })
}

const updateMember = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, gender, avatar, domain, available } = req.body;
    try {
        const updatedUser = await MemberModel.findOneAndUpdate({ id }, { first_name, last_name, email, gender, avatar, domain, available }, { new: true });

        if (!updatedUser) {
            return res.status(400).json({ msg: "User not found" });
        }

        return res.status(200).json({
            updatedUser,
            msg: "Success"
        });
    } catch (error) {
        console.error("Error updating member:", error);
        return res.status(500).json({ msg: "Server error" });
    }
};

const deleteMember = async (req,res)=>{
    const {id} = req.params

    const deletedUser = await MemberModel.findOneAndDelete({id})
    if(!deletedUser){
        return res.status(400).json({
            msg:"User not deleted"
        })
    }
    return res.status(200).json({
        msg:"User Deleted Successfully"
    })
}

const searchMembers = async (req, res) => {
    try {
      const { keyword, startIndex, endIndex } = req.body;
      const regex = new RegExp(keyword);
      const members = await MemberModel.find({
        $or: [
          { first_name: regex },
          { last_name: regex },
          { email: regex },
          { domain: regex },
        ],
      })
      .skip(parseInt(startIndex || 0))
      .limit(parseInt(endIndex || 19) - parseInt(startIndex || 0));
  
      res.status(200).json({ msg: 'success', data: members });
    } catch (error) {
      res.status(500).json({ msg: "error in searching", error: error.message });
    }
  };

  const filterMembers = async (req, res) => {
    try {
      const { domain, gender, available } = req.body.filters;
      const {startIndex, endIndex} = req.body.page
      const filters = {};
      if (domain) {
        filters.domain = domain;
      }
      if (gender) {
        filters.gender = gender;
      }
      if (available !== undefined) {
        filters.available = available === 'true';
      }
  
      const members = await MemberModel.find(filters).skip(parseInt(startIndex)).limit(parseInt(endIndex) - parseInt(startIndex))
  
      res.status(200).json({ msg: 'success', data: members });
    } catch (error) {
      res.status(500).json({ msg: 'error', error: error.message });
    }
  };
module.exports = {getAllMember, getMemberById, createMember, updateMember, deleteMember, searchMembers, filterMembers};
