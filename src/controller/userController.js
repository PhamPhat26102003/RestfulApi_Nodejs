const {
  findAll,
  findById,
  create,
  update,
  deleteById,
  search,
} = require("../db/queries");

//Lay ta ca ban ghi
const getAllUser = async (req, res) => {
  try {
    const users = await findAll();
    return res.status(200).json({ users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error!!" });
  }
};

// const createNewUser = async (req, res) => {
//   const { email, name, city } = req.body;

//   if (!email || !name || !city) {
//     return res.status(403).json({ message: "Error with input paramater!!" });
//   }

//   try {
//     const user = await create(email, name, city);
//     return res.status(201).json({ user });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Error!!" });
//   }
// };

//Them moi ban ghi
const createNewUser = async (req, res) => {
  const userData = req.body;

  if (
    !userData.email ||
    !userData.name ||
    !userData.city ||
    !userData.age ||
    !userData.gender
  ) {
    return res.status(403).json({ message: "Error with input paramater!!" });
  }

  try {
    const user = await create(userData);
    return res.status(201).json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error!!" });
  }
};

//Lay ban ghi theo id
const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await findById(id);
    return res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error!!" });
  }
};

// const updateUser = async (req, res) => {
//   const id = req.params.id;
//   const { email, name, city } = req.body;

//   if (!email || !name || !city) {
//     return res.status(403).json({ message: "Error with input paramater!!" });
//   }

//   try {
//     const user = await update(email, name, city, id);
//     return res.status(201).json({ user });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Error!!" });
//   }
// };

//Cap nhat ban ghi
const updateUser = async (req, res) => {
  const userData = req.body;

  if (!userData.id) {
    return res.status(404).json({ message: "Id is requird for update!!!" });
  }

  try {
    const user = await update(userData);
    return res.status(201).json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error!!" });
  }
};

//Xoa ban ghi
const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await deleteById(id);
    return res
      .status(200)
      .json({ message: "Delete user with id: " + id + " success." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error!!" });
  }
};

//Tim kiem theo nhieu dieu kien cung luc, req body
const searchByCondition = async (req, res) => {
  try {
    const { name, city, age, gender } = req.body;
    const user = await search({ name, city, age, gender });
    return res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error!!" });
  }
};

module.exports = {
  getAllUser,
  createNewUser,
  getUserById,
  updateUser,
  deleteUser,
  searchByCondition,
};
