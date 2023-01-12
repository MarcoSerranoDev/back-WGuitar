const mongoose = require("mongoose");
const { connect } = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    const cn = await connect(process.env.MONGODB_URL);
    cn.STATES.connected
      ? console.log("DB is connected")
      : console.log("Error DB connection");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = {
  connectDB,
};
