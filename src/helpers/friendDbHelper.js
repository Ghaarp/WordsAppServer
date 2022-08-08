const sequelize = require("../db");
const { Friend } = require("../models/model");
const userHelper = require("./userHelper");
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
      throw ApiError.badRequest("Неизвестный пользователь");
    }
  }

  static async inviteFriend({ userId, friendLogin }) {
    const friend = await userHelper.findUser(friendLogin);
    if (!friend) throw ApiError.badRequest("Нет пользователя с таким логином");

    if (friend.id === userId)
      throw ApiError.badRequest("Нельзя добавить самого себя в друзья");

    let friendDb = await FriendDbHelper.findOne(userId, friend.id);

    if (friendDb) {
      return true;
    }

    friendDb = await Friend.create({
      owner: userId,
      friend: friend.id,
      shareCards: false,
    });

    return !!friendDb;
  }

  static async removeFriend({ userId, friendLogin }) {
    const friend = await userHelper.findUser(friendLogin);
    if (!friend) return true;

    await Friend.destroy({
      where: {
        owner: userId,
        friend: friend.id,
      },
    });

    return true;
  }

  static async removeFriendshipRow({ userId, id }) {
    const ownerRow = Friend.destroy({
      where: {
        id,
        owner: userId,
      },
    });

    const friendRow = Friend.destroy({
      where: {
        id,
        friend: userId,
      },
    });

    await ownerRow;
    await friendRow;

    return true;
  }

  static async updateShareSettings({ user, friendId, shareCards }) {
    await FriendDbHelper.checkIdsIsValid([user.id, friendId]);

    const friendRow = await FriendDbHelper.findOne(user.id, friendId);
    if (!friendRow) return false;

    const friendUpdated = await Friend.update(
      {
        owner: user.id,
        friend: friendId,
        shareCards,
      },
      {
        where: {
          owner: user.id,
          friend: friendId,
        },
      }
    );

    return !!friendUpdated;
  }

  static async fetchFriendList({ userId }) {
    let result = await sequelize.query(
      "WITH friendsList AS (\n" +
        "  SELECT\n" +
        "        outgoing.id AS id,\n" +
        "        outgoing.owner AS user,\n" +
        "        outgoing.friend AS friend,\n" +
        '        outgoing."shareCards" AS shareCards,\n' +
        "        CASE\n" +
        "          WHEN incoming.id IS NULL\n" +
        "          THEN false\n" +
        "          ELSE true\n" +
        "        END AS doublesided\n" +
        "    FROM\n" +
        "      friends as outgoing\n" +
        "    LEFT JOIN\n" +
        "      friends as incoming\n" +
        "        ON outgoing.owner = incoming.friend\n" +
        "        AND outgoing.friend = incoming.owner\n" +
        "\n" +
        "    WHERE\n" +
        `      outgoing.owner = ${userId} \n` +
        "\n" +
        "  UNION ALL\n" +
        "  \n" +
        "  SELECT\n" +
        "        outgoing.id AS id,\n" +
        "        outgoing.owner AS user,\n" +
        "        outgoing.friend AS friend,\n" +
        '        outgoing."shareCards" AS shareCards,\n' +
        "        CASE\n" +
        "          WHEN incoming.id IS NULL\n" +
        "          THEN false\n" +
        "          ELSE true\n" +
        "        END AS doublesided\n" +
        "    FROM\n" +
        "      friends as outgoing\n" +
        "    LEFT JOIN\n" +
        "      friends as incoming\n" +
        "        ON outgoing.owner = incoming.friend\n" +
        "        AND outgoing.friend = incoming.owner\n" +
        "\n" +
        "    WHERE\n" +
        `    outgoing.friend = ${userId})\n` +
        "    \n" +
        "SELECT \n" +
        "  friends.id AS id,\n" +
        "  friends.user AS user,\n" +
        "  friends.friend AS friend,\n" +
        "  friends.shareCards AS shareCards,\n" +
        "  CASE\n" +
        "    WHEN friends.doublesided\n" +
        "    THEN '0'\n" +
        "    ELSE '1'\n" +
        "  END AS type,\n" +
        "  users.login AS friendlogin\n" +
        "FROM \n" +
        "  friendsList AS friends\n" +
        "LEFT JOIN\n" +
        "  users\n" +
        "  ON friends.friend = users.id\n" +
        "WHERE\n" +
        `  friends.user = ${userId}\n` +
        "  \n" +
        "UNION ALL\n" +
        "\n" +
        "SELECT \n" +
        "  friends.id AS id,\n" +
        "  friends.user AS user,\n" +
        "  friends.friend AS friend,\n" +
        "  friends.shareCards AS shareCards,\n" +
        "  '2' AS type,\n" +
        "  users.login AS friendlogin\n" +
        "FROM \n" +
        "  friendsList AS friends\n" +
        "LEFT JOIN\n" +
        "  users\n" +
        "  ON friends.user = users.id\n" +
        "WHERE\n" +
        `  friends.friend = ${userId}  \n` +
        "  AND NOT friends.doublesided"
    );

    return result[0];

    //Same query
    /*
WITH friendsList AS (
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
      outgoing.owner = 8 

	UNION ALL
	
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
	  outgoing.friend = 8)
	  
SELECT 
	friends.user AS user,
	friends.friend AS friend,
	CASE
		WHEN friends.doublesided
		THEN '0'
		ELSE '1'
	END AS type,
	users.login AS friendlogin
FROM 
	friendsList AS friends
LEFT JOIN
	users
	ON friends.friend = users.id
WHERE
	friends.user = 8
	
UNION ALL

SELECT 
	friends.user AS user,
	friends.friend AS friend,
	'2' AS type,
	users.login AS friendlogin
FROM 
	friendsList AS friends
LEFT JOIN
	users
	ON friends.user = users.id
WHERE
	friends.friend = 8	
	AND NOT friends.doublesided*/
  }
}

module.exports = FriendDbHelper;
