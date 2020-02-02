const router = require('express').Router();
const User = require('../model/User');
const verify = require('./verifyToken');

router.post('/', verify, async (req, res) => {

    const userData = await User.findOne(req.body._id);
    console.log(userData);
    res.json({
        userData: {
            userEmail: userData.email,
            userName: userData.name
        }
    })
})


module.exports = router;