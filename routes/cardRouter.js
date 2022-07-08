const router = require("express");
const cardController = require("../controllers/cardController");
const checkIsAuthMiddleware = require("../middleware/checkIsAuthMiddleware");

const cardRouter = router();

cardRouter.post(
  "/findwordinfo",
  checkIsAuthMiddleware,
  cardController.findExpressionInfo
);

cardRouter.post(
  "/getcardslist",
  checkIsAuthMiddleware,
  cardController.getCardsList
);

cardRouter.get(
  "/getcardinfo=:cardId",
  checkIsAuthMiddleware,
  cardController.getCardData
);

cardRouter.post(
  "/createCard",
  checkIsAuthMiddleware,
  cardController.createCard
);

module.exports = cardRouter;
