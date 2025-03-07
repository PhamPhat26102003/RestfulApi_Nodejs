const express = require("express");
const app = express();
const router = require("./src/route/api");
require("dotenv").config();

//region milldeware
app.use(express.json());
app.use("/api/v1/user/", router);

const port = process.env.PORT;
app.listen(port);
console.log("RESTful API server started on: " + port);
