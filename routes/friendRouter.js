const router = require("express");
const friendController = require("../controllers/friendController");
const checkIsAuthMiddleware = require("../middleware/checkIsAuthMiddleware");

const friendRouter = router();

friendRouter.get(
  "/invitefriend=:login",
  checkIsAuthMiddleware,
  friendController.inviteFriend
);
friendRouter.get(
  "/removefriend=:login",
  checkIsAuthMiddleware,
  friendController.removeFriend
);
friendRouter.get(
  "/removefriendshiprow=:id",
  checkIsAuthMiddleware,
  friendController.removeFriendshipRow
);
friendRouter.post(
  "/optionsharecards",
  checkIsAuthMiddleware,
  friendController.optionShareCards
);
friendRouter.get(
  "/friendlist",
  checkIsAuthMiddleware,
  friendController.fetchFriendList
);

module.exports = friendRouter;
