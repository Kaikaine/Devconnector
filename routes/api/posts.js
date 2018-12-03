const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Post Model
const Post = require("../../models/Post");
// Profile model
const Profile = require("../../models/Profile");

// Validation
const validatePostInput = require("../../validation/post");

require("../../config/passport")(passport);

// route    GET api/posts/test
// desc     test post route
// access   public
router.get("/test", (req, res) => {
  res.json({ msg: "Posts works" });
});

// route    GET api/posts
// desc     Get posts
// access   public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ noposts: "No posts found" }));
});

// route    GET api/posts/:id
// desc     Get posts by id
// access   public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ nopost: "No post with that ID" }));
});

// route    POST api/posts
// desc     Create a post
// access   private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

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
    });

    newPost.save().then(post => res.json(post));
  }
);

// route    DELETE api/posts/:id
// desc     Delete post
// access   private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }, (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id).then(post => {
        // Check for post owner
        if (post.user.toString() !== req.user.id) {
          return res.status(401).json({ authorized: "User not authorized" });
        }

        // Delete
        post
          .remove()
          .then(() => res.json({ succes: true }))
          .catch(err => res.status(404).json({ nopost: "Post not found" }));
      });
    });
  })
);

// route    POST api/posts/like/:id
// desc     Like post
// access   private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id).then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res
            .status(400)
            .json({ liked: "User already liked this post" });
        }

        // Add user id to likes array
        post.likes.unshift({ user: req.user.id });
        post.save().then(post => res.json(post));
      });
    });
  }
);

// route    POST api/posts/unlike/:id
// desc     Unlike post
// access   private
router.post(
    "/unlike/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      Profile.findOne({ user: req.user.id }).then(profile => {
        Post.findById(req.params.id).then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: "You have not yet liked this post" });
          }
  
          // Get remove index
          const removeIndex = post.likes
          .map(item => item.user.toString())
          .indexOf(req.user.id)

        //  splice out of array
        post.likes.splice(removeIndex, 1)

        // save
        post.save().then(post => res.json(post))
        });
      });
    }
  );

module.exports = router;
