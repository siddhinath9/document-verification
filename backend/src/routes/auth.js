// auth.js
const User = require('../models/User');
const { Router } = require('express');
const bcrypt = require('bcrypt');
const router = Router();
const {signupValidation, checkAuth} = require('../middlewares/auth');
const jwt = require('jsonwebtoken');


router.post('/signup', async (req, res) => {

    const { userName, email, password, sender_address, private_key} = req.body;

    // //Validate the fields using JOI
    const { error } = signupValidation(req.body);

    if(error){
        return res.json({ error: error.details[0].message });
    }

    try{
        const user = await User.findOne({ 
            //check if user exists by email or username
            $or: [
                { email },
                { userName }
            ]
         });

        if(user){
            const error = new Error('Username already exists');
            error.status = 400;
            return res.json({ error: error.message, status: 400, data: null });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = await User.create({ userName, email, password: hashedPassword, sender_address, private_key });

        await newUser.save();
        console.log(newUser);

        return res.json({ message: 'User created successfully', status: 201, data: newUser });
    }catch(error){
        return res.json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    try{
        //check if user exists
        const user = await User.findOne({ email });

        if(!user){
            const error = new Error('User not found');
            error.status = 404;
            return res.json({ message: error.message, status: 404, data: null });
        }

        //check if password is correct
        const isValid = await bcrypt.compare(password, user.password);

        if(!isValid){
            const error = new Error('Password is incorrect');
            error.status = 401;
            return res.json({ message: 'Password is incorrect', status: 400, data: null });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        return res.json({ message: 'User logged in successfully', data: token, status: 200 });

    }
    catch(error){
        return res.json({ error: error.message });
    }
});

router.get('/protected', checkAuth, (req, res) => {
    return res.json({ message: 'You are authorized to see this content' });
});

module.exports = router;