const { pool } = require("../db/connect");

//Them user vao danh sach yeu thich
const addUserToFavouriteList = async (userId, favoriteUserId) => {
  const queryString =
    "INSERT INTO favourites (user_id, favorite_user_id) VALUES (?, ?)";

  try {
    const client = await pool.getConnection();
    const result = await client.query(queryString, [userId, favoriteUserId]);
    return result[0];
  } catch (err) {
    console.log("Error while add uer in favourite list: ", err);
    throw err;
  }
};

module.exports = { addUserToFavouriteList };
