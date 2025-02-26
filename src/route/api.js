const express = require("express");

const router = express.Router();

const {
  getAllUser,
  createNewUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controller/userController");

router.get("/", getAllUser);
router.post("/add-new-user", createNewUser);
router.get("/:id", getUserById);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;
