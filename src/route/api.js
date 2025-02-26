const express = require("express");

const router = express.Router();

const {
  getAllUser,
  createNewUser,
  getUserById,
  updateUser,
  deleteUser,
  searchByCondition,
} = require("../controller/userController");

const { addFavouritesUser } = require("../controller/favouritesController");

router.get("/", getAllUser);
router.post("/add-new-user", createNewUser);
router.get("/:id", getUserById);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

//req body
router.post("/search", searchByCondition);
//add favourites list
router.post("/add-favourites-user", addFavouritesUser);

module.exports = router;
