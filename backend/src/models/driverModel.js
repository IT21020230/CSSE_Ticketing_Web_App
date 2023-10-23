const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const driverSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "Local Passenger",
  },
  registeredDriverDate: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: true,
    default: "Pending",
  },
});

module.exports = mongoose.model("drivers", driverSchema);
