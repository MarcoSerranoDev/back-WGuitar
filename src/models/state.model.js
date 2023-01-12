const { Schema, model } = require("mongoose");

const State = new Schema({
  nombre: String,
  municipios: [String],
});

module.exports = model("State", State);
