const Joi = require('joi');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


//Signup validation using joi

const signupValidation = data => {
    //The email must be in a valid email format, password must be 6 letters long and contain at least one number, the username must be at least 3 letters long

    const schema = Joi.object({
        userName: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        sender_address: Joi.string().min(3).required(),
        private_key: Joi.string().min(3).required(),
    });
    return schema.validate(data);
}

//Login validation using joi

const loginValidation = data => {
    //The email must be in a valid email format, password must be 6 letters long and contain at least one number, the username must be at least 3 letters long

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    });
    return schema.validate(data);
}

//Check if token is valid middleware
const checkAuth = async (req, res, next) => {
    try{
        if(!req.headers.authorization){
            return res.json({ error: 'You are not permitted to access this content' });
        }
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = decodedToken;
        const id = req.userData.id;

        //check if user exists
        const user = await User.findById(id);

        if(!user){
            const error = new Error('User not found');
            error.status = 401;
            return res.json({ error: error.message });
        }
        next();
    }catch(error){
        return res.json({ error: error.message });
    }
}

module.exports = { signupValidation, loginValidation, checkAuth };