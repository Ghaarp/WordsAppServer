const router = require("express");
const cardController = require("../controllers/cardController");
const checkIsAuthMiddleware = require("../middleware/checkIsAuthMiddleware");

const cardRouter = router();

cardRouter.post(
  "/findexpressioninfo",
  checkIsAuthMiddleware,
  cardController.findExpressionInfo
);

cardRouter.post(
  "/getcardslist",
  checkIsAuthMiddleware,
  cardController.getCardsList
);

cardRouter.get(
  "/getcarddata=:cardId",
  checkIsAuthMiddleware,
  cardController.getCardData
);

cardRouter.post(
  "/createCard",
  checkIsAuthMiddleware,
  cardController.createCard
);

cardRouter.post(
  "/removeCard",
  checkIsAuthMiddleware,
  cardController.removeCard
);

module.exports = cardRouter;
