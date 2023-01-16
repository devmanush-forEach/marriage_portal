const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  isActive: { type: Boolean, required: true, default: true },
});

module.exports = mongoose.model("address", AddressSchema);
