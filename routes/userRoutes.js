const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router.route("/:id/follow").patch(userController.followUser);
router.route("/:id/unfollow").patch(userController.unfollowUser);

module.exports = router;
