const router = require("express");
const cardController = require("../controllers/cardController");

const cardRouter = router();

cardRouter.post("/findwordinfo", cardController.findExpressionInfo);
cardRouter.post("/getcardslist", cardController.getCardsList);
cardRouter.get("/getcardinfo=:cardId", cardController.getCardData);
cardRouter.post("/createCard", cardController.createCard);

module.exports = cardRouter;
