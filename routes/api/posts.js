const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Post Model
const Post = require('../../models/Post')

// Validation
const validatePostInput = require("../../validation/post");

require("../../config/passport")(passport);


// route    GET api/posts/test
// desc     test post route
// access   public
router.get('/test', (req, res) => {
    res.json({msg: "Posts works"})
})

// route    POST api/posts
// desc     Create a post
// access   private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {errors, isValid} = validatePostInput(req.body)

    // Check validation
    if (!isValid) {
        // Return an errors with 400 status
        return res.status(400).json(errors);
      }

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    })

    newPost.save().then(post => res.json(post))
})

module.exports = router