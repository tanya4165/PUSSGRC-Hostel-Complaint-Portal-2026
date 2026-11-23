const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "../.env")
});

const SECRET = process.env.JWT_SECRET;
const EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const loginUser = async (data) => {
  const RollNo = data.RollNumber;
const password = data.password;

console.log("Login data:", data);
console.log("Roll number received:", RollNo);

const user = await User.findOne({ Roll_no: String(RollNo) });

console.log("User found:", user);

  if (!user) {
    throw new Error("User does not exist");
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    throw new Error("Roll number or password is incorrect");
  }
console.log("SECRET =", SECRET);
console.log("EXPIRES_IN =", EXPIRES_IN);
console.log("typeof =", typeof EXPIRES_IN);
  const token = jwt.sign(
    {
      id: user._id,
      Roll_no: user.Roll_no,
      username: user.username,
      hostel_no: user.hostel_no,
      room_no: user.room_no,
      phone: user.phone,
      email: user.email,
    },
    SECRET,
    {
      expiresIn: EXPIRES_IN,
    }
  );

  return token;
};

module.exports = loginUser;