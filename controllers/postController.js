const Post = require("../models/postModel");

// Create post
const createPost = async (req, res) => {
  try {
    const newPost = await Post.create(req.body);

    res.status(200).json({
      status: "success",
      data: {
        post: newPost,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

//Update post
const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      post.save();

      res.status(200).json({
        status: "success",
        data: {
          post,
        },
      });
    } else {
      res.status(403).json({
        status: "fail",
        message: "You can't update this post!",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Delete post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();

      res.status(204).json({
        status: "success",
        data: null,
      });
    } else {
      res.status(403).json({
        status: "fail",
        message: "You can't delete this post!",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Like post
const likePost = async (req, res) => {};

// Get a post
const getPost = async (req, res) => {};

// Get posts
const getPosts = async (req, res) => {};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPost,
  getPosts,
};
