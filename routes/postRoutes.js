const express = require("express");
const postController = require("../controllers/postController");

const router = express.Router();

router.route("/").post(postController.createPost);

router.route("/timeline").get(postController.getPosts);

router
  .route("/:id")
  .get(postController.getPost)
  .patch(postController.updatePost)
  .delete(postController.deletePost);

router.route("/:id/like").patch(postController.likePost);

module.exports = router;
