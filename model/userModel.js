const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    //   required:[true, "username is required!!!!!"] approach1
    required: true, // approach2
  },
  email: {
    type: String,
    required: true,
    // should not allow more than one doc of same email
    unique: true,
    //should be lower case
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 10, // Should not exceed limit of 10
    select: false
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "Password does not match",
    },
  },
});

userSchema.pre("save", async function (req, res, next) {
  if(!this.isModified("password")) return next()
  var encryptedPassword = await bcrypt.hash(this.password, 12); //brute force attack
  console.log(encryptedPassword);
  this.password = encryptedPassword;
  this.confirmPassword = undefined;
  next();
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
