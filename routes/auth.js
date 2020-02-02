const router = require('express').Router();
const User = require('../model/User');
const { registerValdiation,loginValdiation } = require('../validation/userValidation')
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
router.post('/register', async (req, res) => {
    const { error } = await registerValdiation(req.body).catch(err => {
        res.status(400).send(err.details[0].message);
    });

    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
        return res.status(400).send('Already a user');
    }

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);


    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    try {
        const saveUser = await user.save().catch(err => {
            console.log('error');
        })
        res.send(saveUser);
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }

});

router.post('/login', async (req, res) => {
    const { error } = await loginValdiation(req.body).catch(err => {
        res.status(400).send(err.details[0].message);
    });

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('Username not found');
    }else {
        const validPass = await bcrypt.compare(req.body.password , user.password);
        if(!validPass){
            return res.status(400).send('Invalid Password');
        }
        //create and assign a token
        const token = jwt.sign({_id: user._id }, process.env.TOKEN_SECRET);
        res.cookie('auth-token',token, { httpOnly: false, maxAge: 3600000 });
        res.json({
            token : token,
            _id : user._id
        }).send();
    }
});


module.exports = router;