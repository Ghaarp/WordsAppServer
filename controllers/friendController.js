const friendDbHelper = require("../helpers/friendDbHelper");
const runtimeHelper = require("../helpers/runtimeHelper");
const ApiError = require("../Errors/ApiError");

class FriendController {
  async makeFriend(req, res, next) {
    if (
      !(await runtimeHelper.execute(
        next,
        friendDbHelper.inviteFriend,
        req.body
      ))
    )
      return;

    const { user, friend } = req.body;
    return res.json({ user, friend, success: true });
  }

  async remove(req, res, next) {
    if (
      !(await runtimeHelper.execute(
        next,
        friendDbHelper.removeFriend,
        req.body
      ))
    )
      return;

    const { user, friend } = req.body;
    return res.json({ user, friend, success: true });
  }

  async updateShareSettings(req, res, next) {
    if (
      !(await runtimeHelper.execute(
        next,
        friendDbHelper.updateShareSettings,
        req.body
      ))
    )
      return;

    const { user, friend, shareCards } = req.body;
    return res.json({ user, friend, shareCards, success: true });
  }

  async friendList(req, res, next) {
    if (
      !(await runtimeHelper.execute(
        next,
        friendDbHelper.fetchFriendList,
        req.body
      ))
    )
      return;

    return res.json();
  }
}

module.exports = new FriendController();
