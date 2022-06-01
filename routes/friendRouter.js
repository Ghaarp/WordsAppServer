const router = require("express");
const friendController = require("../controllers/friendController");

const friendRouter = router();

friendRouter.post("/invite", friendController.makeFriend);
friendRouter.post("/remove", friendController.remove);
friendRouter.post("/updateShareSettings", friendController.updateShareSettings);
friendRouter.get("/friendlist", friendController.friendList);

module.exports = friendRouter;
