const { Schema, model } = require("mongoose");

const User = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  phone: { type: String },
  state: { type: String },
  town: { type: String },
  code: { type: String, require: true },
  status: { type: String, require: true, default: "UNVERIFIED" },
});

module.exports = model("User", User);
