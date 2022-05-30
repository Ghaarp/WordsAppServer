const router = require("express");
const userRouter = require("./userRouter");
const friendRouter = require("./friendRouter");
const cardRouter = require("./cardRouter");

const appRouter = router();

appRouter.use("/user", userRouter);
appRouter.use("/friend", friendRouter);
appRouter.use("/card", cardRouter);

module.exports = appRouter;
