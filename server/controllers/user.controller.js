const User = require("../models/user.model");
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const { BlacklistModel } = require("../models/blacklist.model")
require('dotenv').config();

//signup controller
const signup = async(req,res) => {
    try{
        const { username, mobile, email, password } = req.body;

        if (!username || !mobile || !email || !password) {
            return res.status(400).json({ error: 'Invalid input' });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({username, mobile, email, password:hashPassword,});

        await newUser.save()

        res.status(201).json({ "message": 'User created successfully',
        "user" : newUser
        });

    } catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//login controller 
const login  = async(req,res)=> {
    const {email, password} =  req.body;
    const user = await User.findOne({ email });

    if(!user){
        return res.status(401).send({message : 'Authentication failed' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
        const token = jwt.sign({ userId: user._id }, process.env.secretKey, {
          expiresIn: '1h', // Token expiration time
        });
    
        res.status(200).json({"message":"user login successfully", "token" : token });
    } else {
        res.status(401).json({ message: 'Authentication failed' });
    }
}

const logout = async(req,res)=>{
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(400).json({ error: 'Token not provided in the request header' });
    }
  
    try {
      // Create a new document in the BlacklistModel collection with the token
      await BlacklistModel.create({ blacklist: [token] });
      res.status(200).json({ msg: 'User has been logged out successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

module.exports = {signup, login, logout};