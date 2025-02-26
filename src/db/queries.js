const { pool, connectToDatabase } = require("../db/connect");

const findAll = async () => {
  const queryString = "SELECT * FROM Users";
  try {
    const client = await pool.getConnection();
    const result = await client.query(queryString);
    return result[0];
  } catch (err) {
    console.log("Error while finding all record: ", err);
    throw err;
  }
};

const findById = async (id) => {
  const queryString = "SELECT * FROM Users WHERE id = ?";
  try {
    const client = await pool.getConnection();
    const result = await client.query(queryString, [id]);
    return result[0];
  } catch (err) {
    console.log("Error while finding user with " + id + " : ", err);
    throw err;
  }
};

// const create = async (email, name, city) => {
//   const queryString = `INSERT INTO Users (email, name, city)
//                         VALUES (?, ?, ?)`;
//   try {
//     const client = await pool.getConnection();
//     const result = await client.query(queryString, [email, name, city]);
//     return result[0];
//   } catch (err) {
//     console.log("Failed to create record: ", err);
//     throw err;
//   }
// };

const create = async (userData) => {
  const feilds = Object.keys(userData).join(", ");
  const placeholders = Object.keys(userData)
    .map(() => "?")
    .join(", ");
  const values = Object.values(userData);
  const queryString = `INSERT INTO Users (${feilds})
                          VALUES (${placeholders})`;
  try {
    const client = await pool.getConnection();
    const result = await client.query(queryString, values);
    return result[0];
  } catch (err) {
    console.log("Failed to create record: ", err);
    throw err;
  }
};

// const update = async (email, name, city, id) => {
//   const queryString = `UPDATE Users SET email = ?, name = ?, city = ? WHERE id = ?`;

//   try {
//     const client = await pool.getConnection();
//     const result = await client.query(queryString, [email, name, city, id]);
//     return result[0];
//   } catch (err) {
//     console.log("Failed to update user with id: " + id + " ", err);
//     throw err;
//   }
// };

const update = async (userData) => {
  const { id, ...fields } = userData;

  if (!id) {
    throw new Error("Missing id for update!!!");
  }

  const fieldEntries = Object.entries(fields);
  if (fieldEntries == 0) {
    throw new Error("No fields for update!!!");
  }

  const setClause = fieldEntries.map(([key]) => `${key} = ?`).join(", ");
  const values = [...fieldEntries.map(([, value]) => value), id];

  const queryString = `UPDATE Users SET ${setClause} WHERE id = ?`;

  try {
    const client = await pool.getConnection();
    const result = await client.query(queryString, values);
    return result[0];
  } catch (err) {
    console.log("Failed to update user with id: " + id + " ", err);
    throw err;
  }
};

const deleteById = async (id) => {
  const queryString = "DELETE FROM Users WHERE id = ?";

  try {
    const client = await pool.getConnection();
    const result = await client.query(queryString, [id]);
    return result[0];
  } catch (err) {
    console.log("Failed to delete user with id: " + id + " ", err);
    throw err;
  }
};

const search = async ({ name, city, age, gender }) => {
  let queryString = "SELECT * FROM Users WHERE 1=1";
  const values = [];

  if (name) {
    queryString += " AND name LIKE ?";
    values.push(`%${name}%`);
  }

  if (city) {
    queryString += " AND city LIKE ?";
    values.push(`%${city}%`);
  }

  if (age) {
    queryString += " AND age LIKE ?";
    values.push(`%${age}%`);
  }

  if (gender) {
    queryString += " AND gender LIKE ?";
    values.push(`%${gender}%`);
  }

  try {
    const client = await pool.getConnection();
    const result = await client.query(queryString, values);
    return result[0];
  } catch (err) {
    console.log("Failed to get users");
    throw err;
  }
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  deleteById,
  search,
};
