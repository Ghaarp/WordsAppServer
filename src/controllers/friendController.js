const friendDbHelper = require("../helpers/friendDbHelper");
const runtimeHelper = require("../helpers/runtimeHelper");

class FriendController {
  async inviteFriend(req, res, next) {
    const params = { userId: req.user?.id, friendLogin: req.params?.login };
    if (
      !(await runtimeHelper.execute(next, friendDbHelper.inviteFriend, params))
    )
      return;

    return res.json({ successfulOperation: true });
  }

  async removeFriend(req, res, next) {
    const params = { userId: req.user?.id, friendLogin: req.params?.login };
    if (
      !(await runtimeHelper.execute(next, friendDbHelper.removeFriend, params))
    )
      return;

    return res.json({ successfulOperation: true });
  }

  async removeFriendshipRow(req, res, next) {
    const params = { userId: req.user?.id, id: req.params?.id };
    if (
      !(await runtimeHelper.execute(
        next,
        friendDbHelper.removeFriendshipRow,
        params
      ))
    )
      return;

    return res.json({ successfulOperation: true });
  }

  async optionShareCards(req, res, next) {
    if (
      !(await runtimeHelper.execute(
        next,
        friendDbHelper.updateShareSettings,
        req.body
      ))
    )
      return;

    const { user, friendId, shareCards } = req.body;
    return res.json({ user, friendId, shareCards, successfulOperation: true });
  }

  async fetchFriendList(req, res, next) {
    const params = { userId: req.user?.id };
    const result = await runtimeHelper.execute(
      next,
      friendDbHelper.fetchFriendList,
      params
    );

    return res.json(result);
  }
}

module.exports = new FriendController();
