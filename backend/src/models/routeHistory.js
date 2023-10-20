const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const routeHistorySchema = new Schema({
  passengerID: {
    type: String,
    required: true,
  },
  passengerName: {
    type: String,
    required: true,
  },
  routeNumber: {
    type: String,
    required: true,
  },
  startLocation: {
    type: String,
    required: true,
  },
  endLocation: {
    type: String,
    required: true,
  },
  ticketPrice: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("routeHistory", routeHistorySchema);
