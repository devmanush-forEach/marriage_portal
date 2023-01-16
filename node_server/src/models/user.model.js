const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const addressModel = require("./address.model");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: false },
  phone: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  profile: { type: String, required: false },
  password: { type: String, required: true },
  isActive: { type: Boolean, required: true, default: true },
  isAdmin: { type: Boolean, required: true, default: false },
  roles: { type: [String], required: false, default: ["r2"] },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: addressModel,
    required: false,
  },
});

userSchema.pre("save", async function (next) {
  try {
    const hashedPassword = bcrypt.hashSync(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", userSchema);
