const router = require("express");

const userRouter = router();

userRouter.post("/login");
userRouter.post("/registration");
userRouter.get("/auth");

module.exports = userRouter;
