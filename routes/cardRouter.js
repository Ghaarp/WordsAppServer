const router = require("express");

const cardRouter = router();

cardRouter.post("/findcardinfo");
cardRouter.post("/getcardinfo");
cardRouter.get("/getcardinfo=:cardId");
cardRouter.post("/createCard");

module.exports = cardRouter;
