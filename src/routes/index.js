const router = require("express");
const userRouter = require("./userRouter");
const friendRouter = require("./friendRouter");
const cardRouter = require("./cardRouter");
const authMiddleware = require("../middleware/authMiddleware");

const appRouter = router();

appRouter.use("/user", userRouter);
appRouter.use("/friend", authMiddleware, friendRouter);
appRouter.use("/card", authMiddleware, cardRouter);

module.exports = appRouter;
