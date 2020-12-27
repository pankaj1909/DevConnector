const express = require('express')
const router = express.Router()
const authentication = require('../../middleware/auth')
const Profile = require('../models/Profile')
const User = require('../models/User')
const Post = require('../models/Post')
const {check, validationResult} = require('express-validator')
const request = require('request')
const config = require('config')

// @route  GET api/profile/me
// @desc   Getting current users profile
// @access  Private
router.get('/me', authentication, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({msg: 'No profile for this user'})
        }

        res.json(profile)

    } catch (e) {
        console.log("Error:-" + e.message)
        res.status(500).send(e.message)
    }
})

// @route  POST api/profile
// @desc   Create or update the user profile
// @access  Private
router.post('/', [authentication, [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills  is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body

    const profileFields = {}

    profileFields.user = req.user.id
    if (company) profileFields.company = company
    if (website) profileFields.website = website
    if (location) profileFields.location = location
    if (bio) profileFields.bio = bio
    if (status) profileFields.status = status
    if (githubusername) profileFields.githubusername = githubusername
    if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim())
    }

    profileFields.social = {}
    if (youtube) profileFields.social.youtube = youtube
    if (facebook) profileFields.social.facebook = facebook
    if (twitter) profileFields.social.twitter = twitter
    if (instagram) profileFields.social.instagram = instagram
    if (linkedin) profileFields.social.linkedin = linkedin

    try {
        let profile = await Profile.findOne({user: req.user.id})
        if (profile) {
            //Update
            profile = await Profile.findOneAndUpdate(
                {user: req.user.id},
                {$set: profileFields},
                {new: true}
            );
            return res.json(profile)
        }
        //Create
        profile = await Profile(profileFields)
        await profile.save()
        res.json(profile)
    } catch (e) {
        console.log('Error:-' + e.message)
        res.status(500).send(e.message)
    }


})

// @route  GET api/profile
// @desc   Getting all profile
// @access  Public
router.get('/', async (req, res) => {
    try {
        const profile = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profile)

    } catch (e) {
        console.log("Error:-" + e.message)
        res.status(500).send(e.message)
    }
})

// @route  GET api/profile/user/:user_id
// @desc   Getting profile by user id
// @access  Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar']);
        if (!profile) {
            return res.status(400).json({msg: 'Profile for this user not found'})
        }

        res.json(profile)

    } catch (e) {
        console.log("Error:-" + e.message)
        if (e.kind === 'ObjectId') {
            return res.status(400).json({msg: 'Profile for this user not found'})
        }
        res.status(500).send(e.message)
    }
})

// @route   DELETE api/profile
// @desc    DELETE profile, user and post
// @access  Private
router.delete('/', authentication, async (req, res) => {
    try {
        //Remove user post
        await Post.deleteMany({user: req.user.id})
        //Remove profile
        await Profile.findOneAndRemove({user: req.user.id});

        //Remove User
        await User.findOneAndRemove({_id: req.user.id});
        res.json({msg: 'User Removed'})

    } catch (e) {
        console.log("Error:-" + e.message)
        res.status(500).send(e.message)
    }
})

// @route  PUT api/profile/experience
// @desc   Add proflie experience
// @access  Private
router.put('/experience', [authentication, [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'company  is required').not().isEmpty(),
    check('from', 'from Date is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const {
        company,
        title,
        location,
        from,
        to,
        current,
        description,
    } = req.body

    const newExp = {
        company,
        title,
        location,
        from,
        to,
        current,
        description,
    }

    try {
        let profile = await Profile.findOne({user: req.user.id})
        profile.experience.unshift(newExp)
        await profile.save()
        res.json(profile)
    } catch (e) {
        console.log('Error:-' + e.message)
        res.status(500).send(e.message)
    }
})

// @route   DELETE api/profile/experience/:exp_id
// @desc    DELETE user experience
// @access  Private
router.delete('/experience/:exp_id', authentication, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id});
        const removeIndex = profile.experience
            .map(item => item.id)
            .indexOf(req.params.exp_id)
        //Remove experience
        profile.experience.splice(removeIndex, 1)
        await profile.save()
        res.json(profile)

    } catch (e) {
        console.log("Error:-" + e.message)
        res.status(500).send(e.message)
    }
})

// @route  PUT api/profile/education
// @desc   Add proflie education
// @access  Private
router.put('/education', [authentication, [
    check('school', 'school is required').not().isEmpty(),
    check('degree', 'degree  is required').not().isEmpty(),
    check('fieldofstudy', 'fieldofstudy  is required').not().isEmpty(),
    check('from', 'from Date is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description,
    } = req.body

    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }

    try {
        let profile = await Profile.findOne({user: req.user.id})
        profile.education.unshift(newEdu)
        await profile.save()
        res.json(profile)
    } catch (e) {
        console.log('Error:-' + e.message)
        res.status(500).send(e.message)
    }
})

// @route   DELETE api/profile/education/:edu_id
// @desc    DELETE user education
// @access  Private
router.delete('/education/:edu_id', authentication, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id});
        const removeIndex = profile.education
            .map(item => item.id)
            .indexOf(req.params.edu_id)
        //Remove experience
        profile.education.splice(removeIndex, 1)
        await profile.save()
        res.json(profile)

    } catch (e) {
        console.log("Error:-" + e.message)
        res.status(500).send(e.message)
    }
})

// @route  GET api/profile/github/:username
// @desc   Getting users repos from github
// @access  Public
router.get('/github/:username', async (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=10&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
            method: 'GET',
            headers: {'user-agent': 'node.js'}
        }

        request(options, (error, response, body) => {
            if (error) console.log(error)

            if (response.statusCode !== 200) {
                return res.status(404).json({msg: 'No Github profile found'})
            }

            res.json(JSON.parse(body))

        })

    } catch (e) {
        console.log("Error:-" + e.message)
        res.status(500).send(e.message)
    }
})

module.exports = router;