const { addUserToFavouriteList } = require("../db/favouritesQuery");

//Them user vao danh sach yeu thich
const addFavouritesUser = async (req, res) => {
  const { userId, favoriteUserId } = req.body;

  if (!userId || !favoriteUserId) {
    return res
      .status(404)
      .json({ message: "User id and favourite id not found" });
  }

  try {
    const favoriteUser = await addUserToFavouriteList(userId, favoriteUserId);
    return res
      .status(201)
      .json({ message: "Add user in favourite list success", favoriteUser });
  } catch (err) {
    console.log(err);
    return res.staus(500).json({ message: "Error!!" });
  }
};

module.exports = { addFavouritesUser };
