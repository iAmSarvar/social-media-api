const Post = require("../models/postModel");
const User = require("../models/userModel");

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

// Like or dislike post
const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });

      res.status(200).json({
        status: "success",
        message: "Liked a post",
      });
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });

      res.status(200).json({
        status: "success",
        message: "disliked a post",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Get a post
const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Get posts
const getPosts = async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId);
    console.log(currentUser);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );

    // console.log(friendPosts);

    const allPost = userPosts.concat(...friendPosts);

    res.status(200).json({
      status: "success",
      data: {
        posts: allPost,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPost,
  getPosts,
};
