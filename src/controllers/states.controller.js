const State = require("../models/state.model");

const getStates = async (req, res) => {
  try {
    const states = await State.find();
    res.status(200).json(states);
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      msg: "Bad Register",
    });
  }
};

module.exports = {
  getStates,
};
