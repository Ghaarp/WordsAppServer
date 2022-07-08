const router = require("express");
const friendController = require("../controllers/friendController");
const checkIsAuthMiddleware = require("../middleware/checkIsAuthMiddleware");

const friendRouter = router();

friendRouter.post(
  "/invite",
  checkIsAuthMiddleware,
  friendController.makeFriend
);
friendRouter.post("/remove", checkIsAuthMiddleware, friendController.remove);
friendRouter.post(
  "/updateShareSettings",
  checkIsAuthMiddleware,
  friendController.updateShareSettings
);
friendRouter.get(
  "/friendlist",
  checkIsAuthMiddleware,
  friendController.friendList
);

module.exports = friendRouter;
