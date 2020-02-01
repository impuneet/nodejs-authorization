const router = require('express').Router();
const User = require('../model/User');
const  {registerValdiation} = require('../validation/userValidation')
//Validation


router.post('/register', async (req, res) => {
    const {error} = await registerValdiation(req.body).catch(err => {
        res.status(400).send(err.details[0].message);
    });

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    const emailExist = await User.findOne({email : req.body.email});
    if(emailExist){
        return res.status(400).send('Already a user');
    }

    try {
        const saveUser = await user.save()
        res.send(saveUser);
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }

});

router.post('/login', (req, res) => {
    res.send('Register');
});


module.exports = router;