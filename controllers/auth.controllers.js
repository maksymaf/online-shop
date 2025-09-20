const User = require('../models/user.model')

const registerUser = async (req, res) => {
    try{
        const {username, email, password} = req.body;
        let user = await User.findOne({email});
        console.log(user);

        if (user){
            return res.status(400).json({message: "User with this email already exists"});
        }

        user = new User({username, email, password});

        await user.save();

        res.status(201).json(user);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const loginUser = async (req, res) => {
    try{
        const {username, email, password} = req.body;
        let user = await User.findOne({email});
        console.log(user);

        if (!user){
            return res.status(400).json({message: "User with this email does not exist"});
        }

        if (user.password !== password){
            return res.status(400).json({message: "Incorrect password"});
        }

        req.session.isAuth = true;
        req.session.userID = user._id;

        res.status(200).json(user);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const logoutUser = async (req, res) => {
    try{
        req.session.destroy(err => {
            if (err) return res.status(400).json({message: "Cannot delete session"});

            res.clearCookie('connect.sid');
            res.status(200).json({message: 'session has been successfully deleted'});
        });
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser
}