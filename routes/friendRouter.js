const router = require("express");

const friendRouter = router();

friendRouter.post("/invite");
friendRouter.post("/accept");
friendRouter.post("/remove");
friendRouter.post("/updateShareSettings");
friendRouter.get("/friendlist");

module.exports = friendRouter;
