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

router.get("/", getAllUser);
router.post("/add-new-user", createNewUser);
router.get("/:id", getUserById);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

//req body
router.post("/search", searchByCondition);

module.exports = router;
