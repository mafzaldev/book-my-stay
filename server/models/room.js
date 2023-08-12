const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNo: {
    type: String,
    required: true,
    unique: true,
  },
  roomType: {
    type: String,
    enum: ["Single", "Double"],
    required: true,
  },
  servantId: {
    type: String,
    required: true,
  },
  pricePerDay: {
    type: Number,
    required: true,
  },
  roomImage: {
    type: String,
  },
  roomDescription: {
    type: String,
  },
  booked: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Room", roomSchema);
