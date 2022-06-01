const sequelize = require("../db");
const { Friend } = require("../models/model");
const userHelper = require("../helpers/userHelper");
const ApiError = require("../Errors/ApiError");

class FriendDbHelper {
  static async findOne(userId, friendId) {
    return await Friend.findOne({
      where: {
        owner: userId,
        friend: friendId,
      },
    });
  }

  static async checkIdsIsValid(ids) {
    const users = await userHelper.findMany(ids);
    if (users.length != ids.length) {
      throw ApiError.badRequest("Wrong user id");
    }
  }

  static async inviteFriend({ user, friend }) {
    await FriendDbHelper.checkIdsIsValid([user, friend]);

    let friendDb = await FriendDbHelper.findOne(user, friend);

    if (friendDb) {
      return true;
    }

    friendDb = await Friend.create({
      owner: user,
      friend,
      shareCards: false,
    });

    return !!friendDb;
  }

  static async removeFriend({ user, friend }) {
    await FriendDbHelper.checkIdsIsValid([user, friend]);

    await Friend.destroy({
      where: {
        owner: user,
        friend,
      },
    });
    return true;
  }

  static async updateShareSettings({ user, friend, shareCards }) {
    await FriendDbHelper.checkIdsIsValid([user, friend]);

    const friendRow = await FriendDbHelper.findOne(user, friend);
    if (!friendRow) return false;

    const friendUpdated = await Friend.update(
      {
        owner: user,
        friend,
        shareCards,
      },
      {
        where: {
          owner: user,
          friend,
        },
      }
    );

    return !!friendUpdated;
  }

  static async fetchFriendList({ user }) {
    let result = await sequelize.query(
      "SELECT " +
        "outgoing.owner AS user, " +
        "outgoing.friend AS friend, " +
        "CASE " +
        "WHEN incoming.id IS NULL " +
        "THEN false " +
        "ELSE true " +
        "END AS doublesided " +
        "FROM " +
        "friends as outgoing " +
        "LEFT JOIN " +
        "friends as incoming " +
        "ON outgoing.owner = incoming.friend " +
        "AND outgoing.friend = incoming.owner " +
        "WHERE " +
        `outgoing.owner = ${user}`
    );

    return result[0];
    /*
    SELECT
        outgoing.owner AS user,
        outgoing.friend AS friend,
        CASE
          WHEN incoming.id IS NULL
          THEN false
          ELSE true
        END AS doublesided
    FROM
      friends as outgoing
    LEFT JOIN
      friends as incoming
        ON outgoing.owner = incoming.friend
        AND outgoing.friend = incoming.owner

    WHERE
      outgoing.owner = 1*/
  }
}

module.exports = FriendDbHelper;
