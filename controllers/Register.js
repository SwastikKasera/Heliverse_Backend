const bcrypt = require('bcrypt');
const User = require('../models/User');

const Register = async (req,res)=>{
    const {email, password} = req.body
    try {
        if(!email || !password){
            return res.status(400).json({
                msg:"Fill all credentials"
            })
        }
        let existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.json({
                msg:"User already exist"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword
        });

        await newUser.save();

        return res.status(200).json({
            msg:"User created successfully"
        })
    } catch (error) {
        return res.status(500).json({
            msg:"Server Error"
        })
    }
}

module.exports = Register;
