const express = require("express");
const postController = require("../controllers/postController");

const router = express.Router();

router.route("/").post(postController.createPost);

router
  .route("/:id")
  .patch(postController.updatePost)
  .delete(postController.deletePost);

module.exports = router;
