const express = require("express");
const { signup, login, addProduct, protect } = require("../controllers/userController");
// const { getAllusers, postUsers, getSpecificUser } = require("../controllers/userController");
const route = express.Router();

route.post("/signup",signup);
route.post("/login",login);


// route.post("/add-product",protect,addProduct);


// route.post("/postUser", postUsers);
// route.get("/getAllUsers", getAllusers);
// route.get("/getspecificUser/:userId", getSpecificUser);

module.exports = route;

