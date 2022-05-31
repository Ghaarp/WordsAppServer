const router = require("express");
const userController = require("../controllers/userController");

const userRouter = router();

userRouter.post("/login", userController.login);
userRouter.post("/registration", userController.register);
userRouter.get("/auth");

module.exports = userRouter;
