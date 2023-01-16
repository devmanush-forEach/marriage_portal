const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: false },
  phone: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  profile: { type: String, required: false },
  remark: { type: String, required: false },
  docs: {
    type: [String],
    required: false,
  },
  isVerified: { type: Boolean, required: true, default: false },
  isActive: { type: Boolean, required: true, default: true },
  isActive: { type: Boolean, required: true, default: true },
});

module.exports = mongoose.model("application", applicationSchema);
