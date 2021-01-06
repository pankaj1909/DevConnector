const express = require('express')
const router = express.Router()
const authentication = require('../../middleware/auth')
const User = require('../models/User')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('../../config/production')
const bcrypt = require('bcryptjs')

// @route  GET api/auth
// @desc
// @access  Public
router.get('/', authentication, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (e) {
        console.log("Error:-" + e.message)
        res.status(500).json({msg: 'Server Error'})
    }
})

// @route  POST api/auth
// @desc   Authenticate  user and get token (Login)
// @access  Public
router.post('/', [
    check('email', 'Please include valid email').isEmail(),
    check('password', 'Please enter password').exists(),
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body

    try {
        let user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({errors: [{msg: 'Invalid User and Password'}]})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({errors: [{msg: 'Invalid User and Password'}]})
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            config.jwtSecret,
            {expiresIn: 360000},
            (err, token) => {
                if (err) throw err;
                res.json({token})
            }
        )

    } catch (e) {
        console.log("Error:-" + e.message)
        res.status(500).send('Server Error')
    }


})

module.exports = router;