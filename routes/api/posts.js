const express = require('express')
const router = express.Router()
const authentication = require('../../middleware/auth')
const User = require('../models/User')
const Post = require('../models/Post')
const Profile = require('../models/Profile')
const {check, validationResult} = require('express-validator')

// @route  POST api/posts
// @desc   Create a post
// @access  Private
router.post('/', [authentication, [
    check('text', 'Text is required').not().isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    try {
        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        })

        const post = await newPost.save()

        res.json(post)

    } catch (e) {
        res.status(500).send('server error')
    }


})

// @route  GET api/posts
// @desc   Get all posts
// @access  Private
router.get('/', authentication, async (req, res) => {
    try {
        const post = await Post.find().sort({date: -1});
        res.json(post)
    } catch (e) {
        console.log('Error:-' + e.message)
        res.status(500).send(e.message)
    }
})

// @route  GET api/posts/:id
// @desc   Get posts by id
// @access  Private
router.get('/:id', authentication, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({msg: "Post not found"})
        }
        res.json(post)
    } catch (e) {
        console.log('Error:-' + e.message)
        if (e.kind === 'ObjectId') {
            return res.status(404).json({msg: "Post not found"})
        }
        res.status(500).send(e.message)
    }
})

// @route  Delete api/posts/:id
// @desc   Delete posts by id
// @access  Private
router.delete('/:id', authentication, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({msg: "Post not found"})
        }
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({msg: "Not Authorized user"})
        }
        await post.remove()
        res.json({msg: "Post Removed"})
    } catch (e) {
        console.log('Error:-' + e.message)
        if (e.kind === 'ObjectId') {
            return res.status(404).json({msg: "Post not found"})
        }
        res.status(500).send(e.message)
    }
})

// @route  PUT api/posts/like/:id
// @desc   Like posts
// @access  Private
router.put('/like/:id', authentication, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({msg: "Post not found"})
        }
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({msg: "Post already liked"})
        }

        post.likes.unshift({user: req.user.id})
        await post.save()
        res.json(post.likes)
    } catch (e) {
        console.log('Error:-' + e.message)
        if (e.kind === 'ObjectId') {
            return res.status(404).json({msg: "Post not found"})
        }
        res.status(500).send(e.message)
    }
})

// @route  PUT api/posts/unlike/:id
// @desc   unlike  posts
// @access  Private
router.put('/unlike/:id', authentication, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({msg: "Post not found"})
        }
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({msg: "Post has not been liked"})
        }

        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id)

        post.likes.splice(removeIndex, 1)
        await post.save()
        res.json(post.likes)
    } catch (e) {
        console.log('Error:-' + e.message)
        if (e.kind === 'ObjectId') {
            return res.status(404).json({msg: "Post not found"})
        }
        res.status(500).send(e.message)
    }
})

// @route  POST api/posts/comment/:id
// @desc   Comment on a post
// @access  Private
router.post('/comment/:id', [authentication, [
    check('text', 'Text is required').not().isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    try {
        const user = await User.findById(req.user.id).select('-password');

        const post = await Post.findById(req.params.id)
        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        }
        post.comments.unshift(newComment)

        await post.save()

        res.json(post.comments)

    } catch (e) {
        res.status(500).send('server error')
    }


})

// @route  DELETE api/posts/comment/:id/:comment_id
// @desc   Delete Comment on a post
// @access  Private
router.delete('/comment/:id/:comment_id', authentication, async (req, res) => {

    try {
        const post = await Post.findById(req.params.id)
        const comment = post.comments.find((comment) => comment.id === req.params.comment_id)

        if (!comment) {
            return res.status(404).json({msg: "Comment does not exist"})
        }

        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({msg: "User not authorised"})
        }
        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id)

        post.comments.splice(removeIndex, 1)
        await post.save()

        res.json(post.comments)

    } catch (e) {
        res.status(500).send(e.message)
    }


})

module.exports = router;